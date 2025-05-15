import React, { Suspense } from "react";
import Profile from "./profile";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Завантаження профілю...</div>}>
      <Profile />
    </Suspense>
  );
}
