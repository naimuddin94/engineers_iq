/* eslint-disable prettier/prettier */
"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FilePen, KeyRound, Lock, Save } from "lucide-react";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

import UserName from "@/components/premium_acc_badge";
import { useUser } from "@/context/user.provider";
import {
  useChangeFullname,
  useChangePassword,
  useToggleFollowing,
} from "@/hooks/auth.hook";
import { AuthValidation } from "@/schemas/auth.schema";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";

export default function HandleProfileInfo({ user }: { user: IUser }) {
  const [nameChangedAction, setNameChangedAction] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.name);
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);
  const [isWonProfile, setIsWonProfile] = useState<boolean>(false);
  const { isLoading: userLoading } = useUser();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleProfileInfoChange() {
    setNameChangedAction(false);
  }

  // For change user fullname
  const { mutate: changeNameFN } = useChangeFullname();

  function handleNameChange(e: FocusEvent<HTMLInputElement, Element>) {
    if (e.target.value?.length > 25) {
      return toast.error("Your full name is too long");
    }
    if (e.target.value !== updatedName) {
      const toastId = toast.loading("Updating full name...");

      changeNameFN(e.target.value, {
        onSuccess: function (data) {
          setUpdatedName(e.target.value);
          toast.success(data?.message, { id: toastId });
        },
        onError: function (err) {
          toast.error(err?.message || "Failed to update full name", {
            id: toastId,
          });
        },
      });
    }
    setNameChangedAction(false);
  }

  // For password change
  const { mutate: changePasswordFN, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AuthValidation.passwordChangeSchema),
  });

  function handleChangePassword(data: FieldValues) {
    changePasswordFN(
      { oldPassword: data?.oldPassword, newPassword: data?.newPassword2 },
      {
        onSuccess: function () {
          onClose();
          reset();
        },
      },
    );
  }

  // For following
  const { mutate: followingFN } = useToggleFollowing();

  function handleFollowing() {
    const toastId = toast.loading("Following...");

    followingFN(user._id, {
      onSuccess: function (data) {
        toast.success(data?.message, { id: toastId });
      },
      onError: function (err) {
        toast.error(err?.message || "Failed to following", {
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
      <Modal
        backdrop="blur"
        className="rounded-xl shadow-lg"
        isOpen={isOpen}
        placement="center"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form
              className="space-y-4 p-4"
              onSubmit={handleSubmit(handleChangePassword)}
            >
              <ModalHeader className="flex flex-col items-center text-lg font-semibold">
                🔒 Change Password
              </ModalHeader>
              <ModalBody className="space-y-3">
                <Input
                  autoComplete="current-password"
                  label="Current Password"
                  size="md"
                  startContent={<Lock size={18} />}
                  type="password"
                  variant="bordered"
                  {...register("oldPassword")}
                  errorMessage={errors?.oldPassword?.message as string}
                  isInvalid={!!errors?.oldPassword}
                />
                <Input
                  autoComplete="new-password"
                  label="New Password"
                  size="md"
                  startContent={<KeyRound size={18} />}
                  type="password"
                  variant="bordered"
                  {...register("newPassword")}
                  errorMessage={errors?.newPassword?.message as string}
                  isInvalid={!!errors?.newPassword}
                />
                <Input
                  autoComplete="new-password"
                  label="Confirm New Password"
                  size="md"
                  startContent={<KeyRound size={18} />}
                  type="password"
                  variant="bordered"
                  {...register("newPassword2")}
                  errorMessage={errors?.newPassword2?.message as string}
                  isInvalid={!!errors?.newPassword2}
                />
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isPending}
                  type="submit"
                  variant="solid"
                >
                  Update Now
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <div className="flex gap-3 items-center">
        {nameChangedAction ? (
          <input
            ref={inputRef}
            className="border border-gray-400 rounded-md py-1 px-2"
            defaultValue={updatedName}
            type="text"
            onBlur={(e) => handleNameChange(e)}
          />
        ) : (
          <UserName isPremium={user?.premium} name={updatedName} />
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
        <Button
          className="mt-4"
          color="primary"
          size="sm"
          variant="flat"
          onPress={handleFollowing}
        >
          Follow
        </Button>
      )}
    </>
  );
}
