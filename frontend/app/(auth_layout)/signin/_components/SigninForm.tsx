/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import IQForm from "@/components/form/IQForm";
import IQInput from "@/components/form/IQInput";
import Loading from "@/components/loading";
import { useUser } from "@/context/user.provider";
import { useUserSignin } from "@/hooks/auth.hook";
import { AuthValidation } from "@/schemas/auth.schema";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const { setIsLoading: userLoading } = useUser();

  // Extract data from the custom hook
  const {
    mutate: signinFn,
    isPending,
    isSuccess,
    error,
    reset,
  } = useUserSignin();

  const handleLogin = async (data: FieldValues) => {
    reset();
    signinFn(data);
    userLoading(true);
  };

  useEffect(() => {
    if (isSuccess && !error) {
      userLoading(false);
      router.push(redirect || "/");
    }
  }, [isSuccess, error]);

  return (
    <>
      {isPending && <Loading />}
      <IQForm
        className="flex flex-col gap-4"
        resolver={AuthValidation.signinSchema}
        onSubmit={handleLogin}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -90 }}
          transition={{ delay: 0.2 }}
        >
          <IQInput required label="Email or Username" name="identity" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -70 }}
          transition={{ delay: 0.1 }}
        >
          <IQInput
            required
            endContent={
              showPassword ? (
                <EyeOff
                  className="cursor-pointer absolute right-3 top-4 opacity-70"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="cursor-pointer absolute right-3 top-4 opacity-70"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
          />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -50 }}
        >
          <Button className="w-full" size="lg" type="submit">
            Sign In
          </Button>
        </motion.div>
      </IQForm>
    </>
  );
};

export default SigninForm;
