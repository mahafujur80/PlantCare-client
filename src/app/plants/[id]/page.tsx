// app/plants/[id]/page.tsx
import { getPlantById } from "@/lib/PlantAction";
import Link from "next/link";
import Image from "next/image";
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaTint, 
  FaSun, 
  FaThermometerHalf, 
  FaChevronLeft,
  FaCalendarAlt,
  FaSeedling,
  FaInfoCircle,
  FaCheckCircle,
  FaLeaf,
  FaTag
} from "react-icons/fa";

interface PlantDetails {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
  careLevel: string;
  imageUrl: string;
  location: string;
  sunlight: string;
  watering: string;
  userId: string;
  createdAt: string;
}

export default async function PlantDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const plant = await getPlantById(id) as PlantDetails;

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🌿</div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Plant Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            This plant seems to have wandered away from our garden.
          </p>
          <Link 
            href="/plants" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaChevronLeft />
            Back to Garden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-8">
          <Link 
            href="/plants" 
            className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
          >
            <span className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md group-hover:shadow-lg group-hover:-translate-x-1 transition-all duration-300">
              <FaChevronLeft className="text-sm" />
            </span>
            <span className="font-medium">Back to Collection</span>
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section - Enhanced */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src={plant.imageUrl}
                  alt={plant.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <FaLeaf className="text-emerald-500" />
                  {plant.category}
                </span>
                <span className="bg-amber-400/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <FaStar />
                  4.5
                </span>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-md border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Listed</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">
                    {new Date(plant.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-md border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <FaTag className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Seller ID</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white font-mono">
                    {plant.userId.slice(-6)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section - Enhanced */}
          <div className="space-y-8">
            {/* Title & Price */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-black text-slate-800 dark:text-white leading-tight">
                  {plant.title}
                </h1>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <FaMapMarkerAlt className="text-emerald-500" />
                  <span className="text-sm font-medium">{plant.location}</span>
                </div>
              </div>
              
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Price</p>
                  <p className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    ${parseInt(plant.price).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <FaStar key={star} className="text-amber-400 text-lg drop-shadow-sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Care Cards - Redesigned */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
                    <FaTint className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Watering</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
                  {plant.watering}
                </p>
              </div>

              <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl shadow-lg">
                    <FaSun className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Sunlight</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
                  {plant.sunlight}
                </p>
              </div>

              <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-xl shadow-lg">
                    <FaThermometerHalf className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Care Level</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {plant.careLevel}
                </p>
              </div>

              <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl shadow-lg">
                    <FaSeedling className="text-white text-xl" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Type</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {plant.category}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <FaInfoCircle className="text-emerald-500 text-lg" />
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                  Description
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {plant.description || plant.shortDescription}
              </p>
            </div>

            {/* Detailed Specifications - Accordion Style */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-emerald-500 to-green-600">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FaCheckCircle />
                  Detailed Specifications
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { label: 'Plant ID', value: plant._id, icon: FaTag },
                  { label: 'Category', value: plant.category, icon: FaLeaf },
                  { label: 'Care Level', value: plant.careLevel, icon: FaThermometerHalf },
                  { label: 'Sunlight', value: plant.sunlight, icon: FaSun },
                  { label: 'Watering', value: plant.watering, icon: FaTint },
                  { label: 'Location', value: plant.location, icon: FaMapMarkerAlt },
                  { label: 'Listed Date', value: new Date(plant.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  }), icon: FaCalendarAlt },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="text-emerald-500 text-sm" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-white capitalize">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                <FaSeedling />
                Add to My Garden
              </button>
              <button className="p-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}