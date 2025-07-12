/* src/components/ui/avatar.tsx */
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthProvider";
import { getMyProfile, UserProfile } from "@/lib/user";

/* ──────────── Avatar primitives ──────────── */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
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
    className={cn("aspect-square h-full w-full object-cover", className)}
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
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-white text-sm font-semibold",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* ──────────── Menu items ──────────── */
interface MenuLink {
  type: "link";
  to: `/${string}`;
  iconSrc: string;
  label: string;
}
interface MenuDivider {
  type: "divider";
}
type MenuItem = MenuLink | MenuDivider;

const COMMON_ITEMS: MenuItem[] = [
  { type: "link", to: "/news", iconSrc: "/svg/news.svg", label: "News" },
  { type: "link", to: "/wishlist", iconSrc: "/svg/notification.svg", label: "Wish List" },
  { type: "link", to: "/watching-history", iconSrc: "/svg/watch_history.svg", label: "Watch history" },
  { type: "divider" },
];

/* ──────────── AvatarMenu ──────────── */
export function AvatarMenu() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [imgSrc, setImgSrc]   = React.useState("/placeholder.svg?height=40&width=40");

  const isAuth = Boolean(authUser?.email);

  /* fetch full profile once the user is authenticated */
  React.useEffect(() => {
    if (!isAuth) return;                 // guest: keep defaults
    (async () => {
      try {
        const p = await getMyProfile();
        setProfile(p);
        if (p.avatarUrl) setImgSrc(p.avatarUrl);
      } catch {
        /* swallow error – fallback UI already covers it */
      }
    })();
  }, [isAuth]);

  /* derived display data */
  const display   = profile ? `${profile.firstName} ${profile.lastName}` : (authUser?.email ?? "Guest");
  const handleId  = profile ? `${profile.username}` : (isAuth ? `@${authUser!.email.split("@")[0]}` : "—");
  const fallbackC = profile ? profile.firstName[0] : (isAuth ? authUser!.email[0].toUpperCase() : "G");

  const menuItems: MenuItem[] = isAuth
    ? [
        ...COMMON_ITEMS,
        { type: "link", to: "/account", iconSrc: "/svg/manage_account.svg", label: "Manage account" },
        { type: "link", to: "/account/add", iconSrc: "/svg/add_new_account.svg", label: "Add new account" },
        { type: "link", to: "/logout", iconSrc: "/svg/sign_out.svg", label: "Sign out" },
      ]
    : [
        ...COMMON_ITEMS,
        { type: "link", to: "/login", iconSrc: "/svg/sign_in.svg", label: "Log in" },
      ];

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  /* reusable avatar content */
  const AvatarNode = (
    <>
      <AvatarImage
        src={imgSrc}
        alt="Avatar"
        onError={() => setImgSrc("/placeholder.svg?height=40&width=40")}
      />
      <AvatarFallback>{fallbackC}</AvatarFallback>
    </>
  );

  /* UI */
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-800 transition-colors">
          <Avatar>{AvatarNode}</Avatar>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={6} align="end" asChild>
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="w-64 bg-[#161616] border border-[#60605E] rounded-xl overflow-hidden z-50 shadow-lg"
          >
            {/* header */}
            <Popover.Close asChild>
              <NextLink
                href={isAuth ? "/account" : "/login"}
                className="flex items-center gap-3 px-5 py-2 hover:bg-[#1a1a1a] transition-colors"
              >
                <Avatar className="h-10 w-10">{AvatarNode}</Avatar>
                <div className="leading-tight">
                  <p className="text-base font-semibold text-white">{display}</p>
                  <p className="text-sm text-gray-400">{handleId}</p>
                </div>
              </NextLink>
            </Popover.Close>

            <div className="border-t border-[#60605E]" />

            {/* menu body */}
            {menuItems.map((item, i) => {
              if (item.type === "divider") return <div key={i} className="border-t border-[#60605E]" />;
              if (item.to === "/logout")
                return (
                  <button
                    key={item.to}
                    onClick={handleSignOut}
                    className={cn(
                      "w-full text-left group flex items-center gap-4 px-5 py-2",
                      "text-gray-400 hover:text-white transition-colors",
                    )}
                  >
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-5 w-5 shrink-0 filter brightness-90 group-hover:brightness-200 transition"
                    />
                    <span className="text-base font-medium">{item.label}</span>
                  </button>
                );

              return (
                <Popover.Close asChild key={item.to}>
                  <NextLink
                    href={item.to}
                    className={cn(
                      "group flex items-center gap-4 px-5 py-2",
                      "text-gray-400 hover:text-white transition-colors",
                    )}
                  >
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-5 w-5 shrink-0 filter brightness-90 group-hover:brightness-200 transition"
                    />
                    <span className="text-base font-medium">{item.label}</span>
                  </NextLink>
                </Popover.Close>
              );
            })}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
