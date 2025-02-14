/* eslint-disable prettier/prettier */
"use client";

import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Spinner } from "@nextui-org/spinner";
import { link as linkStyles } from "@nextui-org/theme";
import { User } from "@nextui-org/user";
import clsx from "clsx";
import Link from "next/link";

import UserName from "./premium_acc_badge";
import Logo from "./utility/Logo";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { useUser } from "@/context/user.provider";
import { signout } from "@/services/AuthService";

export default function Navbar() {
  const { user, isLoading, setUser } = useUser();

  const handleSignout = () => {
    signout();
    setUser(null);
  };

  const profileDropdownDesktop = user && (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          key={user?.image}
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.image || "",
          }}
          className="transition-transform"
          description={`@${user.username}`}
          name={<UserName isPremium={false} name={user.name || "Guest"} />}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings" color="secondary">
          <Link href={`/profile/${user.username}`}>Profile & Analytics</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignout}>
          Signout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const profileDropdownMobile = user && (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          key={user?.image}
          isBordered
          as="button"
          className="transition-transform"
          size="sm"
          src={user.image || ""}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <span className="font-semibold">
            <UserName isPremium={user.premium} name={user.name || "Guest"} />
          </span>
          <p className="font-semibold">{`@${user.username}`}</p>
        </DropdownItem>
        <DropdownItem key="settings" color="secondary">
          <Link href={`/profile/${user.username}`}>Profile & Analytics</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignout}>
          Signout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <NextUINavbar className="z-[99]" maxWidth="xl" position="sticky">
      {/* Left Content */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {user && (
          <Link href="/new">
            {/* <WriteIcon /> */}
            <Chip color="primary" variant="flat">
              + Create
            </Chip>
          </Link>
        )}
        <ThemeSwitch />
        {isLoading ? (
          <Spinner size="sm" />
        ) : user ? (
          profileDropdownDesktop
        ) : (
          <Link
            className="border-2 border-slate-600 rounded-xl px-5 py-2"
            href="/signin"
          >
            Sign In
          </Link>
        )}
      </NavbarContent>

      {/* Mobile Content */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {isLoading ? (
          <Spinner size="sm" />
        ) : user ? (
          profileDropdownMobile
        ) : (
          <Link
            className="border-2 border-slate-600 rounded-xl px-4 py-2"
            href="/signin"
          >
            Sign In
          </Link>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <Link key={`${item}-${index}`} color="foreground" href={item.href}>
              {item.label}
            </Link>
          ))}
          {!user && (
            <Link color="primary" href="/signin">
              Sign In
            </Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
