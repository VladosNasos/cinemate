// src/components/ui/avatar.tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────
   Avatar primitives – unchanged
──────────────────────────────────────────── */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* ────────────────────────────────────────────
   Menu items – discriminated union
──────────────────────────────────────────── */
type MenuLink = {
  type: "link";
  to: `/${string}`;
  iconSrc: string;
  label: string;
};
type MenuDivider = { type: "divider" };
type MenuItem = MenuLink | MenuDivider;

const MENU_ITEMS: MenuItem[] = [
  { type: "link", to: "/news",          iconSrc: "/svg/news.svg",            label: "News" },
  { type: "link", to: "/notifications", iconSrc: "/svg/notification.svg",    label: "Notifications" },
  { type: "link", to: "/history",       iconSrc: "/svg/watch_history.svg",   label: "Watch history" },
  { type: "divider" },
  { type: "link", to: "/account",       iconSrc: "/svg/manage_account.svg",  label: "Manage account" },
  { type: "link", to: "/account/add",   iconSrc: "/svg/add_new_account.svg", label: "Add new account" },
  { type: "link", to: "/logout",        iconSrc: "/svg/sign_out.svg",        label: "Sign out" },
];

/* ────────────────────────────────────────────
   AvatarMenu
──────────────────────────────────────────── */
export function AvatarMenu() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-800 transition-colors">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="User"
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={6} align="end" asChild>
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="
              w-64 bg-[#161616]
              border border-[#60605E] 
              rounded-xl overflow-hidden z-50 shadow-lg
            "
          >
            {/* ─── Profile header – now a link to /account ─────────────────────── */}
            <Popover.Close asChild>
              <NextLink
                href="/account"
                className="flex items-center gap-3 px-5 py-2 hover:bg-[#1a1a1a] transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <p className="text-base font-semibold text-white">
                    Nicolas Tetcher
                  </p>
                  <p className="text-sm text-gray-400">@newuser245</p>
                </div>
              </NextLink>
            </Popover.Close>

            {/* divider between header and first item group */}
            <div className="border-t border-[#60605E]" />

            {/* ─── Menu items ─────────────────────────── */}
            {MENU_ITEMS.map((item, i) =>
              item.type === "divider" ? (
                <div
                  key={i}
                  className="border-t border-[#60605E]"
                />
              ) : (
                <Popover.Close asChild key={item.to}>
                  <NextLink
                    href={item.to}
                    className={cn(
                      "group flex items-center gap-4 px-5 py-2",
                      "text-gray-400 hover:text-white",
                      "transition-colors"
                    )}
                  >
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-5 w-5 shrink-0 filter brightness-90 group-hover:brightness-200 transition"
                    />
                    <span className="text-base font-medium">
                      {item.label}
                    </span>
                  </NextLink>
                </Popover.Close>
              )
            )}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
  