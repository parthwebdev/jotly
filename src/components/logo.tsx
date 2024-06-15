import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/jotly-logo.svg" width="32" height="32" alt="Logo" />
      <p className="text-xl font-semibold max-sm:hidden">Jotly</p>
    </div>
  );
}
export default Logo;
