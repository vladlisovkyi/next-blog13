"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import ReusableInput from "./LoginInput";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormState {
  email: string;
  username?: string;
  password: string;
  repeatPassword?: string;
}

const LoginForm = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "signin" | "signup" | null;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormState>({
    mode: "onBlur",
  });
  const handleFormSubmit = async (data: FormState) => {
    console.log(type);
    if (type === "signup") {
      const { username, email, password } = data;
      const res = await fetch(`${process.env.PUBLIC_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login?type=signin");
      } else {
        const errorResponse = await res.json();
        toast.error(
          errorResponse.error ||
            "This email is already registered or something bad happened"
        );
      }
    } else if (type === "signin") {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.push("/");
    }
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full sm:w-[440px] py-6 px-3 mx-auto border text-center"
    >
      <h3 className="text-2xl mb-8">
        {type === "signup" ? "Sign Up" : "Sign In"}
      </h3>
      <ReusableInput
        type="email"
        name="email"
        placeholder="Your email"
        register={register}
        error={errors.email}
        pattern={{
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Please enter a valid email address",
        }}
      />
      {type === "signup" && (
        <ReusableInput
          type="text"
          name="username"
          placeholder="Your name"
          register={register}
          error={errors.username}
          pattern={{
            value: /^[A-Za-z '-]+$/,
            message: "Please enter a valid name",
          }}
        />
      )}
      <ReusableInput
        type="password"
        name="password"
        placeholder="Your password"
        register={register}
        error={errors.password}
        pattern={{
          value: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]+$/,
          message: "Password is invalid",
        }}
        validation={(value) =>
          value === getValues("password") || "Passwords do not match"
        }
      />
      {type === "signup" && (
        <ReusableInput
          type="password"
          name="repeatPassword"
          placeholder="Repeat your password"
          register={register}
          error={errors.repeatPassword}
          validation={(value) =>
            value === getValues("password") || "Passwords do not match"
          }
        />
      )}
      <Link
        className="block text-gray-500 text-sm hover:underline underline-offset-2"
        href={`${
          type === "signup" ? "/login?type=signin" : "/login?type=signup"
        }`}
      >
        {type === "signup"
          ? "You have an account? Sign in"
          : "You are new? Sign up"}
      </Link>
      <button
        className="px-6 py-3 rounded-lg bg-blue-300 mt-6 hover:bg-blue-400 transition-colors duration-150"
        type="submit"
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
