import PostHero from "@/components/Post/PostHero";
import CtaCard from "@/components/UI/CtaCard";
import PaddingContainer from "@/components/UI/PaddingContainer";
import SocialLink from "@/components/UI/SocialLink";
import fetchAllPosts from "@/helpers/fetchAllPosts";
import fetchPostById from "@/helpers/fetchPostById";
import { IPost } from "@/types";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const postData: Promise<IPost> = fetchPostById(id);
  const post = await postData;
  return {
    title: `${post.title}`,
  };
}

const PostPage = async ({ params: { id } }: PageProps) => {
  const postData: Promise<IPost> = fetchPostById(id);
  const post = await postData;
  return (
    <PaddingContainer>
      <div className="space-y-10 py-10">
        <PostHero post={post} />
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex items-center justify-center gap-5 w-full">
            <div className="font-medium hidden md:block">
              Share this content:
            </div>
            <SocialLink
              isShareURL
              platform="facebook"
              link={`https://github.com/vladlisovkyi`}
            />
            <SocialLink
              isShareURL
              platform="twitter"
              link={`https://github.com/vladlisovkyi`}
            />
            <SocialLink
              isShareURL
              platform="linkedin"
              link={`https://github.com/vladlisovkyi`}
            />
          </div>
        </div>

        <CtaCard />
      </div>
    </PaddingContainer>
  );
};

export default PostPage;

export async function generateStaticParams() {
  const postsData: Promise<IPost[]> = fetchAllPosts();
  const posts = await postsData;

  return posts.map((post) => ({
    id: post._id.toString(),
  }));
}
