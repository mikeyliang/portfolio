import { IconFileTypePdf, IconClipboardText } from "@tabler/icons-react";

export default function Nav() {
  return (
    <nav className="relative top-0 left-0 z-40 py-8 pl-6  lg:fixed lg:z-0 sm:pl-12 text-zinc-600">
      <a
        href="/"
        style={{ fontFamily: "Pacifico, cursive" }}
        className="text-2xl font-bold sm:text-3xl md:text-4xl hover:underline underlinefont-extrabold hover:underline-offset-4 ">
        miko
      </a>
    </nav>
  );
}
