'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useActionStore } from '@/store/actionStore'
import CalendarEvents from '@/components/CalendarEvents'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const { isOpen, setIsOpen } = useActionStore()
  const router = useRouter()
  return (
    <div className='w-[300px] flex flex-col items-start justify-start h-screen gap-4 p-2 border-r-2 border-gray-200'>
      <ModeToggle />
      <div className='flex  items-start justify-center  gap-4'>
        <Link href={'/'} className='text-2xl font-bold'>Calendar Events</Link>
        <Button
          size={'icon'}
          className={isOpen ? 'hidden' : ''}
          onClick={() => {setIsOpen(true);router.push('/')}}
        >
          <Plus />
        </Button>
      </div>

      <CalendarEvents />
    </div>
  )
}

export default Sidebar
