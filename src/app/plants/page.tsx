import ExplorePlantsHeader from "@/Components/Plants/SearchFilter";
import PlantCard, { Plant } from "@/Components/Share/PlantCard";
import { getPlants } from "@/lib/PlantAction";
import { Pagination } from '@heroui/react';
import Link from 'next/link';

type PlantsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    careLevel?: string;
    sortBy?: string;
    page?: string;
  }>;
};

export default async function PlantsPage({ searchParams }: PlantsPageProps) {
  const { search, category, careLevel, sortBy, page } = await searchParams;
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (careLevel) params.set("careLevel", careLevel);
  if (sortBy) params.set("sortBy", sortBy);
  params.set("page", page || "1");

  const plants = await getPlants(params);
  const currentPage = plants?.page;
  const totalPages = plants?.totalPage;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  };
  const createQueryString = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (careLevel) params.set("careLevel", careLevel);
    if (sortBy) params.set("sortBy", sortBy);

    params.set("page", String(pageNumber));

    return params.toString();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <ExplorePlantsHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start mb-8">
        {plants?.data?.map((plant: Plant) => (
          <PlantCard key={plant._id || plant.id} plant={plant} />
        ))}
      </div>

      <div className="pt-5">
        <Pagination size="md">
          <Pagination.Content className="w-full flex justify-center">
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage === 1}
                className="hover:!bg-emerald-500 group"
              >
                <Link
                  className="flex gap-2 group-hover:!text-white"
                  href={`/plants?${createQueryString(currentPage - 1)}`}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Link href={`/plants?${createQueryString(p)}`}>
                  <Pagination.Link
                    isActive={p === currentPage}
                    className={
                      p === currentPage
                        ? "!bg-emerald-500 !text-white"
                        : "!bg-white !text-emerald-500"
                    }
                  >
                    {p}
                  </Pagination.Link>
                </Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage === totalPages}
                className="hover:!bg-emerald-500 group"
              >
                <Link
                  className="flex gap-2  group-hover:!text-white"
                  href={`/plants?${createQueryString(currentPage + 1)}`}
                >
                  Next
                  <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
}
