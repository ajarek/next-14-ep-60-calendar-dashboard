"use client"

import { Button } from "@/components/ui/button"
import AddEvent from "@/components/AddEvent"
import { useActionStore } from "@/store/actionStore"
import { Plus } from "lucide-react"

export default function Home() {
  const { isOpen, setIsOpen } = useActionStore()
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-4 p-12">
      <Button size={'icon'} className={isOpen ? "hidden" : ""} onClick={() => setIsOpen(true)}><Plus/></Button>
      {isOpen && <AddEvent />}
      <h1 className="text-4xl font-bold">Calendar Dashboard</h1>
    </div>
  );
}
