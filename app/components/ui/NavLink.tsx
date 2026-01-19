"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition ${
        isActive
          ? "text-white font-medium"
          : "text-buttercream/80 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
