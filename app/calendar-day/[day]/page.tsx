'use client'

import React from 'react'
import { Item, useEventsStore } from '@/store/eventsStore'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const CalendarDayPage = ({ params }: { params: { day: string } }) => {
  const { items, removeItemFromEvent } = useEventsStore()
  const lengthEvents = items.filter((item) => item.date === params.day).length
  if (lengthEvents === 0)
    return (
      <div className='w-full text-center text-2xl py-12 text-red-500'>
        <h1 className='text-2xl font-bold'>Date: {params.day}</h1>
        <p> No events for this day</p>
      </div>
    )
  return (
    <div className='flex flex-col  items-start justify-top h-screen p-16 gap-16'>
      <h1 className='text-2xl font-bold'>Date: {params.day}</h1>
      <div className='flex flex-wrap gap-4'>
        {items
          .filter((item) => item.date === params.day)
          .sort((a: Item, b: Item) => a.timeOn.localeCompare(b.timeOn))
          .map((item) => (
            <div
              key={item.id}
              className={`p-2 mb-2 rounded text-xl ${
                item.type === 'Meeting'
                  ? 'bg-blue-500'
                  : item.type === 'Trip'
                  ? 'bg-yellow-500 text-black'
                  : item.type === 'Other'
                  ? 'bg-green-500'
                  : item.type === 'Education'
                  ? 'bg-red-500'
                  : 'bg-gray-500 '
              }`}
            >
              <p>
                <span className='text-gray-300 text-sm'>date:</span> {item.date}
              </p>
              <p>
                <span className='text-gray-300 text-sm'>event:</span>{' '}
                {item.event}
              </p>
              <p>
                <span className='text-gray-300 text-sm'>timeOn:</span>{' '}
                {item.timeOn}
              </p>
              <p>
                <span className='text-gray-300 text-sm'>timeOff:</span>{' '}
                {item.timeOff}
              </p>
              <p>
                <span className='text-gray-300 text-sm'>type:</span> {item.type}
              </p>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => removeItemFromEvent(item.id)}
                aria-label='Delete event'
              >
                <X color='red' />
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CalendarDayPage
