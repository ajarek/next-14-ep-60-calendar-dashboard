'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { getDateWeek } from '@/lib/getDateWeek'
import type { Item } from '@/store/eventsStore'

export function Timetable() {
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
      const formattedEventDate = formatStoredDate(event.date)
      if (formattedEventDate in groupedEvents) {
        ;(groupedEvents[formattedEventDate] as Item[]).push(event)
      }
    })

    setWeekEvents(groupedEvents)
  }, [currentWeek, numberWeek])

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const formatStoredDate = (dateString: string): string => {
    return dateString
      .split('.')
      .map((part) => part.padStart(2, '0'))
      .join('.')
  }

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek - 1)
    setNumberWeek(numberWeek>1?numberWeek - 1:52)
  }

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek + 1)
    setNumberWeek(numberWeek<52?numberWeek + 1:1)
  }

  return (
    <div className='w-full'>
      <div className=' flex justify-between mb-4'>
        <Button onClick={goToPreviousWeek} aria-label='Previous week'>Previous week</Button>
        <h2 className='font-bold'>Week {numberWeek}</h2>
        <Button onClick={goToNextWeek} aria-label='Next week'>Next week</Button>
      </div>
      <div className='grid grid-cols-7 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-4'>
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
                  className={`flex flex-col p-2 mb-2 rounded ${
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
                  <div className='font-semibold'>{item.event}</div>
                  <div>
                    {item.timeOn} - {item.timeOff}
                  </div>
                  <div>{item.type}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
