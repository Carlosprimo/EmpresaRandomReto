import type { Option } from '@/types'
import Select from 'react-select'
import { StylesConfig } from 'react-select'

export interface ISingleSelectProps {
  name: string
  className?: string
  placeholder: string
  defaultValue?: Option
  options: Option[]
  onChange?: (value: Option) => void
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    padding: '0.16rem 0.5rem',
    backgroundColor: '#3B3B3B',
    border: '2px solid #D1D5DB',
    borderRadius: '0.375rem',
    fontSize: '1.125rem',
    outline: state.isFocused ? '2px solid #DC2626' : 'none',
    '&:hover': {
      borderColor: '#D1D5DB'
    }
  }),
  dropdownIndicator: (provided, _) => ({
    ...provided,
    color: '#B1B5BB',
    '&:hover': {
      color: '#FFF'
    }
  }),
  placeholder: (provided, _) => ({
    ...provided,
    color: '#FFF8',
  }),
  option: (provided, _) => ({
    ...provided,
    backgroundColor: '#3B3B3B',
    color: '#FFF',
    ':hover': {
      backgroundColor: '#222'
    }
  }),
  singleValue: (provided, _) => ({
    ...provided,
    backgroundColor: '#3B3B3B',
    color: '#FFF'
  }),
  menu: (provided, _) => ({
    ...provided,
    backgroundColor: '#3B3B3B',
  })
}

export const SingleSelect = ({
  name,
  options,
  defaultValue,
  className,
  placeholder,
  onChange
}: ISingleSelectProps) => {

  function handleChange(value: any) {
    onChange?.(value)
  }

  return (
    <Select
      isSearchable={false}
      name={name}
      placeholder={placeholder}
      options={options}
      className={className}
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  )
}
