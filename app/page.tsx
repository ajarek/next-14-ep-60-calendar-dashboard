'use client'

import AddEvent from '@/components/AddEvent'
import { Timetable } from '@/components/Timetable'
import { useActionStore } from '@/store/actionStore'

export default function Home() {
  const { isOpen } = useActionStore()

  return (
    <div className='flex flex-col items-start justify-start min-h-screen gap-4 p-4 '>
      
        {isOpen && <AddEvent />}
        <Timetable />
    </div>
  )
}
