import { FaStar, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Indoor Plant Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    comment: "The AI disease diagnostics saved my Fiddle Leaf Fig! I noticed brown spots on the bottom leaves and uploaded a photo. PlantCare diagnosed it as root rot and suggested a watering treatment that worked within weeks.",
    rating: 5,
  },
  {
    name: "Liam O'Connor",
    role: "Urban Balcony Gardener",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    comment: "I used to kill every succulent I owned. Following the smart moisture tracker schedules and setting up the kitchen area light mapping has made my balcony garden flourish. Highly recommended!",
    rating: 5,
  },
  {
    name: "Dr. Amanda Reyes",
    role: "Botany Lecturer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    comment: "I'm thoroughly impressed by the botanical guidelines integrated here. The care guides are scientifically accurate and easy for the layperson to digest. The interface is clean, beautiful, and extremely fluid.",
    rating: 4.9,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white border-b border-slate-50 dark:border-slate-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            Community Voices
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Loved by 14,000+ Plant Parents
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Hear from hobbyists and professional botanists who have transformed their spaces into lush, thriving green sanctuaries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 bg-slate-50 border border-slate-100  rounded-2xl relative shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-emerald-500/10 text-4xl">
                <FaQuoteLeft />
              </div>

              <div>
                {/* Rating */}
                <div className="flex gap-1 text-amber-500 text-xs font-bold mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(t.rating) ? "fill-amber-500" : "fill-slate-200"} />
                  ))}
                  <span className="ml-1 text-slate-600 dark:text-slate-400">{t.rating}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 border-t border-slate-200/50 dark:border-slate-800 pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-emerald-500"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
