import { client } from "@/sanity/lib/client";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams } : {searchParams: Promise<{ query?: string}>}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [{
  //   _createdAt: "yesteray",
  //   views: 55,
  //   author: {_id: 1, name:'dono'},
  //   _id: 1,
  //   description: "this is dis",
  //   image: "https://rukminim2.flixcart.com/image/832/832/jzblaq80/musical-toy/n/q/b/best-musical-and-naugty-dancing-robot-noxxi-original-imafj78583kjxacg.jpeg?q=70&crop=false",
  //   category: "robo",
  //   title: "we robo",
  // }]
 
  return (
    <>
      <section className=" w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          Pitch your startup
         </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words;"> 
          Submit Ideas, And get Noticed
        </p>

        <SearchForm query={query}/>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto;">
        <p className="font-semibold text-[30px] text-black;">
          {query ? `Search Result for "${query}"` : 'All Startups'}
        </p>
      </section>
      <ul className="px-10 mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5;">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
    </>
  );
}