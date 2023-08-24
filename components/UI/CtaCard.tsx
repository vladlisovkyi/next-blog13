import Image from "next/image";
import Link from "next/link";
import React from "react";

const CtaCard = () => {
  return (
    <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      {/* Conent Container */}
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          Explore the world around us with us!
        </h3>
        <p className="max-w-lg mt-2 text-lg">
          Explore the world with me! I&apos;m travelling around the 🌍.
          I&apos;ve visited most of the great cities of 🇺🇸 and currently
          I&apos;m travelling in 🇪🇺 Join me!
        </p>
        <Link
          href={"/login?type=signup"}
          className="px-5 py-2 mt-5 inline-block rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200 hover:bg-neutral-800 transition-colors duration-150"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default CtaCard;
