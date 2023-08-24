import React from "react";
import PostCard from "./PostCard";
import fetchPostById from "@/helpers/fetchPostById";

interface IPostCards {
  posts: string[];
}

const CategoryCards = async ({ posts }: IPostCards) => {
  const fetchedPosts = await Promise.all(
    posts.map((postId) => fetchPostById(postId))
  );

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {fetchedPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default CategoryCards;
