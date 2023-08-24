import AllPostCards from "@/components/Post/AllPostCards";
import CtaCard from "@/components/UI/CtaCard";
import Footer from "@/components/Footer/Footer";
import { IPost } from "@/types";
import fetchAllPosts from "@/helpers/fetchAllPosts";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: "Explorer",
  };
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
