"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FaChevronDown, FaRegEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do I know what sunlight level my plant needs?",
    answer: "Every plant card lists preferred sunlight conditions (e.g. Indirect Light, Low Light, Full Sun). You can also use our About page guide or match indoor spots with locations like 'Bedroom' (low light) or 'Balcony' (bright sunlight).",
  },
  {
    question: "What is the AI Disease Diagnostic and how do I use it?",
    answer: "Available to our registered community members, the AI Diagnostic lets you upload photos of damaged or discolored plant leaves. Our neural net analyzes leaf health and matches symptoms to suggest accurate remedies.",
  },
  {
    question: "How often should I water my indoor plants?",
    answer: "Watering frequency depends heavily on the specific plant, container size, and season. A good rule of thumb is to check the soil moisture. Insert your finger 1-2 inches deep; if it feels dry, it's time to water.",
  },
  {
    question: "Can I sell or add my own plants to the system?",
    answer: "Yes! If you are logged into your account, you can visit the 'Add Plant' route to add items to the catalogue. You can also view and manage (delete or view) all items you have contributed via the 'Manage Plants' page.",
  },
];

export default function FaqNewsletter() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [email, setEmail] = useState<string>("");

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Subscribed successfully! Welcome to the green club.");
    setEmail("");
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Column */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Got Questions?
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mt-1 mb-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-slate-800 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`text-slate-400 text-xs transition-transform duration-300 ${
                          isOpen ? "transform rotate-180 text-emerald-500" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-48 border-t border-slate-100 dark:border-slate-800" : "max-h-0"
                      }`}
                    >
                      <p className="p-5 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between h-full min-h-[350px]">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl mb-6">
                <FaRegEnvelope />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Join the Green Newsletter
              </h3>
              <p className="mt-3 text-xs md:text-sm text-emerald-50/90 leading-relaxed">
                Subscribe to get weekly plant care digests, seasonal gardening alerts, and first-access discounts on premium exotic plant additions.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-emerald-100 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <Button
                type="submit"
                className="bg-white text-emerald-800 font-bold hover:bg-emerald-50 shadow-md text-sm px-6 py-2.5 rounded-xl transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
