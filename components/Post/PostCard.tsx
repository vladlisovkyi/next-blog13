import React from "react";
import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import PostCardContent from "./PostCardContent";
interface PostProps {
  post: IPost;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reverse = false,
}: PostProps) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid items-center grid-cols-1 md:grid-cols-2 gap-10"
          : "space-y-10"
      } group `}
      href={`/post/${post._id}`}
    >
      <div
        className={`rounded-md overflow-hidden ${
          reverse ? "md:order-last" : ""
        }`}
      >
        <Image
          className={`rounded-md w-full object-cover object-center h-full max-h-[300px] group-hover:scale-110 transition-transform duration-200 
          `}
          alt={post.title}
          src={`${
            post?.image ||
            'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"'
          }`}
          width={600}
          height={300}
        />
      </div>

      <PostCardContent post={post} />
    </Link>
  );
};

export default PostCard;
