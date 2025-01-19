/* eslint-disable prettier/prettier */
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Suspense } from "react";

import SigninForm from "./_components/SigninForm";

import Loading from "@/components/loading";

export default function SigninPage() {
  return (
    <>
      <div className="flex items-center min-h-screen justify-center">
        <Card className="w-full max-w-md p-5">
          <CardHeader className="flex flex-col gap-1 items-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-default-500">
              Please enter your details to sign in
            </p>
          </CardHeader>
          <CardBody>
            <Suspense fallback={<Loading />}>
              <SigninForm />
            </Suspense>
          </CardBody>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-default-500">
              Don&apos;t have an account?{" "}
              <Link className="text-blue-500" href="/signup">
                Signup
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
