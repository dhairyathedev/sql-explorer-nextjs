'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getDatabases, getTables, searchTables } from '@/lib/api'

export default function SearchPage() {
  const [dbmsList, setDbmsList] = useState<string[]>([])
  const [selectedDbms, setSelectedDbms] = useState('')
  const [databases, setDatabases] = useState<string[]>([])
  const [selectedDatabase, setSelectedDatabase] = useState('')
  const [tables, setTables] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    // In a real application, you would fetch the list of DBMS from the backend
    setDbmsList(['MySQL', 'PostgreSQL', 'SQLite'])
  }, [])

  useEffect(() => {
    if (selectedDbms) {
      getDatabases(selectedDbms).then(data => {
        setDatabases(data[0].databases)
      })
    }
  }, [selectedDbms])

  useEffect(() => {
    if (selectedDatabase) {
      getTables(selectedDatabase).then(data => {
        setTables(data.map((item: any) => item.db_name))
      })
    }
  }, [selectedDatabase])

  const handleSearch = async () => {
    const results = await searchTables(searchTerm, [])
    setSearchResults(results)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Database Estate</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Select value={selectedDbms} onValueChange={setSelectedDbms}>
          <SelectTrigger>
            <SelectValue placeholder="Select DBMS" />
          </SelectTrigger>
          <SelectContent>
            {dbmsList.map(dbms => (
              <SelectItem key={dbms} value={dbms}>{dbms}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
          <SelectTrigger>
            <SelectValue placeholder="Select Database" />
          </SelectTrigger>
          <SelectContent>
            {databases.map(db => (
              <SelectItem key={db} value={db}>{db}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input 
          type="text" 
          placeholder="Search for tables, columns, or views" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{Object.keys(result)[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.values(result)[0].map((table: any, tableIndex: number) => (
                <div key={tableIndex}>
                  <h3 className="font-semibold">{Object.keys(table)[0]}</h3>
                  <ul>
                    {Object.entries(Object.values(table)[0]).map(([key, value], entryIndex) => (
                      <li key={entryIndex}>{key}: {value as string}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

