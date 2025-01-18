/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import IQFileInput from "@/components/form/IQFileInput";
import IQForm from "@/components/form/IQForm";
import IQInput from "@/components/form/IQInput";
import Loading from "@/components/loading";
import { useUser } from "@/context/user.provider";
import { useUserSignup } from "@/hooks/auth.hook";
import { AuthValidation } from "@/schemas/auth.schema";

const SignupForm = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const { mutate: signupFn, isPending, isSuccess } = useUserSignup();

  const redirect =
    typeof window !== "undefined" ? searchParams.get("redirect") : null;

  const handleSignup = async (data: FieldValues) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    signupFn(formData);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <IQForm
        className="flex flex-col gap-4"
        resolver={AuthValidation.signupSchema}
        onSubmit={handleSignup}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ delay: 0.6 }}
        >
          <IQFileInput name="image" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -60 }}
          transition={{ delay: 0.5 }}
        >
          <IQInput required label="Name" name="name" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -70 }}
          transition={{ delay: 0.4 }}
        >
          <IQInput required label="Email" name="email" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -80 }}
          transition={{ delay: 0.3 }}
        >
          <IQInput required label="Username" name="username" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -90 }}
          transition={{ delay: 0.2 }}
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
          initial={{ opacity: 0, y: -100 }}
          transition={{ delay: 0.1 }}
        >
          <Button className="w-full" size="lg" type="submit">
            Sign Up
          </Button>
        </motion.div>
      </IQForm>
    </>
  );
};

export default SignupForm;
