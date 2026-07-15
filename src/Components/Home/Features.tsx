import { FaTint, FaSun, FaHeartbeat, FaSearchPlus } from "react-icons/fa";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: <FaTint />,
    title: "Smart Water Schedules",
    description: "Never overwater or underwater again. Receive custom watering alarms tailored to each plant's specific moisture requirements.",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <FaSun />,
    title: "Sunlight Tracker",
    description: "Determine the perfect spot in your home. Our algorithm calculates exact light levels needed for photosynthesizing success.",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: <FaHeartbeat />,
    title: "Soil Health Analyzer",
    description: "Get real-time insights on nitrogen, phosphorus, potassium (NPK) ratios, pH balance, and organic content recommendations.",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <FaSearchPlus />,
    title: "AI Disease Identifier",
    description: "Got brown spots? Upload a photo of your plant leaves to instantly detect and get a curated recipe to cure plant diseases.",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 border  border-slate-50 0">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            Engineered for Plant Health
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            How PlantCare Elevates Your Botanical Journey
          </h3>
          <p className="mt-4 text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            We combine botany research with smart technology to offer tools that ensure your green companions thrive all year round.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-emerald-950 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl mb-4 ${feature.bgColor} ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h4 className="font-bold text-base text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
