import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HardDrives, CloudArrowUp, Graph, Coins, Eye } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import Dashboard from '@/components/Dashboard'
import Upload from '@/components/Upload'
import Network from '@/components/Network'
import Provider from '@/components/Provider'
import type { StorageFile, StorageStats, Transaction } from '@/lib/types'
import { getMockDashboardData } from '@/lib/mockData'

function App() {
  const [files = [], setFiles] = useKV<StorageFile[]>('storage-files', [])
  const [stats = {
    totalAllocated: 0,
    totalUsed: 0,
    filesStored: 0,
    pointsEarned: 0,
    isProvider: false,
    providerEarnings: 0,
    networkNodes: 847,
  }, setStats] = useKV<StorageStats>('storage-stats', {
    totalAllocated: 0,
    totalUsed: 0,
    filesStored: 0,
    pointsEarned: 0,
    isProvider: false,
    providerEarnings: 0,
    networkNodes: 847,
  })
  const [transactions = [], setTransactions] = useKV<Transaction[]>('transactions', [])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [useMockData, setUseMockData] = useState(false)
  
  // Use mock data when enabled and there's no real data
  const shouldUseMockData = useMockData || (
    files.length === 0 &&
    stats.pointsEarned === 0 &&
    stats.filesStored === 0 &&
    transactions.length === 0
  )
  const mockData = shouldUseMockData ? getMockDashboardData() : null
  const displayStats = mockData?.stats || stats
  const displayFiles = mockData?.files || files
  const displayTransactions = mockData?.transactions || transactions

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <HardDrives size={24} weight="bold" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">StorageNet</h1>
                <p className="text-xs text-muted-foreground">Decentralized Storage Network</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm text-muted-foreground">{displayStats.networkNodes} Nodes Online</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
                <Coins size={20} weight="bold" className="text-accent" />
                <span className="font-bold text-lg">{displayStats.pointsEarned.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">SNT</span>
              </div>
              <Button
                variant={shouldUseMockData ? "default" : "outline"}
                size="sm"
                onClick={() => setUseMockData(!useMockData)}
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">Mock Data</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <HardDrives size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <CloudArrowUp size={18} />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Graph size={18} />
              <span className="hidden sm:inline">Network</span>
            </TabsTrigger>
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <Coins size={18} />
              <span className="hidden sm:inline">Earn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <Dashboard
              stats={displayStats}
              files={displayFiles}
              transactions={displayTransactions}
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-0">
            <Upload
              files={displayFiles}
              setFiles={setFiles}
              stats={displayStats}
              setStats={setStats}
              setTransactions={setTransactions}
            />
          </TabsContent>

          <TabsContent value="network" className="mt-0">
            <Network stats={displayStats} files={displayFiles} />
          </TabsContent>

          <TabsContent value="provider" className="mt-0">
            <Provider
              stats={displayStats}
              setStats={setStats}
              setTransactions={setTransactions}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
