"use client";

import { Button, Input, Label, ListBox, Select } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const ExplorePlantsHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const categories = ["All", "Indoor", "Outdoor", "Succulent", "Herbs"];
  const careLevels = ["All", "Easy", "Medium", "Hard"];
  const sortOptions = ["Newest", "Oldest"];

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [careLevel, setCareLevel] = useState(
    searchParams.get("careLevel") || "All"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "Newest"
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if(search.trim() === ""){
      params.delete("search")
    }


    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (careLevel !== "All") {
      params.set("careLevel", careLevel);
    } else {
      params.delete("careLevel");
    }

    params.set("sortBy", sortBy.toLowerCase());

    router.push(`/plants?${params.toString()}`);
  }, [category, careLevel, sortBy, search]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`/plants?${params.toString()}`);
  };

  return (
    <div className="my-8 rounded-2xl border border-default-200 bg-content1 p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Explore Our Plant Collection</h1>
        <p className="mt-2 text-default-500">
          Search by plant name, filter by category and care level, and sort by
          the newest or oldest plants.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="flex w-full lg:pt-6 ">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search plants..."
            startContent={<BiSearch className="text-default-400" />}
            className="rounded-r-none w-full"
          />

          <Button
            onClick={handleSearch}
            className="rounded-l-none bg-emerald-500"
          >
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Category */}
          <Select
            className="min-w-[180px]"
            placeholder="Category"
            onChange={(value) => setCategory(value)}
          >
            <Label>Category</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {categories.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Care Level */}
          <Select
            className="min-w-[180px]"
            placeholder="Care Level"
            onChange={(value) => setCareLevel(value)}
          >
            <Label>Care Level</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {careLevels.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Sort */}
          <Select
            className="min-w-[180px]"
            placeholder="Sort By"
            onChange={(value) => setSortBy(value)}
          >
            <Label>Sort By</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {sortOptions.map((item) => (
                  <ListBox.Item key={item} id={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ExplorePlantsHeader;