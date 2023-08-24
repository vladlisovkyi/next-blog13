import calculateReadingTime from "@/helpers/calculateReadingTime";
import fetchCategoryById from "@/helpers/fetchCategoryById";
import fetchUserById from "@/helpers/fetchUserById";
import timestampToTime from "@/helpers/timestampToTime";
import truncateText from "@/helpers/truncate";
import { ICat, IPost, IUser } from "@/types";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

interface PostContentProps {
  post: IPost;
  isPostPage?: boolean;
  // locale: string;
}

const PostCardContent = async ({
  post,
  isPostPage = false,
}: PostContentProps) => {
  const categoryData: Promise<ICat> = fetchCategoryById(post.category);
  const categoryTitle = await categoryData;
  const userData: Promise<IUser> = fetchUserById(post.authorId);
  const authorName = await userData;
  return (
    <div className="space-y-2">
      <div
        className={`flex items-center flex-wrap gap-2  text-neutral-400 ${
          isPostPage ? "text-sm" : "text-xs @md:text-sm"
        }`}
      >
        <div
          className={`font-medium ${
            post.category === "Cities" ? "text-emerald-600" : "text-indigo-600"
          }`}
        >
          {categoryTitle.name}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${authorName.username}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{calculateReadingTime(post.content)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{timestampToTime(post.createdAt)}</div>
      </div>
      <h2
        className={`${
          isPostPage
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-3xl text-xl @md:text-2xl font-medium"
        } `}
      >
        {post.title}
      </h2>
      <p className="text-base @lg:text-lg leading-snug text-neutral-600">
        {truncateText(post.content)}
      </p>
      {/* Read More */}
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3">
          Read More
          <BsArrowRightShort size="14" />
        </div>
      )}
    </div>
  );
};

export default PostCardContent;
