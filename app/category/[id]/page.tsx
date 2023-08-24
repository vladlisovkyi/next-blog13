import CategoryCards from "@/components/Post/CategoryCards";
import fetchAllCategories from "@/helpers/fetchAllCategories";
import fetchCategoryById from "@/helpers/fetchCategoryById";
import { ICat } from "@/types";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const categoryData: Promise<ICat> = fetchCategoryById(id);
  const category = await categoryData;
  return {
    title: `${category.name} posts`,
  };
}

const CategoryPage = async ({ params: { id } }: PageProps) => {
  const categoryData: Promise<ICat> = fetchCategoryById(id);
  const category = await categoryData;
  const categoryPostIds = category.posts;
  if (!categoryPostIds) {
    return (
      <>
        <h3 className="text-lg py-5 text-center">
          No posts for this category yet
        </h3>
      </>
    );
  }
  return (
    <>
      <CategoryCards posts={categoryPostIds} />
      <Link
        href={`/category/${id}/create`}
        className="fixed bottom-[50px] left-1/2 transform -translate-x-1/2 bg-blue-300 px-8 py-3 rounded-lg hover:bg-blue-400 transition-colors duration-200 text-center"
      >
        Create Post
      </Link>
    </>
  );
};

export default CategoryPage;

export async function generateStaticParams() {
  const catsData: Promise<ICat[]> = fetchAllCategories();
  const cats = await catsData;

  return cats.map((post) => ({
    id: post._id.toString(),
  }));
}
