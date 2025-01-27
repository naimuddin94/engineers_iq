/* eslint-disable prettier/prettier */
"use client";

import { Avatar } from "@nextui-org/avatar";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { useUser } from "@/context/user.provider";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

/* eslint-disable prettier/prettier */
export default function HandleProfileImage({ user }: { user: IUser }) {
  const [isWonProfile, setIsWonProfile] = useState<boolean>(false);
  const { isLoading: userLoading } = useUser();

  async function handleChangeProfilePicture(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event);
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
        alt={user?.name}
        className="w-24 h-24 mb-3 mt-4"
        src={user?.image}
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
