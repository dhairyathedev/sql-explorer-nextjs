import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import AddDatabaseModal from '@/components/AddDatabaseModal'

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">SQL Explorer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connect Database</CardTitle>
            <CardDescription>Add a new database to your estate</CardDescription>
          </CardHeader>
          <CardContent>
            <AddDatabaseModal />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Search Estate</CardTitle>
            <CardDescription>Search across your database estate</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/search">
              <Button>Go to Search</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

