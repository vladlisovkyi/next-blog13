import React from "react";
import PostContent from "./PostContent";
import Image from "next/image";
import { IPost } from "@/types";

interface IPostHero {
  post: IPost;
}

const PostHero = ({ post }: IPostHero) => {
  return (
    <div>
      <PostContent isPostPage post={post} />
      <Image
        priority
        className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
        src={`${post.image}`}
        width={1280}
        height={500}
        alt={post.title}
      />
    </div>
  );
};

export default PostHero;
