export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 flex flex-row items-center gap-5 px-12 py-4 text-zinc-600 dark:text-zinc-50">
      <a
        href="/"
        style={{ fontFamily: "Pacifico, cursive", fontSize: "32px" }}
        className="hover:underline underline-offset-4">
        miko
      </a>
    </nav>
  );
}
