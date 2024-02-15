"use client";
import Filters from "@/app/components/filters";
import {Provider} from "react-redux";
import {useRef} from "react";
import {AppStore, makeStore} from "@/lib/store";
import './globals.css'

export default function Home() {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
        <Filters></Filters>
      </main>
    </Provider>
  );
}
