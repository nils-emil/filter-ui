"use client";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {fetchFilters} from "@/lib/features/filter";
import FilterList from "@/app/components/view/filter-list";
import FilterCreator from "@/app/components/create/filter-creator";

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filter.filters);

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return <div className="backdrop-filter">
    <FilterCreator></FilterCreator>
    <FilterList filters={filters}></FilterList>
  </div>
}
