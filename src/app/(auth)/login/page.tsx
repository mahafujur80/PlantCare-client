"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaSignInAlt, FaLeaf } from "react-icons/fa";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(
      formData.entries(),
    ) as unknown as LoginFormData;

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
      });

      if (data) {
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(error?.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (): Promise<void> => {
    setLoading(true);

    const demoEmail = "mahafujurrahman4480@gmail.com";
    const demoPassword = "asdf1234ASDF";

    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      const { data, error } = await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
        rememberMe: true,
      });

      if (data) {
        toast.success("Logged in with Demo Account!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(error?.message || "Demo login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-xl rounded-3xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3 text-emerald-600 text-3xl">
            <FaLeaf />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to manage your garden trackers
          </p>
        </div>

        {/* FORM */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* EMAIL */}
          <TextField
            isRequired
            name="email"
            type="email"
            value={email}
            onChange={(value: string) => setEmail(value)}
            validate={(value: string) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              placeholder="john@example.com"
              variant="bordered"
              className="rounded-xl mt-1.5"
            />
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>
          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            value={password}
            onChange={(value: string) => setPassword(value)}
            validate={(value: string) => {
              if (!value) return "Password is required";
              if (value.length < 6) return "Min 6 characters";
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Password
            </Label>
            <InputGroup className="mt-1.5">
              <InputGroup.Input
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <BsEye className="text-slate-400" />
                  ) : (
                    <BsEyeSlash className="text-slate-400" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>
          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md mt-2 flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Login
          </Button>
         
          {/* demo login btn */}
          <Button
            type="button"
            variant="bordered"
            onPress={handleDemoLogin}
            isLoading={loading}
            className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 rounded-2xl"
          >
            🌿 Demo Login
          </Button>
        </Form>

        {/* REGISTRATION LINK */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-emerald-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
