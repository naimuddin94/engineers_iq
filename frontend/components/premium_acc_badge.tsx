"use client";
import { VerifiedBadge } from "./icons";

const UserName = ({
  name,
  isPremium,
}: {
  name: string | undefined;
  isPremium: boolean | undefined;
}) => {
  return (
    <div className="flex items-center gap-[2px]">
      <h1>{name}</h1>
      {isPremium && <VerifiedBadge />}
    </div>
  );
};

export default UserName;
