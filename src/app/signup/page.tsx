"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast } from 'react-hot-toast';
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function SignupFormDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    await signup();
  };

  const signup = async () => {
    try {
      let { data: signupData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signupData) {
        console.log("User signed up successfully", signupData);
        toast.success("User signed up successfully");
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Error signing up");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl mt-20 p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Sign Up Form
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Mihir"
              name="firstname"
              type="text"
              value={data.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Thakur"
              name="lastname"
              type="text"
              value={data.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Contact Number</Label>
          <Input
            id="number"
            placeholder="+91 123456789"
            name="number"
            type="text"
            value={data.number}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="bot@gmail.com"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={handleChange}
            name="password"
          />
          <button
            type="button"
            className="absolute right-2 top-6 text-gray-600 dark:text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8 relative">
          <Label htmlFor="confirmpassword">Confirm your password</Label>
          <Input
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            value={data.confirmpassword}
            onChange={handleChange}
            name="confirmpassword"
          />
        </LabelInputContainer>

        <button
          className="bg-black relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex justify-between">
          <Link href="/signin">
            Sign in
          </Link>
          <Link href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}:any) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
