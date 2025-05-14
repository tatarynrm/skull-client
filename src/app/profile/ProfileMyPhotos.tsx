import ImageUploader from '@/components/uploader/ImageUploader'
import { RootState } from '@/lib/store'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '@/lib/axios'
import { setProfilePhotos } from '@/lib/features/user/userSlice'
import { Eye, EyeOff, Lock, Skull, Trash, Unlock } from 'lucide-react'

const ProfileMyPhotos = () => {
  const photos = useSelector((state: RootState) => state.user.profile_photos)
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<'delete' | 'private' | 'public' | null>(null)

  const dispatch = useDispatch()

  const handleSelectPhoto = (photoId: number) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(photoId)
        ? prevSelected.filter((id) => id !== photoId)
        : [...prevSelected, photoId]
    )
  }

  const togglePhotoVisibility = (photoId: number) => {
    setVisiblePhotos((prevVisible) =>
      prevVisible.includes(photoId)
        ? prevVisible.filter((id) => id !== photoId)
        : [...prevVisible, photoId]
    )
  }

  const handleDelete = async (photoId: number) => {
    try {
      const response = await api.delete(`/cloudinary/delete/${photoId}`)
      if (response.data.success) {
        setSelectedPhotos([]) // Clear selected photos after deletion
        dispatch(setProfilePhotos(photos!.filter((photo) => photo.id !== photoId)))
      } else {
        alert("Не вдалося видалити фото.")
      }
    } catch (error) {
      console.error("Delete error", error)
      alert("Помилка при видаленні фото.")
    }
  }

  const handleDeleteMultiple = async () => {
    try {
      const response = await api.delete('/cloudinary/delete-multiple', {
        data: { ids: selectedPhotos }
      })

      if (response.data.success) {
        dispatch(setProfilePhotos(photos!.filter((photo) => !selectedPhotos.includes(photo.id))))
        setSelectedPhotos([]) // Clear selected photos after deletion
      } else {
        alert("Не вдалося видалити фотографії.")
      }
    } catch (error) {
      console.error("Delete multiple error", error)
      alert("Помилка при видаленні фотографій.")
    }
  }

  const handleTogglePrivate = async (makePrivate: boolean) => {
    try {
      const response = await api.patch('/cloudinary/toggle-private', {
        ids: selectedPhotos,
        makePrivate,
      })

      if (response.data.success) {
        const updated = photos!.map(photo =>
          selectedPhotos.includes(photo.id)
            ? { ...photo, private: makePrivate }
            : photo
        )
        dispatch(setProfilePhotos(updated))
        setSelectedPhotos([]) // Clear selected photos after update
      } else {
        alert("Не вдалося оновити приватність фото.")
      }
    } catch (error) {
      console.error("Toggle private error:", error)
      alert("Помилка при оновленні приватності.")
    }
  }

  // Функція для виділення або зняття виділення з усіх фото
  const handleSelectAll = () => {
    if (selectedPhotos.length === photos!.length) {
      setSelectedPhotos([]) // Якщо всі вибрані, зняти виділення
    } else {
      setSelectedPhotos(photos!.map(photo => photo.id)) // Виділити всі
    }
  }

  // Функція для відкриття модального вікна
  const openModal = (action: 'delete' | 'private' | 'public') => {
    setModalAction(action)
    setShowModal(true)
  }

  // Функція для закриття модального вікна
  const closeModal = () => {
    setShowModal(false)
    setModalAction(null)
  }

  // Підтвердження операції в модальному вікні
  const confirmAction = () => {
    if (modalAction === 'delete') {
      handleDeleteMultiple()
    } else if (modalAction === 'private') {
      handleTogglePrivate(true)
    } else if (modalAction === 'public') {
      handleTogglePrivate(false)
    }
    closeModal()
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">My Photos</h2>

      <ImageUploader />

      {selectedPhotos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => openModal('delete')}
            className="bg-red-500 text-white p-1 rounded-lg cursor-pointer flex gap-1 items-center text-center"
          >
        
            Видалити обрані
                <Trash size={16} />
          </button>
          <button
            onClick={() => openModal('private')}
            className="bg-orange-500 text-white p-1 rounded-lg flex items-center gap-1 cursor-pointer"
          >
             Зробити приватними <Skull size={16}/>
          </button>
          <button
            onClick={() => openModal('public')}
            className="bg-green-600 text-white p-1 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            Зробити публічними  <Unlock size={16} />
          </button>
        </div>
      )}

      {/* Кнопка виділення всіх або зняття виділення з усіх */}
      <button
        onClick={handleSelectAll}
        className="mt-4 bg-slate-600 text-white p-2 rounded-lg flex items-center gap-1 cursor-pointer"
      >
        {selectedPhotos.length === photos?.length ? 'Зняти виділення з усіх' : 'Виділити всі фото'}
      </button>

      {photos && photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => {
            const isSelected = selectedPhotos.includes(photo.id)
            const isPrivate = photo.private
            const isVisible = visiblePhotos.includes(photo.id)

            return (
              <div
                key={photo.id}
                className={`relative overflow-hidden rounded-lg shadow-md ${
                  isSelected ? 'border-2 border-teal-500' : ''
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className={`object-cover w-full h-48 cursor-pointer transition duration-300 ${
                    isPrivate && !isVisible ? 'blur-md grayscale' : ''
                  }`}
                  onClick={() => handleSelectPhoto(photo.id)}
                />

                {/* Показати / приховати приватне фото */}
                {isPrivate && (
                  <button
                    onClick={() => togglePhotoVisibility(photo.id)}
                    className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded-full"
                  >
                    {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}

                {/* Індикатор вибору */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1">
                    ✓
                  </div>
                )}

                {/* Видалити одне фото */}
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                  🗑️
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">У вас ще немає фото.</p>
      )}

      {/* Модальне вікно підтвердження */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-black">Підтвердження</h3>
            <p className="mb-4 text-black">
              Ви справді хочете {modalAction === 'delete' ? 'видалити' : modalAction === 'private' ? 'зробити приватними' : 'зробити публічними'} фото?
            </p>
            <div className="flex justify-between">
              <button onClick={closeModal} className="bg-gray-300 text-black p-2 rounded-lg">
                Скасувати
              </button>
              <button
                onClick={confirmAction}
                className={`p-2 rounded-lg text-white ${
                  modalAction === 'delete' ? 'bg-red-500' : modalAction === 'private' ? 'bg-orange-500' : 'bg-green-600'
                }`}
              >
                Підтвердити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMyPhotos
