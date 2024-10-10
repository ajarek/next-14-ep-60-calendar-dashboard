'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useActionStore } from '@/store/actionStore'

import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEventsStore } from '@/store/eventsStore'

const FormSchema = z.object({
  dateTime: z.object({
    date: z.date({
      required_error: 'Date is required.',
    }),
    timeOn: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Invalid time format. Use HH:MM.',
    }),
    timeOff: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Invalid time format. Use HH:MM.',
    }),
    event: z.string().min(3, {
      message: 'Minimum 3 characters.',
    }),
    type: z.string().min(3, {
      message: 'Minimum 3 characters.',
    }),
  }),
})



export function CalendarForm() {
  const { addItemToEvent } = useEventsStore()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { setIsOpen } = useActionStore()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Przesłano następujące wartości:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    const item = {
      id: Date.now(),
      date: data.dateTime.date.toLocaleDateString(),
      timeOn: data.dateTime.timeOn,
      timeOff: data.dateTime.timeOff,
      event: data.dateTime.event,
      type: data.dateTime.type,
    }
    addItemToEvent(item)  
    setIsOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 bg-background p-4 '
      >
        <FormField
          control={form.control}
          name='dateTime'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value?.date ? (
                        format(field.value.date, 'PPP')
                      ) : (
                        <span>select a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className='w-auto p-0'
                  align='start'
                >
                  <Calendar
                    mode='single'
                    selected={field.value?.date}
                    onSelect={(date) =>
                      field.onChange({ ...field.value, date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormControl>
                <div className='w-full flex items-center justify-between bg-background rounded-sm'>
                  <FormLabel className='pl-2'>time On</FormLabel>
                  <Input
                    type='time'
                    value={field.value?.timeOn || ''}
                    onChange={(e) =>
                      field.onChange({ ...field.value, timeOn: e.target.value })
                    }
                    className='w-[95px] '
                  />
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full flex items-center justify-between bg-background rounded-sm '>
                  <FormLabel className='pl-2'>time Off</FormLabel>
                  <Input
                    type='time'
                    value={field.value?.timeOff || ''}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        timeOff: e.target.value,
                      })
                    }
                    className='w-[95px]'
                  />
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full flex items-center justify-between gap-2 bg-background rounded-sm '>
                  <FormLabel className='pl-2'>Event</FormLabel>
                  <Input
                    type='text'
                    value={field.value?.event || ''}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        event: e.target.value,
                      })
                    }
                    className='w-full'
                  />
                </div>
              </FormControl>
              <FormControl>
                <div className='w-full flex items-center justify-between gap-2 '>
                  <FormLabel className='text-sm'>Type</FormLabel>
                  <Select onValueChange={(e) =>
                      field.onChange({
                        ...field.value,
                        type: e,
                      })} defaultValue={field.value?.type || ''}
                    
                      >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem className='bg-slate-500' value="Project">Project</SelectItem>
                  <SelectItem className='bg-blue-500' value="Meeting">Meeting</SelectItem>
                  <SelectItem className='bg-red-500' value="Education">Education</SelectItem>
                  <SelectItem className='bg-yellow-500' value="Trip">Trip</SelectItem>
                  <SelectItem className='bg-green-500' value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Send</Button>
      </form>
    </Form>
  )
}
