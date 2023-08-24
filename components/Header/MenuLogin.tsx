"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const MenuLogin = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="bg-[rgba(0,0,0,.7)] rounded-md px-5 py-2 text-white">
        Loading...
      </p>
    );
  }
  return (
    <>
      {session?.user ? (
        <button
          className="bg-[rgba(0,0,0,.7)] rounded-md px-5 py-2 text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <Link
          href={`/login?type=signin`}
          className="bg-[rgba(0,0,0,.7)] rounded-md px-5 py-2 text-white"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default MenuLogin;
