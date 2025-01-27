/* eslint-disable prettier/prettier */
"use client";

import { Camera } from "lucide-react";
import { ChangeEvent, useState } from "react";

/* eslint-disable prettier/prettier */
export default function HandleProfileImage() {
  const [isWonProfile, setIsWonProfile] = useState<boolean>(false);

  async function handleChangeProfilePicture(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    console.log(event);
  }

  return (
    <>
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
    </>
  );
}
