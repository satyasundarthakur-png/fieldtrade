import React, { useState } from 'react'
import { StoreProvider } from './store'
import TradeStrip from './components/TradeStrip'
import NewJobBar from './components/NewJobBar'
import JobBoard from './components/JobBoard'
import JobDetail from './components/JobDetail'

function Shell() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="h-screen flex flex-col bg-bone">
      <TradeStrip />
      <div className="px-4 md:px-8 py-5 flex items-end justify-between border-b border-line">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-safety mb-1">Job Board</p>
          <h1 className="font-display text-4xl uppercase tracking-wide text-charcoal">Today's Work</h1>
        </div>
      </div>
      <NewJobBar />
      <div className="flex-1 flex min-h-0 relative">
        <JobBoard onSelect={setSelectedId} />
        {selectedId && <JobDetail jobId={selectedId} onClose={() => setSelectedId(null)} />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
