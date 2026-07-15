"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill all contact fields");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent! Our botanists will reply within 24 hours.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mt-2 mb-4">
          Contact Our Help Center
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Have an issue with your plant diagnostic, want to report a catalog error, or need partnership information? Shoot us a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* Phone */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Helpline</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">+1 (800) 555-LEAF</p>
                <p className="text-xs text-slate-400 mt-1">Mon-Fri (9:00 AM - 6:00 PM EST)</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Email Support</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">support@plantcare-app.com</p>
                <p className="text-xs text-slate-400 mt-1">Response within 24 business hours</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Headquarters</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">122 Green Valley Road</p>
                <p className="text-xs text-slate-400 mt-1">Plant City, PC 5402</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8 space-y-5">
            <h3 className="font-extrabold text-xl text-slate-800 mb-4">Send a Direct Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <Input
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <Input
                placeholder="Diagnostic failure, billing, account support..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Message / Inquiry Details
              </label>
              <textarea
                placeholder="Write message details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[140px] text-slate-800"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <FaPaperPlane className="text-xs" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}