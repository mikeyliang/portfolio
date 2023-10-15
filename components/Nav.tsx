import { IconFileTypePdf, IconClipboardText } from "@tabler/icons-react";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 z-50 grid w-full grid-cols-[1fr,2fr,1fr] px-12 py-8 text-zinc-600 dark:text-zinc-50">
      <a
        href="/"
        style={{ fontFamily: "Pacifico, cursive", fontSize: "32px" }}
        className="text-4xl font-bold hover:underline underlinefont-extrabold hover:underline-offset-4 ">
        miko
      </a>

      <div className="flex-row items-center justify-center hidden gap-2 px-2 py-3 font-bold bg-white border shadow-md md:flex text-zinc-800 border-zinc-200 rounded-xl whitespace-nowrap">
        <IconClipboardText className="text-blue-400" />
        <span> Project Pages &</span>
        <IconFileTypePdf className="text-red-400" />
        <span>PDF proj. viewer coming soon!!!</span>
      </div>
    </nav>
  );
}
