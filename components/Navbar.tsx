import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">SQL Explorer</Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
          <Link href="/visualizer">Visualizer</Link>
        </div>
      </div>
    </nav>
  )
}

