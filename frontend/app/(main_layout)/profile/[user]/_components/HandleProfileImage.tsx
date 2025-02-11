/* eslint-disable prettier/prettier */
"use client";

import { Avatar } from "@nextui-org/avatar";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/context/user.provider";
import { useChangeProfileImage } from "@/hooks/auth.hook";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

/* eslint-disable prettier/prettier */
export default function HandleProfileImage({ user }: { user: IUser }) {
  const [isWonProfile, setIsWonProfile] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState(user?.image);
  const { isLoading: userLoading, setUser } = useUser();

  // For change profile image
  const { mutate: changeImageFN } = useChangeProfileImage();

  async function handleChangeProfilePicture(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (!event?.target?.files) return;

    const formData = new FormData();

    formData.append("image", event?.target?.files[0]);

    const toastId = toast.loading("Updating profile photo...");

    changeImageFN(formData, {
      onSuccess: function (data) {
        setUpdateImage(data?.data?.image);
        setUser(data?.data);
        toast.success(data?.message, { id: toastId });
      },
      onError: function (err) {
        toast.error(err?.message || "Failed to update profile photo", {
          id: toastId,
        });
      },
    });
  }

  useEffect(() => {
    async function getUser() {
      const currentUser = await getCurrentUser();

      if (currentUser && currentUser?.username === user?.username) {
        setIsWonProfile(true);
      }
    }

    getUser();
  }, [userLoading]);

  return (
    <div className="relative group">
      <Avatar
        key={updateImage || user?.image}
        alt={user?.name}
        className="w-24 h-24 mb-3 mt-4"
        src={updateImage || user?.image || ""}
      />

      {isWonProfile && (
        <>
          <label
            className="absolute w-24 inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
            htmlFor="profile-picture"
          >
            {/* <span className="text-white">Change</span> */}
            <Camera className="mt-10" size={20} />
          </label>
          <input
            accept="image/*"
            className="hidden"
            id="profile-picture"
            type="file"
            onChange={handleChangeProfilePicture}
          />
        </>
      )}
    </div>
  );
}
