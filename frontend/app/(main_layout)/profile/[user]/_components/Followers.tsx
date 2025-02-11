/* eslint-disable prettier/prettier */
"use client";

import { Tooltip } from "@heroui/tooltip";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "@/components/loading";
import UserName from "@/components/premium_acc_badge";
import { useUser } from "@/context/user.provider";
import { useToggleFollowing, useUserProfile } from "@/hooks/auth.hook";

export default function Followers({ username }: { username: string }) {
  const { data } = useUserProfile(username);
  const { user: currentUser, isLoading: userLoading } = useUser();

  const user = data?.data;

  const [isWonProfile, setIsWonProfile] = useState<boolean>(
    currentUser?.username === username,
  );
  const [flowFlungDisplay, setFlowFlungDisplay] = useState<number>(5);

  useEffect(() => {
    if (currentUser?.username === username) {
      setIsWonProfile(true);
    } else {
      setIsWonProfile(false);
    }
  }, [userLoading]);

  // For following
  const { mutate: followingFN } = useToggleFollowing();

  function handleUnfollow(userId: string) {
    const toastId = toast.loading("Unfollowing...");

    followingFN(userId, {
      onSuccess: function (data) {
        toast.success(data?.message, { id: toastId });
      },
      onError: function (err) {
        toast.error(err?.message || "Failed to unfollowing", {
          id: toastId,
        });
      },
    });
  }

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      {isWonProfile ? (
        <div className="mt-8">
          <div className="">
            <h3 className="text-xl font-semibold mb-4">Following</h3>
            {user?.following
              ?.slice(0, flowFlungDisplay)
              ?.reverse()
              ?.map((following, indx) => (
                <div
                  key={indx}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" src={following.image} />
                    <div className="text-sm">
                      <UserName
                        isPremium={following?.premium}
                        name={following?.name}
                      />
                      <p className=" text-gray-600 text-sm">
                        @{following?.username}
                      </p>
                    </div>
                  </div>

                  <Tooltip
                    content={
                      <div className="px-3 py-1">
                        <Button onPress={() => handleUnfollow(following._id)}>
                          Unfollow
                        </Button>
                        <div className="text-sm hover:scale-105 transition-all">
                          <Link href={`/profile/${following.username}`}>
                            Visit Profile
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <Button
                      isIconOnly
                      aria-label="More options"
                      variant="light"
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </Tooltip>
                </div>
              ))}
          </div>
          {user?.following && user?.following?.length > 5 && (
            <button
              className="text-sky-600"
              onClick={() =>
                setFlowFlungDisplay(
                  flowFlungDisplay > 5 ? 5 : user.following.length,
                )
              }
            >
              {flowFlungDisplay > 5
                ? "See less"
                : `See all (${user.following.length + 1})`}
            </button>
          )}
        </div>
      ) : (
        // followers list
        <div className="mt-8">
          <div className="">
            <h3 className="text-xl font-semibold mb-4">Followers</h3>
            {user?.followers
              ?.slice(0, flowFlungDisplay)
              ?.reverse()
              ?.map((follower, indx) => (
                <div
                  key={indx}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" src={follower.image} />
                    <div className="text-sm">
                      <UserName
                        isPremium={follower?.premium}
                        name={follower?.name}
                      />
                      <p className=" text-gray-600 text-sm">
                        @{follower?.username}
                      </p>
                    </div>
                  </div>
                  <Tooltip
                    content={
                      <div className="px-3 py-1">
                        <div className="text-sm hover:scale-105 transition-all">
                          <Link href={`/profile/${follower.username}`}>
                            Visit Profile
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <Button
                      isIconOnly
                      aria-label="More options"
                      variant="light"
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </Tooltip>
                </div>
              ))}
          </div>
          {user?.followers && user?.followers?.length > 5 && (
            <button
              className="text-sky-600"
              onClick={() =>
                setFlowFlungDisplay(
                  flowFlungDisplay > 5 ? 5 : user.followers.length,
                )
              }
            >
              {flowFlungDisplay > 5
                ? "See less"
                : `See all (${user.followers.length + 1})`}
            </button>
          )}
        </div>
      )}
    </>
  );
}
