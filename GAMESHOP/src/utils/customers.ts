export const FIELDS = [
  {
    name: 'idUser',
    type: 'hidden',
    placeholder: '',
  },
  {
    name: 'fullName',
    type: 'text',
    placeholder: 'Enter the complete name',
  },
  {
    name: 'identification',
    type: 'text',
    placeholder: 'Enter the identification',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter the email',
  },
  {
    name: 'gender',
    type: 'select',
    placeholder: 'Enter your gender',
    options: [
      { value: 'Male', label: 'Male'},
      { value: 'Female', label: 'Female'},
      { value: 'Non-binary', label: 'Non-binary'},
    ]
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'Enter the city',
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'Enter the address',
  },
  {
    name: 'age',
    type: 'number',
    placeholder: 'Enter the age',
  },
  {
    name: 'postalCode',
    type: 'text',
    placeholder: 'Enter the postal code',
  }
]
