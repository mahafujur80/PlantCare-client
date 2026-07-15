import { FaLeaf, FaSeedling, FaRibbon, FaUsers } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    name: "Dr. Clara Sterling",
    role: "Chief Botanist & Co-Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Clara has a PhD in Plant Pathology and 12 years of research experience in tropical flora health.",
  },
  {
    name: "Marcus Vance",
    role: "Gardening Educator & Writer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Marcus has hosted botanical workshops and created smart watering courses for over 50,000 students worldwide.",
  },
  {
    name: "Emily Chen",
    role: "Horticulture Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Emily designs microclimate layouts and specializes in healing rare varieties of succulents and air plants.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Intro Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Our Story
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight mt-2 mb-4">
          Nurturing Nature Indoors
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          At PlantCare, we believe everyone has a green thumb waiting to be unlocked. We combine software engineering with botanical science to help plant parents keep their green spaces thriving.
        </p>
      </div>

      {/* Grid: Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700 p-8 rounded-3xl shadow-sm text-center">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mx-auto mb-5">
            <FaSeedling />
          </div>
          <h3 className="font-bold text-lg text-slate-850 dark:text-white mb-2">Scientific Care</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All our metrics, diagnostic engines, and watering guides are checked by real botanists to ensure safety.
          </p>
        </div>

        <div className="bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700 p-8 rounded-3xl shadow-sm text-center">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mx-auto mb-5">
            <FaUsers />
          </div>
          <h3 className="font-bold text-lg text-slate-850 dark:text-white mb-2">Communal Spirit</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We foster a catalog of plants where community members share their specimens and diagnostic feedback.
          </p>
        </div>

        <div className="bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700 p-8 rounded-3xl shadow-sm text-center">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mx-auto mb-5">
            <FaRibbon />
          </div>
          <h3 className="font-bold text-lg text-slate-850 dark:text-white mb-2">Premium Quality</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We pride ourselves on visually rich layouts, high-fidelity metadata, and user-centered interactivity.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-12">Our Journey Timeline</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {/* Year 2024 */}
          <div className="flex flex-col md:flex-row items-start relative gap-8">
            <div className="md:w-1/2 text-left md:text-right md:pr-12 md:order-1 order-2">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mb-1">2024</span>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">Founding & Core Vision</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                PlantCare was conceptualized by a group of app developers and local greenhouse horticulturists in Dhaka, establishing our web catalog.
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center z-10 absolute left-0 md:left-1/2 md:-ml-4.5 order-1">
              <FaLeaf className="text-white text-[10px]" />
            </div>
            <div className="md:w-1/2 md:order-2 hidden md:block" />
          </div>

          {/* Year 2025 */}
          <div className="flex flex-col md:flex-row items-start relative gap-8">
            <div className="md:w-1/2 md:order-1 hidden md:block" />
            <div className="h-9 w-9 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center z-10 absolute left-0 md:left-1/2 md:-ml-4.5 order-1">
              <FaLeaf className="text-white text-[10px]" />
            </div>
            <div className="md:w-1/2 text-left md:pl-12 order-2">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mb-1">2025</span>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">AI Diagnostics Launch</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                We trained a customized neural net on over 100,000 leaf disease datasets, empowering users to immediately solve leaf issues.
              </p>
            </div>
          </div>

          {/* Year 2026 */}
          <div className="flex flex-col md:flex-row items-start relative gap-8">
            <div className="md:w-1/2 text-left md:text-right md:pr-12 md:order-1 order-2">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mb-1">2026</span>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">14,000+ Caretakers</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Today, our botanical index covers hundreds of plant habitats and tracks daily watering routines, and maintains 98% plant survival rates.
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center z-10 absolute left-0 md:left-1/2 md:-ml-4.5 order-1">
              <FaLeaf className="text-white text-[10px]" />
            </div>
            <div className="md:w-1/2 md:order-2 hidden md:block" />
          </div>
        </div>
      </div>

      {/* Expert Panel */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Our Horticulture Experts</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Meet the academic minds and botanical lovers behind our care schedules and algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-emerald-500/20 mx-auto mb-4"
              />
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base">{m.name}</h4>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5 mb-3">
                {m.role}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "{m.bio}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
