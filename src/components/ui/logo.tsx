import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        width="32"
        height="32"
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        width="32"
        height="32"
        alt="Logo"
        className="hidden dark:block w-auto h-auto"
      />
      <p className="font-semibold max-sm:hidden">Notion</p>
    </div>
  );
}
export default Logo;
