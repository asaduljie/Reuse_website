"use client";

interface LoadingSkeletonProps {
  rows?: number;
  cols?: number;
  type?: "table" | "card" | "list";
}

export default function LoadingSkeleton({ rows = 5, cols = 4, type = "table" }: LoadingSkeletonProps) {
  if (type === "card") {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 animate-pulse">
            <div className="h-10 w-10 bg-gray-100 rounded-2xl" />
            <div className="h-4 bg-gray-100 rounded-full w-2/3" />
            <div className="h-7 bg-gray-100 rounded-full w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50 animate-pulse">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 p-5 items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
              <div className="h-3 bg-gray-100 rounded-full w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table type (default)
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-12 bg-gray-50 border-b border-gray-100" />
      <div className="divide-y divide-gray-50">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 px-6 py-4 items-center">
            {[...Array(cols)].map((_, j) => (
              <div
                key={j}
                className={`h-4 bg-gray-100 rounded-full ${
                  j === 0 ? "w-8" : j === cols - 1 ? "w-16 ml-auto" : "flex-1"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
