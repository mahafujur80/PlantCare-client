
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaEye, FaPlus, FaTasks } from "react-icons/fa";
import { getUserSession } from "@/lib/getSession";
import { getMyPlants } from "@/lib/managePlants";
import Image from "next/image";
import { DeletePlantBtn } from "@/Components/Manage/DeletePlant";

interface Plant {
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

export default async function ManagePlantsPage() {
  // Session check
  const user =  await getUserSession()
  
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Please login to manage plants catalogue.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all plants
 const plants: Plant[] = await getMyPlants(user?.id) as Plant[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <FaTasks className="text-emerald-600 dark:text-emerald-400 text-xl" />
                </span>
                Manage Plants
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 ml-12">
                Total {plants.length} plants in catalogue
              </p>
            </div>

            <Link href="/items/add">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3">
                <FaPlus />
                Add New Plant
              </Button>
            </Link>
          </div>
        </div>

        {/* Plants Table */}
        {plants.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 text-center shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="text-6xl mb-6">🌱</div>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-3">
              No Plants Yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Your plant catalogue is empty. Start adding beautiful plants to your collection!
            </p>
            <Link href="/items/add">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
                Add Your First Plant
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Table Header */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100  border-b-2 border-slate-200 ">
                    <th className="text-left p-4 pl-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Plant Details
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Care Level
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-center p-4 pr-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {plants.map((plant) => (
                    <tr 
                      key={plant._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 group"
                    >
                      {/* Plant Info */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-600 shadow-md group-hover:scale-105 transition-transform">
                            <Image
                              src={plant.imageUrl}
                              height={50}
                              width={50}
                              alt={plant.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <Link 
                              href={`/plants/${plant._id}`}
                              className="font-bold text-slate-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block"
                            >
                              {plant.title}
                            </Link>
                            <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">
                              {plant.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          {plant.category}
                        </span>
                      </td>

                      {/* Care Level */}
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          plant.careLevel === 'Easy' 
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'
                            : plant.careLevel === 'Medium'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
                        }`}>
                          {plant.careLevel}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm">
                          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {plant.location || 'N/A'}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          ${parseInt(plant.price).toLocaleString()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/plants/${plant._id}`}>
                            <Button
                              isIconOnly
                              size="sm"
                              className="bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 dark:bg-slate-700 dark:hover:bg-emerald-900/30 dark:text-slate-300 dark:hover:text-emerald-400 rounded-xl transition-all duration-200"
                              aria-label="View details"
                            >
                              <FaEye />
                            </Button>
                          </Link>
                          
                          <DeletePlantBtn id={plant._id} userId={user?.id} title={plant.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 px-6 py-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {plants.length} plants
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}