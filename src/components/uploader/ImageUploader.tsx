import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "@/lib/features/user/userSlice";
import api from "@/lib/axios";
import { Trash } from "lucide-react";

// Модальне вікно
const Modal = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h3 className="text-lg font-semibold mb-4 dark:text-black">
          {message}
        </h3>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-teal-300 text-white dark:text-black px-4 py-2 rounded"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ImageUploader() {
  const profile = useSelector((state: RootState) => state.user.profile);
  const photos = useSelector((state: RootState) => state.user.profile_photos);

  const isPremium = profile?.is_premium;
  const currentPhotosCount = photos?.length || 0;
  const maxPhotos = isPremium ? 20 : 5;

  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const totalPhotos =
        currentPhotosCount + files.length + acceptedFiles.length;

      if (totalPhotos > maxPhotos) {
        const allowedToAdd = maxPhotos - (currentPhotosCount + files.length);
        setModalMessage(
          allowedToAdd <= 0
            ? `Ви досягли ліміту (${maxPhotos}) фото.У вас преміум!✅✅✅`
            : `Ви можете додати ще лише ${allowedToAdd} фото.\nЗ преміум аккаунтом можна завантажувати 20 фото`
        );
        setModalOpen(true);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    [files, currentPhotosCount, maxPhotos]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    multiple: true,
  });

  const handleDelete = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== id));
    setSelectedFiles((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !selectedFiles.has(file.name))
    );
    setSelectedFiles(new Set());
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("user_id", profile?.user_id!);

    files.forEach((file) => {
      formData.append("photos", file);
    });

    setLoading(true);

    try {
      const res = await api.post("/cloudinary/upload", formData);
      const data = res.data;

      if (data.url || data.urls) {
        dispatch(fetchPhotos(profile?.user_id));
        setFiles([]);
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
    setModalOpen(false);
  };

  const handleSelectFile = (id: string) => {
    setSelectedFiles((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  if (currentPhotosCount >= maxPhotos) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col">
      <div className="flex flex-col md:flex-row items-center text-center gap-2">
        <div
          {...getRootProps()}
          className="flex-col border-dashed border-2 border-teal-300 p-6 text-center rounded-lg cursor-pointer hover:bg-teal-500"
        >
          <input {...getInputProps()} />
          <p>Перетягніть зображення сюди або натисніть для вибору</p>
        </div>
        {files && files.length >= 1 && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full md:w-1/4 mt-4 px-4 py-1 bg-teal-300 text-black rounded disabled:opacity-50 dark:text-white"
          >
            {loading ? "Завантаження..." : "Завантажити у свій профіль"}
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Можна завантажити ще {maxPhotos - currentPhotosCount - files.length}{" "}
        фото 🤔
      </p>

      {files.length > 0 && (
        <>
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
                className={`relative cursor-pointer ${
                  selectedFiles.has(file.name)
                    ? "border-2 border-teal-500 rounded-xl"
                    : ""
                }`}
                onClick={() => handleSelectFile(file.name)}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`img-${index}`}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <div className="absolute bottom-[-10px] left-1/2 bg-gray-800 w-full p-2 transform -translate-x-1/2 flex items-center justify-around">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.name);
                    }}
                    className="bg-red-500 text-white rounded-full p-2 transition-all duration-300 hover:bg-red-700 transform hover:scale-110"
                  >
                    {deleting ? (
                      "Deleting..."
                    ) : (
                      <Trash className="cursor-pointer" size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
}
