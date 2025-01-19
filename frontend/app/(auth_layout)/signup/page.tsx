/* eslint-disable prettier/prettier */
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Suspense } from "react";

import SignupForm from "./_components/SignupForm";

import Loading from "@/components/loading";

export default function SignupPage() {
  return (
    <div className="flex items-center min-h-screen justify-center py-10">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-sm text-default-500">
            Please enter your details to sign up
          </p>
        </CardHeader>
        <CardBody>
          <Suspense fallback={<Loading />}>
            <SignupForm />
          </Suspense>
        </CardBody>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-default-500">
            Already have an account?{" "}
            <Link className="text-blue-500" href="/signin">
              Signin
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
