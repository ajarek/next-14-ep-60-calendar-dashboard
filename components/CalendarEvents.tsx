'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useActionStore } from '@/store/actionStore'
import { toast } from '@/hooks/use-toast'
import { Calendar } from '@/components/ui/calendar'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const FormSchema = z.object({
  dateTime: z.object({
    date: z.date({
      required_error: 'Data jest wymagana.',
    }),
  }),
})

const CalendarEvents = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateTime: {
        date: new Date(),
      },
    },
  })

  const { setIsOpen } = useActionStore()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/calendar-day/${data.dateTime.date.toLocaleDateString()}`);
    setIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue('dateTime.date', date)
      onSubmit(form.getValues())
    }
  }

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='dateTime'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <div className='border rounded-md p-4'>
                  <Calendar
                    mode='single'
                    selected={field.value?.date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default CalendarEvents

