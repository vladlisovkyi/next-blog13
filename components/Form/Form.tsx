"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";
import { useSession } from "next-auth/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { usePathname, useRouter } from "next/navigation";
import ReusableInput from "./LoginInput";
import Image from "next/image";
import { revalidateData } from "@/helpers/revalidateData";

interface IForm {
  title: string;
  content: string;
}

interface Props {
  revalTag: () => Promise<void>;
}

function Form({ revalTag }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    mode: "onBlur",
  });
  const { data: session } = useSession();
  const [image, setImage] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const category = segments[2];

  const handleImageChange = (res: UploadFileResponse[] | undefined) => {
    if (res && res[0]?.url) {
      setImage(res[0].url);
    } else {
      console.error("Image upload response is missing or does not contain URL");
    }
  };

  const onSubmit = async (data: IForm) => {
    if (!session?.user) return router.push(`/login?type=signin`);
    try {
      const { title, content } = data;
      const authorId = session?.user.id;
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          image,
          authorId,
        }),
      });
      console.log({ title, content, category, image, authorId });
      if (response.ok) {
        await revalidateData(`/category/${category}`);
        await revalTag();
        reset();
        setImage("");
        router.push(`/category/${category}`);
      } else {
        console.error("Error creating category");
      }
    } catch (error: any) {
      console.error("Error creating category", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto text-center py-5"
    >
      <h3 className="font-semibold text-2xl mb-12">Create Post</h3>
      <ReusableInput
        type="text"
        name="title"
        placeholder="Title here..."
        register={register}
        error={errors.title}
        pattern={{
          value: /^.{3,50}$/,
          message: "Title must be 3-50 characters",
        }}
      />

      <ReusableInput
        type="text"
        name="content"
        placeholder="Description here..."
        register={register}
        error={errors.content}
      />
      <div className="flex flex-col items-center">
        <UploadButton<OurFileRouter>
          className="px-6 py-3 bg-blue-300 inline-block rounded-md text-black"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => handleImageChange(res)}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {image ? (
          <Image
            src={image}
            alt="uploaded"
            width={200}
            height={200}
            className="max-w-full py-4"
            priority={true}
          />
        ) : null}
      </div>
      <button
        disabled={!image}
        type="submit"
        className="bg-[rgba(0,0,0,.7)] mt-8 rounded-md px-8 py-3 text-white"
      >
        {"Submit"}
      </button>
    </form>
  );
}

export default Form;
