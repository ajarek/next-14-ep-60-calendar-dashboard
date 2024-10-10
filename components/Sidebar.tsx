'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useActionStore } from '@/store/actionStore'
import CalendarEvents from '@/components/CalendarEvents'
import { ModeToggle } from './mode-toggle'

const Sidebar = () => {
  const { isOpen, setIsOpen } = useActionStore()
  return (
    <div className='w-[300px] flex flex-col items-start justify-start h-screen gap-4 p-2 border-r-2 border-gray-200'>
      <ModeToggle />
      <div className='flex  items-start justify-center  gap-4'>
        <h1 className='text-2xl font-bold'>Calendar Events</h1>
        <Button
          size={'icon'}
          className={isOpen ? 'hidden' : ''}
          onClick={() => setIsOpen(true)}
        >
          <Plus />
        </Button>
      </div>

      <CalendarEvents />
    </div>
  )
}

export default Sidebar
