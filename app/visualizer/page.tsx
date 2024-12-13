'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import { getDatabases, getRelations } from '@/lib/api'

export default function VisualizerPage() {
  const [dbmsList, setDbmsList] = useState<string[]>([])
  const [selectedDbms, setSelectedDbms] = useState('')
  const [databases, setDatabases] = useState<string[]>([])
  const [selectedDatabase, setSelectedDatabase] = useState('')
  const [relations, setRelations] = useState<any>(null)
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
      getRelations(selectedDatabase).then(data => {
        setRelations(data)
      })
    }
  }, [selectedDatabase])

  const nodes: Node[] = relations ? relations.relations.map((relation: any, index: number) => ({
    id: relation.table_name,
    data: { label: relation.table_name },
    position: { x: 250 * index, y: 100 }
  })) : []

  const edges: Edge[] = relations ? relations.relations.map((relation: any, index: number) => ({
    id: `e${index}`,
    source: relation.table_name,
    target: relation.ref_table,
    label: `${relation.col_name} -> ${relation.ref_col}`,
    type: 'smoothstep'
  })) : []

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Database Visualizer</h1>
      <div className="mb-4 flex space-x-4">
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
      </div>
      <div className="flex-grow">
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

