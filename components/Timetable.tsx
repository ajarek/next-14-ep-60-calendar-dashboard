'use client'

import { useEventsStore } from '@/store/eventsStore'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { getDateWeek } from '@/lib/getDateWeek'
import type { Item } from '@/store/eventsStore'

export function Timetable() {
  const { removeItemFromEvent } = useEventsStore()
  const [weekEvents, setWeekEvents] = useState<{ [key: string]: Item[] }>({})
  const [currentWeek, setCurrentWeek] = useState(0) 
  const [numberWeek, setNumberWeek] = useState(getDateWeek(new Date()))

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem('EventStore') || '{}').state?.items || []
    const today = new Date()
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7)
    )

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      return formatDate(date)
    })

    const groupedEvents = weekDates.reduce(
      (acc, date) => ({ ...acc, [date]: [] as Item[] }),
      {} as { [key: string]: Item[] }
    )

    storedEvents.forEach((event: Item) => {
      const formattedEventDate = formatStoredDate(event.date);
      if (formattedEventDate in groupedEvents) {
        (groupedEvents[formattedEventDate] as Item[]).push(event);
      }
    });

    setWeekEvents(groupedEvents);
  }, [currentWeek]) 

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const formatStoredDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('.')
    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
  }

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek - 1)
    setNumberWeek(numberWeek - 1)
  }

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek + 1)
    setNumberWeek(numberWeek + 1)
  }

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Button onClick={goToPreviousWeek}>Previous week</Button>
        <h2 className='font-bold'>Week {numberWeek}</h2>
        <Button onClick={goToNextWeek}>Next week</Button>
      </div>
      <div className='grid grid-cols-7 gap-4'>
        {Object.entries(weekEvents).map(([date, dayEvents]) => (
          <div
            key={date}
            className='border p-1'
          >
            <h2 className='font-bold mb-2'>{date}</h2>
            {dayEvents
              .sort((a: Item, b: Item) => a.timeOn.localeCompare(b.timeOn))
              .map((item: Item) => (
                <div
                  key={item.id}
                  className={`p-2 mb-2 rounded ${
                    item.type === 'Meeting'
                      ? 'bg-blue-500'
                      : item.type === 'Trip'
                      ? 'bg-yellow-500'
                      : item.type === 'Other'
                      ? 'bg-green-500'
                      : item.type === 'Education'
                      ? 'bg-red-500'
                      : 'bg-gray-500'
                  }`}
                >
                  <p className='font-semibold'>{item.event}</p>
                  <p>
                    {item.timeOn} - {item.timeOff}
                  </p>
                  <p>{item.type}</p>
                 
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
