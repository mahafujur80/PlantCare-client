import Link from "next/link";
import { FaHome, FaTree, FaTint, FaUtensils } from "react-icons/fa";

interface Category {
  name: string;
  count: string;
  icon: React.ReactNode;
  image: string;
  color: string;
}

const categories: Category[] = [
  {
    name: "Indoor",
    count: "120+ Plants",
    icon: <FaHome />,
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop&q=80",
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    name: "Outdoor",
    count: "85+ Plants",
    icon: <FaTree />,
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400&auto=format&fit=crop&q=80",
    color: "from-green-500/10 to-emerald-500/5",
  },
  {
    name: "Succulent",
    count: "60+ Plants",
    icon: <FaTint />,
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400&auto=format&fit=crop&q=80",
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    name: "Herbs",
    count: "40+ Plants",
    icon: <FaUtensils />,
    image: "https://images.unsplash.com/photo-1515589654462-a9881e276b8a?w=400&auto=format&fit=crop&q=80",
    color: "from-amber-500/10 to-yellow-500/5",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100 ">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              Curated Collections
            </h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Explore Plants by Habitat
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Select an environment to find plants that perfectly match the moisture, air flow, and light profile of your space.
            </p>
          </div>
          <Link href="/plants" className="mt-4 md:mt-0 text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline">
            View All Plants →
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/plants?category=${cat.name}`}
              className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800/80 block"
            >
              {/* Cover Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/55 transition-colors" />

              {/* Text */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-10">
                <div className="h-9 w-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{cat.name}</h4>
                  <span className="text-xs text-slate-200">{cat.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
