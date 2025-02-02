/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  className?: string;
}

export default function IQForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
}: IProps) {
  const formConfig: formConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = zodResolver(resolver);
  }

  const methods = useForm(formConfig);

  // Reset the form safely inside useEffect after submission
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods.formState.isSubmitSuccessful, methods.reset]);

  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={submitHandler(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
