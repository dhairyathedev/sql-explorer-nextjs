'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'

// Mock data
const mockDatabases = [
  { 
    id: 1, 
    name: 'Users DB', 
    tables: [
      { id: 'users', label: 'Users' },
      { id: 'orders', label: 'Orders' },
      { id: 'products', label: 'Products' }
    ],
    relationships: [
      { source: 'users', target: 'orders', label: 'has many' },
      { source: 'orders', target: 'products', label: 'contains' }
    ]
  },
  // Add more mock databases here
]

export default function VisualizerPage() {
  const [selectedDatabase, setSelectedDatabase] = useState(mockDatabases[0])

  const nodes: Node[] = selectedDatabase.tables.map((table, index) => ({
    id: table.id,
    data: { label: table.label },
    position: { x: 250 * index, y: 100 }
  }))

  const edges: Edge[] = selectedDatabase.relationships.map((rel, index) => ({
    id: `e${index}`,
    source: rel.source,
    target: rel.target,
    label: rel.label,
    type: 'smoothstep'
  }))

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Database Visualizer</h1>
      <div className="mb-4">
        <Select 
          value={selectedDatabase.name} 
          onValueChange={(value) => setSelectedDatabase(mockDatabases.find(db => db.name === value) || mockDatabases[0])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a database" />
          </SelectTrigger>
          <SelectContent>
            {mockDatabases.map(db => (
              <SelectItem key={db.id} value={db.name}>{db.name}</SelectItem>
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

