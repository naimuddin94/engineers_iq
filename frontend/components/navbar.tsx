"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Spinner } from "@nextui-org/spinner";
import { link as linkStyles } from "@nextui-org/theme";
import { User } from "@nextui-org/user";
import clsx from "clsx";
import NextLink from "next/link";

import UserName from "./premium_acc_badge";
import Logo from "./utility/Logo";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

//! for development purpose
const currentUser = {
  name: "Md Naim Uddin",
  image: "",
  username: "mdnaim",
  premium: false,
};
const isLoading = false;

const signOut = () => {};

export const Navbar = () => {
  const profileDropdownDesktop = (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: currentUser?.image,
          }}
          className="transition-transform"
          description={`@${currentUser?.username}`}
          name={
            <UserName
              isPremium={currentUser?.premium}
              name={currentUser?.name}
            />
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings" color="secondary">
          <Link href={`/profile/${currentUser?.username}`}>
            Profile & Analytics
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const profileDropdownMobile = (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="sm"
          src={currentUser?.image}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <span className="font-semibold">
            <UserName
              isPremium={currentUser?.premium}
              name={currentUser?.name}
            />
          </span>
          <p className="font-semibold">{`@${currentUser?.username}`}</p>
        </DropdownItem>
        <DropdownItem key="settings" color="secondary">
          <Link href={`/profile/${currentUser?.username}`}>
            Profile & Analytics
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <NextUINavbar className="z-[99]" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ThemeSwitch />
        <NavbarItem className="hidden lg:flex">
          {/* {searchInput} */}
        </NavbarItem>

        {currentUser && (
          <Link href="/new">
            {/* <WriteIcon /> */}
            <Chip color="primary" variant="flat">
              + Create
            </Chip>
          </Link>
        )}

        {isLoading ? (
          <Spinner size="sm" />
        ) : currentUser ? (
          profileDropdownDesktop
        ) : (
          <Link className="text-default-foreground" href="/auth/login">
            <Button color="default" variant="bordered">
              Sign In
            </Button>
          </Link>
        )}
      </NavbarContent>

      {/* mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {currentUser && (
          <Link href="/new">
            <Chip color="primary" variant="flat">
              + Create
            </Chip>
          </Link>
        )}
        <ThemeSwitch />
        {!currentUser && (
          <Link className="text-default-foreground" href="/auth/login">
            <Chip color="default" variant="flat">
              Sign In
            </Chip>
          </Link>
        )}
        {isLoading ? (
          <Spinner size="sm" />
        ) : currentUser ? (
          profileDropdownMobile
        ) : null}
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {!currentUser && (
            <NavbarMenuItem>
              <Link color="primary" href="/auth/login" size="lg">
                Sign In
              </Link>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
