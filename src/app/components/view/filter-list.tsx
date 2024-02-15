"use client";
import {Filter} from "@/lib/features/filter";

export default function FilterList({filters}: { filters: Filter[] }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
    {filters.map((filter, i) => (
      <div key={`filter-${i}`} className="bg-gray-100 rounded-2xl p-5 border-2">
        <div className="flex flex-col w-full">
          <div className="font-semibold text-2xl mb-3">
            {filter?.name}
          </div>
          {filter.criteria.map((criterion, index) =>
            <div className="flex flex-col" key={`criterion-${index}`}>
              {criterion.type} {criterion.comparisonOperator} {criterion.value}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
};

