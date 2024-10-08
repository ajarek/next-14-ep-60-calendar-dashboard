import React from 'react'
import { CalendarForm } from './Calendar'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useActionStore } from '@/store/actionStore'

const AddEvent = () => {
  const { setIsOpen } = useActionStore()
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
      <div className="relative bg-white p-4 rounded-md ">
        <Button className='absolute top-1 right-1' size={'icon'} variant={'ghost'} onClick={() => setIsOpen(false)}><X color='red'/></Button>
      <h1 className='text-center text-2xl font-bold'>Add Event</h1>
      <CalendarForm />

      </div>
    </div>
  )
}

export default AddEvent