"use client"

import Link from "next/link"

export default function RedirectLink({ children, href }: { children: React.ReactNode, href: string}) {
  return (
    <Link legacyBehavior href={href} target="_blank">
      {children}
    </Link>
  );
}