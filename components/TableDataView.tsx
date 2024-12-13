'use client'

import { useState, useEffect } from 'react'
import { getTableData } from '@/lib/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface TableDataViewProps {
  tableName: string
}

export default function TableDataView({ tableName }: TableDataViewProps) {
  const [tableData, setTableData] = useState<any[]>([])

  useEffect(() => {
    getTableData(tableName).then(data => {
      setTableData(data)
    })
  }, [tableName])

  if (tableData.length === 0) {
    return <div>No data available</div>
  }

  const columns = Object.keys(tableData[0])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            {columns.map(column => (
              <TableCell key={column}>{row[column]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

