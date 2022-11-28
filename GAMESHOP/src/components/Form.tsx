import type { InputFields, Option } from '@/types'
import { useRef } from 'react'
import { Button } from './Button'
import { MultipleInput } from './MultiSelect'
import { SingleSelect } from './SingleSelect'
import { normalizeKey, getFormattedDate } from '@/utils'

export interface IFormProps {
  className?: string
  fields: InputFields[]
  values?: Record<string, any>
  buttonLabel: string
  onSubmit: (data: any) => void
}

export const Form = ({ fields, values, buttonLabel, onSubmit }: IFormProps) => {
  const multiValue = useRef<string[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let data: any = {}
    const selectkey =
      fields.find((field) => field.type === 'multi-select')?.name || ''
    const numberkey =
      fields.find((field) => field.type === 'number')?.name || ''
    formData.forEach((value, key) => {
      if (key === selectkey) data[key] = multiValue.current.join(',')
      else if (key === numberkey) data[key] = Number(value)
      else data[key] = value
    })
    onSubmit(data)
  }

  function onMultiSelect(value: Option[]) {
    const normalized = value.map((item: Option) => item.value)
    multiValue.current = normalized
  }

  function setDefaultValue(index: number) {
    const field = fields[index]
    const key = field.name
    if (values && values[key]) {
      if (field.type === 'date') return values[key]
      else if (field.type === 'multi-select') {
        return values[key].split(',').map((item: string) => {
          return { label: item, value: item }
        })
      } else if (field.type === 'select') {
        const value = values[key]
        const option = field.options?.find((option) => option.value === value)
        return option
      } else return values[key]
    }
    return field.type === 'date' ? getFormattedDate(Date.now()) : ''
  }

  return (
    <form
      className="flex flex-col items-center gap-8 mt-8"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4 w-full">
        {fields.map((field, index) => (
          <div
            className={`flex flex-col gap-2 ${
              field.type === 'hidden' ? 'hidden' : ''
            }`}
            key={`form-field-${field.name}`}
          >
            <label htmlFor={field.name} className="text-lg font-medium">
              {normalizeKey(field.name)}
            </label>
            {field.type === 'multi-select' ? (
              <MultipleInput
                name={field.name}
                onValue={onMultiSelect}
                placeholder={field.placeholder}
                defaultValue={setDefaultValue(index)}
              />
            ) : field.type === 'select' ? (
              <SingleSelect
                name={field.name}
                placeholder={field.placeholder}
                options={field.options as Option[]}
                defaultValue={setDefaultValue(index)}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                className="border-2 border-gray-300 rounded-md px-4 py-2 text-lg placeholder:text-white/50 focus:outline focus:outline-2 outline-red-600"
                placeholder={field.placeholder}
                defaultValue={setDefaultValue(index)}
                required
              />
            )}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="justify-center w-1/3 text-white bg-red-600 border-red-600 hover:bg-red-700 dark:hover:bg-red-600/70"
      >
        {buttonLabel}
      </Button>
    </form>
  )
}
