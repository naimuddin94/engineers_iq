/* eslint-disable prettier/prettier */
"use client";

import { useDisclosure } from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { FilePen, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import UserName from "@/components/premium_acc_badge";
import { useUser } from "@/context/user.provider";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

export default function EditName({ user }: { user: IUser }) {
  const [nameChangedAction, setNameChangedAction] = useState(false);
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);
  const [isWonProfile, setIsWonProfile] = useState<boolean>(false);
  const { isLoading: userLoading } = useUser();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleProfileInfoChange = () => {
    setNameChangedAction(false);
  };

  useEffect(() => {
    async function getUser() {
      const currentUser = await getCurrentUser();

      if (currentUser && currentUser?.username === user?.username) {
        setIsWonProfile(true);
      } else {
        if (user?.following?.includes(currentUser?.id)) {
          setIsAlreadyFollowed(true);
        }
      }
    }

    getUser();
  }, [userLoading]);

  useEffect(() => {
    if (nameChangedAction && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameChangedAction]);

  return (
    <>
      <div className="flex gap-3 items-center">
        {nameChangedAction ? (
          <input
            ref={inputRef}
            className="border border-gray-400 rounded-md py-1 px-2"
            defaultValue={user?.name}
            type="text"
            onBlur={() => setNameChangedAction(false)}
          />
        ) : (
          <UserName isPremium={user?.premium} name={user?.name} />
        )}

        {isWonProfile && !nameChangedAction && (
          <FilePen
            className="cursor-pointer hover:transition-all hover:scale-105 hover:text-sky-600"
            size={13}
            onClick={() => setNameChangedAction(true)}
          />
        )}
        {isWonProfile && nameChangedAction && (
          <Save
            className="cursor-pointer hover:transition-all hover:scale-105 hover:text-sky-600"
            size={20}
            onClick={handleProfileInfoChange}
          />
        )}
      </div>
      <p className=" text-gray-600">@{user?.username}</p>
      {isWonProfile ? (
        <Button
          className="mt-4"
          color="primary"
          size="sm"
          variant="flat"
          onPress={onOpen}
        >
          Update Password
        </Button>
      ) : isAlreadyFollowed ? (
        <Button className="mt-4" color="primary" size="sm" variant="flat">
          Unfollow
        </Button>
      ) : (
        <Button className="mt-4" color="primary" size="sm" variant="flat">
          Follow
        </Button>
      )}
    </>
  );
}
