'use client'

import { useEventsStore } from '@/store/eventsStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { X } from 'lucide-react'
import { Button } from './ui/button'
export function Timetable() {
  const { items, removeItemFromEvent } = useEventsStore()
  return <div className='flex flex-wrap gap-4 '>
    {items
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => (
      <Card key={item.id} className={item.type === 'Meeting' ? 'bg-blue-500' : 'bg-green-500'}>
      <CardHeader>
        <CardTitle>{item.date}</CardTitle>
        <CardDescription className="text-gray-900">{item.timeOn} - {item.timeOff}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{item.event}</p>
        <p>{item.type}</p>
      </CardContent>
      <CardFooter>
       <Button variant="ghost" size="icon" onClick={() => removeItemFromEvent(item.id)}><X color='red'/></Button>
      </CardFooter>
    </Card>
    ))}
  </div>
}
