import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity.types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="rounded overflow-hidden p-4 shadow-2xl flex flex-col transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
      <div className="flex justify-between items-center;">
        <p className="font-bold text-zinc-500">{formatDate(_createdAt)}</p>
        <div className="relative gap-1.5 flex items-center justify-center px-2 py-1 bg-red-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
          <EyeIcon className="size-6 text-white" />
          <span className="relative z-10">{views}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/startup/${_id}`}>
            <h3 className="text-2xl font-bold line-clamp-1">{title}</h3>
          </Link>
          <Link href={`/user/${author?._id}`}>
            <p className="text-sm font-medium line-clamp-1">{author?.name}</p>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      
      <div className="mt-5">
        <Link href={`/startup/${_id}`}>
          <p className="mb-3 line-clamp-3">{description}</p>

          <img src={image} alt="placeholder" className="w-full h-[164px] rounded-[10px] object-cover" />
        </Link>
      </div>

      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-white font-bold rounded-full text-sm px-4 py-2 bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">#{category}</p>
        </Link>
        <Button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hover:bg-white" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;