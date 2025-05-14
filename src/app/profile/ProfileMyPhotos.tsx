import ImageUploader from '@/components/uploader/ImageUploader'
import { RootState } from '@/lib/store'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '@/lib/axios'
import { setProfilePhotos } from '@/lib/features/user/userSlice'
import { Eye, EyeOff, Lock, Unlock } from 'lucide-react'

const ProfileMyPhotos = () => {
  const photos = useSelector((state: RootState) => state.user.profile_photos)
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])

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
        setSelectedPhotos([])
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
        setSelectedPhotos([])
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
        setSelectedPhotos([])
      } else {
        alert("Не вдалося оновити приватність фото.")
      }
    } catch (error) {
      console.error("Toggle private error:", error)
      alert("Помилка при оновленні приватності.")
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">My Photos</h2>

      <ImageUploader />

      {selectedPhotos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDeleteMultiple}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Видалити вибрані
          </button>
          <button
            onClick={() => handleTogglePrivate(true)}
            className="bg-yellow-500 text-white p-2 rounded-lg flex items-center gap-1"
          >
            <Lock size={16} /> Зробити приватними
          </button>
          <button
            onClick={() => handleTogglePrivate(false)}
            className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-1"
          >
            <Unlock size={16} /> Зробити публічними
          </button>
        </div>
      )}

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
    </div>
  )
}

export default ProfileMyPhotos
