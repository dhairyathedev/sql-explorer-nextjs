'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import { getDatabases, getRelations } from '@/lib/api'

// Demo data
const demoRelations = {
  db_name: "DemoDB",
  relations: [
    {
      table_name: "Users",
      col_name: "id",
      ref_table: "Orders",
      ref_col: "user_id"
    },
    {
      table_name: "Orders",
      col_name: "product_id",
      ref_table: "Products",
      ref_col: "id"
    },
    {
      table_name: "Products",
      col_name: "category_id",
      ref_table: "Categories",
      ref_col: "id"
    }
  ]
}

export default function VisualizerPage() {
  const [dbmsList, setDbmsList] = useState<string[]>(['Demo', 'MySQL', 'PostgreSQL', 'SQLite'])
  const [selectedDbms, setSelectedDbms] = useState('Demo')
  const [databases, setDatabases] = useState<string[]>(['DemoDB'])
  const [selectedDatabase, setSelectedDatabase] = useState('DemoDB')
  const [relations, setRelations] = useState<any>(demoRelations)

  useEffect(() => {
    if (selectedDbms && selectedDbms !== 'Demo') {
      getDatabases(selectedDbms).then(data => {
        setDatabases(data[0].databases)
        setSelectedDatabase('')
      })
    } else if (selectedDbms === 'Demo') {
      setDatabases(['DemoDB'])
      setSelectedDatabase('DemoDB')
      setRelations(demoRelations)
    }
  }, [selectedDbms])

  useEffect(() => {
    if (selectedDatabase && selectedDbms !== 'Demo') {
      getRelations(selectedDatabase).then(data => {
        setRelations(data)
      })
    }
  }, [selectedDatabase, selectedDbms])

  const nodes: Node[] = relations ? relations.relations.map((relation: any, index: number) => ({
    id: relation.table_name,
    data: { label: relation.table_name },
    position: { x: 250 * (index % 2), y: 100 * Math.floor(index / 2) }
  })) : []

  const edges: Edge[] = relations ? relations.relations.map((relation: any, index: number) => ({
    id: `e${index}`,
    source: relation.table_name,
    target: relation.ref_table,
    label: `${relation.col_name} -> ${relation.ref_col}`,
    type: 'smoothstep'
  })) : []

  return (
    <div className="h-screen flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6">Database Visualizer</h1>
      <div className="mb-4 flex space-x-4">
        <Select value={selectedDbms} onValueChange={setSelectedDbms}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select DBMS" />
          </SelectTrigger>
          <SelectContent>
            {dbmsList.map(dbms => (
              <SelectItem key={dbms} value={dbms}>{dbms}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDatabase} onValueChange={setSelectedDatabase} disabled={selectedDbms === 'Demo'}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Database" />
          </SelectTrigger>
          <SelectContent>
            {databases.map(db => (
              <SelectItem key={db} value={db}>{db}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-grow border rounded-lg overflow-hidden">
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  )
}

