import LoginForm from "@/components/Form/LoginForm";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
};

export default page;
