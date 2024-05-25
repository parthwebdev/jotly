import { cn } from "@/lib/utils";
import Image from "next/image";

interface BannerProps {
  url: string;
}

const Banner = ({ url }: BannerProps) => {
  return (
    <div
      className={cn("w-full h-[30vh]", url && "bg-muted", !url && "h-[25vh]")}
    >
      {!!url ? (
        <Image src={url} fill alt="Cover" className="object-cover" />
      ) : (
        <div className="w-full h-full bg-muted"></div>
      )}
    </div>
  );
};

export default Banner;
