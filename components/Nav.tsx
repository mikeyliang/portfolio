import { IconFileTypePdf, IconClipboardText } from "@tabler/icons-react";

export default function Nav() {
  return (
    <nav className=" relative lg:fixed top-0 left-0 z-50 grid w-full grid-cols-[1fr,2fr,1fr] px-12 py-8 text-zinc-600 dark:text-zinc-50">
      <a
        href="/"
        style={{ fontFamily: "Pacifico, cursive", fontSize: "32px" }}
        className="text-4xl font-bold hover:underline underlinefont-extrabold hover:underline-offset-4 ">
        miko
      </a>
    </nav>
  );
}
