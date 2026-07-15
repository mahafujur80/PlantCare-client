"use client";

import { FaUsers, FaSeedling, FaStethoscope } from "react-icons/fa";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  desc: string;
}

const stats: StatItem[] = [
  {
    icon: <FaUsers />,
    value: "14,800+",
    label: "Active Caretakers",
    desc: "Plant parents tracking daily garden health on our platform.",
  },
  {
    icon: <FaSeedling />,
    value: "95,000+",
    label: "Plants Preserved",
    desc: "Thriving house and outdoor plants saved from common diseases.",
  },
  {
    icon: <FaStethoscope />,
    value: "420k+",
    label: "AI Diagnostics Done",
    desc: "Successful leaf scanning and sickness identifications.",
  },
];

export default function Statistics() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            Statistics & Metrics
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Thriving Plants in Numbers
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Real-time numbers showing how our botanical community tracks care parameters and maximizes natural growth.
          </p>
        </div>

        {/* Numbers Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-5 p-6 bg-white border border-slate-100 rounded-2xl dark:bg-slate-800 dark:border-slate-700 shadow-sm"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                  {stat.value}
                </h4>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}