import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone"; // Імпортуємо useDropzone
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "@/lib/features/user/userSlice";
import api from "@/lib/axios";
import { Trash } from "lucide-react";

// Модальне вікно для повідомлення про обмеження
const Modal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-teal-300 text-white px-4 py-2 rounded">
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ImageUploader() {
  const profile = useSelector((state: RootState) => state.user.profile);
  const [files, setFiles] = useState<File[]>([]); // Локальний стан для файлів
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set()); // Вибрані файли для видалення
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Стан для відкриття модалки
  const [modalMessage, setModalMessage] = useState(""); // Повідомлення для модалки
  const [privatePhotos, setPrivatePhotos] = useState<Set<string>>(new Set()); // Локальний стан для приватних фото
  const dispatch = useDispatch<AppDispatch>();

  // Обробник для drag-and-drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 5) {
      // Якщо перевищено ліміт файлів — показуємо модалку
      setModalMessage("Максимальна кількість фото — 5.");
      setModalOpen(true);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"], // Задаємо типи файлів
    },
    multiple: true,
  });

  // Локальне видалення файлів
  const handleDelete = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== id));
    setSelectedFiles((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  };

  // Видалення вибраних файлів
  const handleDeleteSelected = () => {
    setFiles((prevFiles) => prevFiles.filter((file) => !selectedFiles.has(file.name)));
    setSelectedFiles(new Set());
  };

  // Позначення фото як приватного
  const togglePrivate = (id: string) => {
    setPrivatePhotos((prevPrivate) => {
      const newPrivate = new Set(prevPrivate);
      if (newPrivate.has(id)) {
        newPrivate.delete(id); // Якщо фото вже приватне, знімаємо мітку
      } else {
        newPrivate.add(id); // Якщо фото не приватне, додаємо мітку
      }
      return newPrivate;
    });
  };

  // Обробка файлів перед відправкою на сервер
  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("user_id", profile?.user_id!);

    // Append the private flag to the form data
    files.forEach((file) => {
      formData.append("photos", file);
      formData.append("private", privatePhotos.has(file.name) ? "true" : "false");
    });

    setLoading(true);

    try {
      const res = await api.post("/cloudinary/upload", formData, {
      
        
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
  console.log(res,'res');
      const data = res.data;
      if (data.url) {
        dispatch(fetchPhotos(profile?.user_id)); // Оновлюємо фото
        setFiles([]); // Очищаємо локальні файли після успішного завантаження
      } else if (data.urls) {
        dispatch(fetchPhotos(profile?.user_id)); // Оновлюємо фото
        setFiles([]); // Очищаємо локальні файли після успішного завантаження
      } else {
        alert("Помилка завантаження");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Закриваємо модалку
  };

  const handleSelectFile = (id: string) => {
    setSelectedFiles((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id); // Якщо файл вже вибрано, знімаємо вибір
      } else {
        newSelected.add(id); // Якщо файл не вибрано, додаємо в вибір
      }
      return newSelected;
    });
  };

  return (
    <div className="p-4 flex flex-col">
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-teal-300 p-6 text-center rounded-lg cursor-pointer hover:bg-teal-50"
      >
        <input {...getInputProps()} />
        <p>Перетягніть зображення сюди або натисніть для вибору</p>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 px-4 py-1 bg-teal-300 text-white rounded disabled:opacity-50"
      >
        {loading ? "Завантаження..." : "Завантажити"}
      </button>

      {files.length > 0 && (
        <>
          {/* Кнопка для видалення вибраних фото */}
          {selectedFiles.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="mt-4 w-1/5 px-4 py-1 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Видалити вибрані фото
            </button>
          )}

          <div className="mt-4 space-y-2 grid gap-4 grid-cols-2 md:grid-cols-5">
            {files.map((file, index) => (
              <div
                key={index}
                className={`relative cursor-pointer ${selectedFiles.has(file.name) ? 'border-2 border-teal-500 rounded-xl' : ''}`}
                onClick={() => handleSelectFile(file.name)} // Вибір файлу при натисканні
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`img-${index}`}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                {/* Місце для кнопок під зображенням */}
                <div className="absolute bottom-[-10px] left-1/2 bg-gray-800 w-full p-2 transform -translate-x-1/2 flex items-center justify-around">
                  {/* Красива галочка для приватного фото */}
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={privatePhotos.has(file.name)}
                      onChange={() => togglePrivate(file.name)}
                      className="form-checkbox text-yellow-500 transition-all duration-300 transform hover:scale-110"
                    />
                    <span className="text-sm text-teal-300">{privatePhotos.has(file.name) ? "Приватне" : "Зробити приватним"}</span>
                  </label>
                  {/* Кнопка для видалення фото */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Запобігаємо спрацьовуванню onClick на батьківському елементі
                      handleDelete(file.name);
                    }}
                    className="bg-red-500 text-white rounded-full p-2 transition-all duration-300 hover:bg-red-700 transform hover:scale-110"
                  >
                    {deleting ? "Deleting..." : <Trash className="cursor-pointer" size={20} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Модальне вікно */}
      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
}
