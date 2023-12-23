"use client"

import Link from "next/link"

export default function RedirectLink({ children, href }: { children: React.ReactNode, href: string}) {
  return <Link href={href} target="_blank">{children}</Link>;
}