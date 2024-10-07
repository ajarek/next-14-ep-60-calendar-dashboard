import Image from "next/image";
import { CalendarForm } from "@/components/Calendar"
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Calendar Dashboard</h1>
      <CalendarForm />
    </div>
  );
}
