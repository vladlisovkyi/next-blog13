import AllPostCards from "@/components/Post/AllPostCards";
import CtaCard from "@/components/UI/CtaCard";
import Footer from "@/components/Footer/Footer";
import { IPost } from "@/types";
// import fetchAllPosts from "@/helpers/fetchAllPosts";
// import fetchAllPosts from "@/helpers/fetchAllPosts";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: "Explorer",
  };
}

export async function fetchAllPosts() {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    next: { revalidate: 1, tags: ["posts"] },
  });
  if (!res.ok) throw new Error("fail");
  return res.json();
}

export default async function Home() {
  const postsData: Promise<IPost[]> = fetchAllPosts();
  const posts = await postsData;
  return (
    <>
      <AllPostCards posts={posts} />
      <CtaCard />
      <Footer />
    </>
  );
}
