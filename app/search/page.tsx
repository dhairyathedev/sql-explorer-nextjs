'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

// Mock data
const mockDatabases = [
  { id: 1, name: 'Users DB', type: 'PostgreSQL', tables: ['users', 'orders', 'products'] },
  { id: 2, name: 'Analytics DB', type: 'SQL Server', tables: ['events', 'metrics', 'dimensions'] },
  { id: 3, name: 'Inventory DB', type: 'MariaDB', tables: ['items', 'categories', 'suppliers'] },
]

type SearchResult = {
  database: string
  table: string
  type: string
  columns: string[]
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [databaseFilter, setDatabaseFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showTables, setShowTables] = useState(true)
  const [showColumns, setShowColumns] = useState(true)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleSearch = () => {
    // Simple mock search functionality
    const results = mockDatabases
      .filter(db => databaseFilter === 'all' || db.name === databaseFilter)
      .filter(db => typeFilter === 'all' || db.type === typeFilter)
      .flatMap(db => 
        db.tables.filter(table => 
          table.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(table => ({
          database: db.name,
          table,
          type: db.type,
          columns: ['id', 'name', 'created_at'] // Mock columns
        }))
      )
    setSearchResults(results)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Database Estate</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search for tables, columns, or views" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={databaseFilter} onValueChange={setDatabaseFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select database" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Databases</SelectItem>
            {mockDatabases.map(db => (
              <SelectItem key={db.id} value={db.name}>{db.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
            <SelectItem value="SQL Server">SQL Server</SelectItem>
            <SelectItem value="MariaDB">MariaDB</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="show-tables" checked={showTables} onCheckedChange={setShowTables} />
          <Label htmlFor="show-tables">Show Tables</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="show-columns" checked={showColumns} onCheckedChange={setShowColumns} />
          <Label htmlFor="show-columns">Show Columns</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{result.table}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Database: {result.database}</p>
              <p>Type: {result.type}</p>
              {showColumns && (
                <div>
                  <p className="font-semibold mt-2">Columns:</p>
                  <ul className="list-disc list-inside">
                    {result.columns.map((column, i) => (
                      <li key={i}>{column}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

