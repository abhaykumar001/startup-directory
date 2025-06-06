import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="relative pt-36 pb-24">
        <div className="bg-linear-65 from-purple-500 to-pink-500 w-full absolute top-0 left-0 z-0 h-60 object-cover" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center relative z-10 mb-2.5">
            <Image
              src={user.image}
              alt={user.name}
              width={220}
              height={220}
              className="border-4 border-solid border-white rounded-full object-cover"
            />
          </div>

          <h3 className="uppercase text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-1 line-clamp-1">
            {user.name}
          </h3>


          <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
            @{user?.username}
          </p>
          <p className="mt-1 text-center font-normal">{user?.bio}</p>
        </div>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-2xl font-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <div className="flex justify-center items-center">
            <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
              <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
              </Suspense>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;