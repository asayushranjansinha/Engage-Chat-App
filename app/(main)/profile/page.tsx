"use client";
import React, { useEffect, useState } from "react";
import ProfileHeading from "@/components/profile/heading";
import UpdateProfileForm from "@/components/forms/update-profile-form";
const ProfilePage: React.FC = () => {
  const [isEditable, setEditable] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  /**
   * Toggles the editable state for the profile form.
   * This function toggles the editable state between true and false.
   * @returns {void}
   */
  const handleEditForm = (): void => {
    setEditable((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;
  return (
    <main className="w-full min-h-svh">
      <div className="h-svh container mx-auto flex items-center py-10 pt-20 justify-center gap-4 mx-lg-gap-8">
        <div className="h-fit bg-white dark:bg-black w-1/3 mx-auto py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 rounded-2xl border">
          <div className="gap-4 flex items-center justify-between">
            <ProfileHeading callback={handleEditForm} />
          </div>

          <UpdateProfileForm
            isEditable={isEditable}
            setEditable={setEditable}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
