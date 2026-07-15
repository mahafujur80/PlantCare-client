"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button, InputGroup } from "@heroui/react";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import PlantCard, { Plant } from "../Share/PlantCard";
import PlantCardSkeleton from "../Share/PlantCardSkeleton";

export default function ExploreListing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read search params
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialCareLevel = searchParams.get("careLevel") || "All";
  const initialMinPrice = searchParams.get("minPrice") || "0";
  const initialMaxPrice = searchParams.get("maxPrice") || "100";
  const initialSortBy = searchParams.get("sortBy") || "createdAt";

  // Local state
  const [plants, setPlants] = useState<Plant[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter input states
  const [search, setSearch] = useState<string>(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);
  const [careLevel, setCareLevel] = useState<string>(initialCareLevel);
  const [maxPrice, setMaxPrice] = useState<number>(parseFloat(initialMaxPrice));
  const [sortBy, setSortBy] = useState<string>(initialSortBy);

  // Sync state with URL params
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setCareLevel(searchParams.get("careLevel") || "All");
    setMaxPrice(parseFloat(searchParams.get("maxPrice") || "100"));
    setSortBy(searchParams.get("sortBy") || "createdAt");
  }, [searchParams]);

  // Update URL function
  const updateUrl = useCallback(
    (newParams: Record<string, string | number>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "" || value === "All") {
          current.delete(key);
        } else {
          current.set(key, value.toString());
        }
      });

      router.push(`${pathname}?${current.toString()}`);
    },
    [searchParams, pathname, router]
  );

  // Fetch plants (without pagination - fetching all plants)
  useEffect(() => {
    async function fetchPlants() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.set("search", search);
        if (category && category !== "All") query.set("category", category);
        if (careLevel && careLevel !== "All") query.set("careLevel", careLevel);
        query.set("maxPrice", maxPrice.toString());
        query.set("sortBy", sortBy);
        // Remove limit to fetch all plants
        query.set("limit", "1000"); // Or set a very high limit

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPlants(data.plants || []);
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.error("Error fetching plants:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlants();
  }, [search, category, careLevel, maxPrice, sortBy]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Explore Our Botanical Catalog
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">
          Find your next green leaf, search by keywords, filter by category or care score, and sort to match your preference.
        </p>
      </div>

      {/* SEARCH, FILTER & SORT CONTROL BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
        {/* Filters panel (left column on desktop) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-700">
            <FaFilter className="text-emerald-500 text-xs" /> Filters
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Keyword
            </label>
            <InputGroup className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center px-3 gap-2">
              <InputGroup.Prefix>
                <FaSearch className="text-slate-400 text-xs animate-none shrink-0" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="text"
                placeholder="Search monstera, lily..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm py-2"
              />
            </InputGroup>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Habitat / Category
            </label>
            <select
              value={category}
              onChange={(e) => updateUrl({ category: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Herbs">Herbs</option>
            </select>
          </div>

          {/* Care Level Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Care Level
            </label>
            <select
              value={careLevel}
              onChange={(e) => updateUrl({ careLevel: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Care Levels</option>
              <option value="Easy">Easy Care</option>
              <option value="Medium">Medium Care</option>
              <option value="Hard">Hard Care</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              onMouseUp={() => updateUrl({ maxPrice })}
              onTouchEnd={() => updateUrl({ maxPrice })}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Reset Filters */}
          <Button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setCareLevel("All");
              setMaxPrice(100);
              setSortBy("createdAt");
              router.push(pathname);
            }}
            className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold text-xs py-2 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            Clear All Filters
          </Button>
        </div>

        {/* Results area */}
        <div className="lg:col-span-9">
          {/* Sorting and Count bar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm mb-6 gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Showing {loading ? "..." : plants.length} of {total} plants
            </span>

            <div className="flex items-center gap-2">
              <FaSortAmountDown className="text-slate-400 text-xs" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => updateUrl({ sortBy: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="createdAt">Latest Added</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingDesc">Top Rated</option>
                <option value="nameAsc">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Plant Grid - 4 cards per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <PlantCardSkeleton key={idx} />
              ))
            ) : plants.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-12 text-center shadow-sm">
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">No Plants Found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  We couldn't find any plant matching your selected filters. Try broadening your keywords or resetting filters.
                </p>
                <Button
                  onClick={() => router.push(pathname)}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs px-4 py-2"
                >
                  Show All Plants
                </Button>
              </div>
            ) : (
              plants.map((plant) => (
                <PlantCard key={plant._id || plant.id} plant={plant} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}