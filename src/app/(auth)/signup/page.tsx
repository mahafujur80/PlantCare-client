"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
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
import { FaUserPlus, FaLeaf } from "react-icons/fa";

interface RegisterFormData {
  name: string;
  image: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as unknown as RegisterFormData;

    // Password Match Check
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      });

      if (data) {
        toast.success("Welcome to Plant Care!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(error?.message || "Sign up failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-50">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3 text-emerald-600 text-3xl">
            <FaLeaf />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-400 mt-1">Join 14,000+ plant caretakers today</p>
        </div>

        {/* FORM */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* NAME */}
          <TextField
            isRequired
            name="name"
            validate={(value: string) =>
              value.length < 3 ? "Name must be at least 3 characters" : null
            }
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</Label>
            <Input placeholder="John Doe" className="rounded-xl mt-1.5" />
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* IMAGE */}
          <TextField name="image">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Image URL (Optional)</Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="rounded-xl mt-1.5"
            />
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* EMAIL */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value: string) =>
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? "Invalid email address"
                : null
            }
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
            <Input placeholder="john@example.com" className="rounded-xl mt-1.5" />
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            validate={(value: string) => {
              if (value.length < 6) return "Min 6 characters";
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</Label>
            <InputGroup className="mt-1.5">
              <InputGroup.Input
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <BsEye className="text-slate-400" /> : <BsEyeSlash className="text-slate-400" />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description className="text-[10px] text-slate-400 mt-1">Minimum 6 characters</Description>
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* CONFIRM PASSWORD */}
          <TextField
            isRequired
            name="confirmPassword"
            validate={(value: string) => {
              if (value.length < 6) return "Min 6 characters";
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm Password</Label>
            <InputGroup className="mt-1.5">
              <InputGroup.Input
                name="confirmPassword"
                type={isVisible ? "text" : "password"}
                placeholder="Re-enter password"
              />
              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <BsEye className="text-slate-400" /> : <BsEyeSlash className="text-slate-400" />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaUserPlus />
            )}
            Create Account
          </Button>
        </Form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-emerald-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;