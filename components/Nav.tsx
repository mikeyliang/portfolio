import { IconFileTypePdf, IconClipboardText } from "@tabler/icons-react";

export default function Nav() {
  return (
    <nav className=" relative lg:fixed top-0 left-0 z-50 grid w-full grid-cols-[1fr,2fr,1fr] px-6 sm:px-12 py-8 text-zinc-600">
      <a
        href="/"
        style={{ fontFamily: "Pacifico, cursive" }}
        className="text-2xl font-bold sm:text-3xl md:text-4xl hover:underline underlinefont-extrabold hover:underline-offset-4 ">
        miko
      </a>
    </nav>
  );
}
