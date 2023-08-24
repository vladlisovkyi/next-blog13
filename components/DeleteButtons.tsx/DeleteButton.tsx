"use client";

import { revalidateData } from "@/helpers/revalidateData";
import { IPost } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface IProps {
  post: IPost;
  revalTag: () => Promise<void>;
}

async function deletePostById(id: string) {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");

  return res.json();
}


const DeleteButton = ({ post, revalTag }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const deletePost = async () => {
    if (!session?.user) {
      return router.push("/login?type=signin");
    }

    const isAuthor = session.user.id === post.authorId;

    if (isAuthor) {
      try {
        await deletePostById(post._id);
        await revalidateData("/");
        await revalTag();
        router.push("/");
        return toast.success("Post Deleted Succesfully.");
      } catch (error) {
        toast.error("Error deleting post");
      }
    } else {
      toast.error("You are not the author of this post");
    }
  };
  return (
    <div>
      <button
        onClick={deletePost}
        className="px-4 py-2 w-14 h-14 flex justify-center items-center rounded-full hover:bg-red-100 group transition-colors duration-150"
      >
        <AiFillDelete
          className="text-red-700 opacity-30 group-hover:opacity-100 group-hover:text-red-500 transition-all duration-150"
          size={28}
        />
      </button>
    </div>
  );
};

export default DeleteButton;
