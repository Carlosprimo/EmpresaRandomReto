import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import { NotFound } from '@/pages/NotFound'
import { LoadingView } from '@/components/Loading'

import { ListGames, ViewGame, AddGame, EditGame } from '@/pages/Games'
import {
  ListCustomers,
  ViewCustomer,
  AddCustomer,
  EditCustomer
} from '@/pages/Customers'
import { ListRentals, AddRental } from '@/pages/Rentals'
import { Metrics } from '@/pages/Metrics'

import { ListPrices, AddPrice, EditPrice } from './pages/Prices'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/games',
        children: [
          {
            path: '',
            element: <ListGames />
          },
          {
            path: ':id',
            element: <ViewGame />
          },
          {
            path: 'add',
            element: <AddGame />
          },
          {
            path: 'edit/:id',
            element: <EditGame />
          }
        ]
      },
      {
        path: '/customers',
        children: [
          {
            path: '',
            element: <ListCustomers />
          },
          {
            path: ':id',
            element: <ViewCustomer />
          },
          {
            path: 'add',
            element: <AddCustomer />
          },
          {
            path: 'edit/:id',
            element: <EditCustomer />
          }
        ]
      },
      {
        path: '/rentals',
        children: [
          {
            path: '',
            element: <ListRentals />
          },
          {
            path: 'add',
            element: <AddRental />
          }
        ]
      },
      {
        path: '/prices',
        children: [
          {
            path: '',
            element: <ListPrices />
          },
          {
            path: 'add',
            element: <AddPrice />
          },
          {
            path: 'edit/:id',
            element: <EditPrice />
          }
        ]
      },
      {
        path: '/metrics',
        element: <Metrics />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingView />} />
  </React.StrictMode>
)
