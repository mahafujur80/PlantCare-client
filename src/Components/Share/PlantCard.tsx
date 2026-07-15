import Link from "next/link";
import { Button } from "@heroui/react";
import { FaStar, FaMapMarkerAlt, FaThermometerHalf } from "react-icons/fa";
import Image from "next/image";

export interface Plant {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  description?: string;
  price: number;
  category: string;
  rating: number;
  careLevel: string;
  location: string;
  imageUrl: string;
  createdAt?: string;
}

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const id = plant._id;

  return (
    <div className="group flex flex-col h-[420px] w-full rounded-2xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
      {/* Plant Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
        <Image
          src={plant.imageUrl}
          alt={plant.title}
          height={300}
          width={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {plant.category}
        </span>
        {/* Care Level Tag */}
        <span className="absolute top-3 right-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 dark:bg-slate-900 dark:text-slate-100">
          <FaThermometerHalf className="text-emerald-500" /> {plant.careLevel} Care
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-base text-slate-800 dark:text-white line-clamp-1 hover:text-emerald-600 transition-colors">
              {plant.title}
            </h3>
            {/* Rating */}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {plant.shortDescription}
          </p>
        </div>

        {/* Footer Meta Info & Button */}
        <div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 mb-4 dark:border-slate-700">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Price</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">${plant.price}</span>
            </div>

            {/* Location */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Best Spot</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <FaMapMarkerAlt className="text-emerald-500 text-[10px]" /> {plant.location}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link href={`/plants/${id}`} className="w-full block">
            <Button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/60 font-semibold text-xs py-2 rounded-xl border border-emerald-100 dark:border-emerald-900 transition-all duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
