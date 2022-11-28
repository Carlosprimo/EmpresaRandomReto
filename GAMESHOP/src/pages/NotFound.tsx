import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-6xl leading-4">404</h1>
      <p className="text-lg">Sorry, the page you were looking for doesn't exist.</p>
      <p className="-mt-1 text-lg text-red-500">Go to <Link to="/">Home Page</Link></p>
    </section>
  )
}
