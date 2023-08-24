"use client";

import React, { useEffect, useState } from "react";
import PaddingContainer from "../UI/PaddingContainer";
import Link from "next/link";
import { ICat } from "@/types";
import MenuLogin from "./MenuLogin";
import { MdOutlineExplore, MdCardTravel } from "react-icons/md";

const Header = () => {
  const [categories, setCategories] = useState<ICat[]>([]);
  const fetchAllCategories = async () => {
    try {
      const response = await fetch(`/api/categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data: ICat[] = await response.json();
      if (!data) return;
      setCategories(data);
    } catch (error) {
      throw new Error("fail", error as any);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <header className="sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md">
      <PaddingContainer>
        <div className="flex items-center justify-between py-2">
          <Link className="text-lg font-bold" href={`/`}>
            Explorer
          </Link>
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600">
              {categories &&
                categories?.map((category, index) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category._id}`}
                      className="capitalize p-3"
                    >
                      {index === 0 ? (
                        <MdCardTravel size={22} className="sm:hidden" />
                      ) : (
                        <MdOutlineExplore size={22} className="sm:hidden" />
                      )}
                      <span className="hidden sm:block">{category.name}</span>
                    </Link>
                  </li>
                ))}
              <MenuLogin />
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </header>
  );
};

export default Header;
