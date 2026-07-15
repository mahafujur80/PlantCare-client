const loading = () => {
  const array = Array.from({ length: 8 });
  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {array.map((_, idx) => {
        return (
          <div key={idx} className="flex flex-col h-[420px] w-full rounded-2xl bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700 overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 w-full bg-slate-200 dark:bg-slate-700" />

            {/* Content Skeleton */}
            <div className="flex flex-col flex-grow p-5 justify-between">
              <div>
                {/* Header Skeleton */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="h-5 w-2/3 bg-slate-200 rounded-md dark:bg-slate-700" />
                  <div className="h-4 w-10 bg-slate-200 rounded-md dark:bg-slate-700" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full bg-slate-200 rounded-md dark:bg-slate-700" />
                  <div className="h-3 w-4/5 bg-slate-200 rounded-md dark:bg-slate-700" />
                </div>
              </div>

              {/* Footer Skeleton */}
              <div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4 dark:border-slate-700">
                  <div className="space-y-1">
                    <div className="h-2.5 w-8 bg-slate-200 rounded-md dark:bg-slate-700" />
                    <div className="h-4.5 w-12 bg-slate-200 rounded-md dark:bg-slate-700" />
                  </div>

                  <div className="space-y-1 flex flex-col items-end">
                    <div className="h-2.5 w-10 bg-slate-200 rounded-md dark:bg-slate-700" />
                    <div className="h-3.5 w-16 bg-slate-200 rounded-md dark:bg-slate-700" />
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-8.5 w-full bg-slate-200 rounded-xl dark:bg-slate-700" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default loading;
