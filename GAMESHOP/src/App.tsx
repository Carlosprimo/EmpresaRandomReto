import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavBar } from '@/components/NavBar'

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NavBar />
      <Outlet />
    </QueryClientProvider>
  )
}
