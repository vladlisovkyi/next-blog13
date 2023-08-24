import Form from "@/components/Form/Form";
import { revalidateTag } from "next/cache";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Create a Post",
  };
}



const CreatePostPage = () => {
  const revalTag = async () => {
    "use server";
    revalidateTag("posts");
    revalidateTag("categories");
  };
  return (
    <div>
      <Form revalTag={revalTag} />
    </div>
  );
};

export default CreatePostPage;
