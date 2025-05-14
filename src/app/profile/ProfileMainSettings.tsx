"use client";

import LocationInfo from "@/components/map/ProfileLocation";
import { Skeleton } from "@/components/ui/skeleton";
import { IUserProfile } from "@/lib/features/user/userSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const ProfileMainSettings = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.user.profile);
  if (!profile) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="main flex flex-col gap-10 md:flex-row">
      <div className="photo rounded-2xl">
        <Image
          src={
            profile?.photos
              ? profile?.photos
              : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
          }
          width={200}
          height={200}
          className="rounded-2xl"
          alt="user_profile_photo"
        />
      </div>
      <div className="main__info">
        <h2 className="text-xl font-bold mb-2">Основна інформація</h2>
        <p>
          <strong>Імʼя:</strong> {profile?.name}
        </p>
        <p>
          <strong>Стать:</strong> @{profile?.sex}
        </p>
        <p>
          <strong>Мова:</strong> {user?.language_code?.toUpperCase() || ' uk'}
        </p>
      </div>
      <div className="location_info w-full md:w-[600] rounded-full bg-red-200">
        <LocationInfo lat={profile.latitude!} lng={profile.longitude!} />
      </div>
    </div>
  );
};

export default ProfileMainSettings;

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[200] w-[200] rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
