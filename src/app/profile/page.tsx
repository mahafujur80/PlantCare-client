"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaUser, FaEnvelope, FaEdit, FaCheck, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as User;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to access profile.");
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setSaving(false);
    }, 800);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">My Profile</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your account details</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl px-4 py-2"
          >
            <FaSignOutAlt /> Logout
          </Button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-6 mt-8">
          {/* Avatar */}
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover border-4 border-emerald-500"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-emerald-500/10 text-emerald-600 border-4 border-emerald-500/20 flex items-center justify-center text-3xl font-bold">
              {user.name[0]?.toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <FaEnvelope className="text-emerald-500" /> {user.email}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdateProfile} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <Input
              disabled={!isEditing}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`rounded-xl ${isEditing ? "bg-white border-slate-200" : "bg-slate-50 border-transparent cursor-not-allowed"}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Profile Image URL
            </label>
            <Input
              disabled={!isEditing}
              placeholder="https://example.com/avatar.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`rounded-xl ${isEditing ? "bg-white border-slate-200" : "bg-slate-50 border-transparent cursor-not-allowed"}`}
            />
          </div>

          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 py-2.5"
              >
                <FaEdit /> Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  isDisabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-6 py-2.5 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaCheck />
                  )}
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setName(user.name);
                    setImage(user.image || "");
                    setIsEditing(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl px-6 py-2.5"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}