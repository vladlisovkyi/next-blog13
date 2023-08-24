import { IPost } from "@/types";
import React from "react";
import PostCard from "./PostCard";

interface IPostCards {
  posts: IPost[];
}

const AllPostCards = ({ posts }: IPostCards) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 py-6">
      {posts.map((post, index) => (
        <PostCard
          key={post._id}
          reverse={(index + 1) % 4 === 0 || index === 0}
          post={post}
        />
      ))}
    </div>
  );
};

export default AllPostCards;
