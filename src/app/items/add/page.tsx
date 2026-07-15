"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Form, TextField, Label, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaPlusCircle, FaLeaf, FaImage, FaMapMarkerAlt, FaCloudSun, FaTint } from "react-icons/fa";
import toast from "react-hot-toast";
import { addNewPlant } from "@/lib/PlantAction";

export interface AddPlantFormData {
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  category: string;
  careLevel: string;
  location: string;
  imageUrl: string;
  sunlight: string;
  watering: string;
  userId: string  | undefined;
}

export default function AddPlantPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to access this page.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as AddPlantFormData;
    data.userId = session?.user?.id;

    if (!data.title || !data.shortDescription || !data.description || !data.price || !data.category || !data.careLevel) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await addNewPlant(data)

      if (res.success) {
        toast.success("Plant added successfully!");
        router.push("/plants");
        router.refresh();
      } else if (!res.success) {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Checking credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl">
            <FaPlusCircle />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
              Add New Plant Companion
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Share a plant specimen to our communal botanical catalogue.</p>
          </div>
        </div>

        {/* FORM */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField isRequired name="title">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaLeaf className="text-emerald-500 text-[10px]" /> Plant Name
              </Label>
              <Input placeholder="e.g. Swiss Cheese Plant" className="rounded-xl" />
              <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
            </TextField>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaLeaf className="text-emerald-500 text-[10px]" /> Habitat Category
              </label>
              <select
                required
                name="category"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Herbs">Herbs</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <TextField isRequired name="shortDescription" validate={(v) => v.length < 10 ? "At least 10 chars required" : null}>
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Catchy Summary / Tagline
            </Label>
            <Input placeholder="e.g. Air-purifying tropical plant with gorgeous perforated foliage." className="rounded-xl" />
            <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
          </TextField>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Detailed Care & Overview
            </label>
            <textarea
              required
              name="description"
              placeholder="Provide a comprehensive breakdown of the plant's history, care habits, leaf structure, temperature thresholds, and soil composition..."
              className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[120px] text-slate-700"
            />
          </div>

          {/* Price & Care Level & Image URL Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField isRequired name="price" type="number" validate={(v) => isNaN(parseFloat(v)) || parseFloat(v) <= 0 ? "Enter price > 0" : null}>
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Base Store Price ($)
              </Label>
              <Input placeholder="45" className="rounded-xl" />
              <FieldError className="text-[10px] text-red-500 font-semibold mt-1" />
            </TextField>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Care Difficulty
              </label>
              <select
                required
                name="careLevel"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Easy">Easy Care</option>
                <option value="Medium">Medium Care</option>
                <option value="Hard">Hard Care</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaImage className="text-emerald-500 text-[10px]" /> Image Link
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Plant Tags / Location / Sunlight / Watering */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-emerald-500 text-[10px]" /> Ideal Placement
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Living Room, Bedroom"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaCloudSun className="text-emerald-500 text-[10px]" /> Sunlight Level
              </label>
              <input
                type="text"
                name="sunlight"
                placeholder="e.g. Medium Indirect Light"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaTint className="text-emerald-500 text-[10px]" /> Water Routine
              </label>
              <input
                type="text"
                name="watering"
                placeholder="e.g. Once a week"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 border-t border-slate-100 pt-6">
            <Button
              type="submit"
              isDisabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl flex-grow shadow-md flex items-center justify-center gap-2"
            >
              {loading && <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Submit New Plant
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl px-6"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}