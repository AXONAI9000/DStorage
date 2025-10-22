import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { ShareNetwork, Coins, TrendUp, HardDrives, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { StorageStats, Transaction } from '@/lib/types'

interface ProviderProps {
  stats: StorageStats
  setStats: (updater: (stats: StorageStats) => StorageStats) => void
  setTransactions: (updater: (txs: Transaction[]) => Transaction[]) => void
}

export default function Provider({ stats, setStats, setTransactions }: ProviderProps) {
  const [allocatedGB, setAllocatedGB] = useState(
    stats.totalAllocated > 0 ? Math.floor(stats.totalAllocated / (1024 ** 3)) : 10
  )

  const estimatedMonthlyEarnings = allocatedGB * 50
  const utilizationRate = stats.totalAllocated > 0 
    ? Math.min((stats.totalUsed / stats.totalAllocated) * 100, 100)
    : 0

  const handleActivateProvider = () => {
    const storageBytes = allocatedGB * 1024 ** 3
    
    setStats((currentStats) => ({
      ...currentStats,
      totalAllocated: storageBytes,
      isProvider: true,
    }))

    setTransactions((currentTxs) => [
      {
        id: Date.now().toString(),
        type: 'provide',
        amount: 100,
        timestamp: Date.now(),
        description: `Activated as storage provider (${allocatedGB} GB)`,
      },
      ...currentTxs,
    ])

    toast.success('Storage provider activated!', {
      description: `You're now providing ${allocatedGB} GB to the network. Start earning points!`,
      duration: 5000,
    })
  }

  const handleDeactivateProvider = () => {
    if (stats.totalUsed > 0) {
      toast.error('Cannot deactivate', {
        description: 'You have files stored. Remove them first.',
      })
      return
    }

    setStats((currentStats) => ({
      ...currentStats,
      totalAllocated: 0,
      isProvider: false,
    }))

    toast.success('Storage provider deactivated', {
      description: 'You are no longer providing storage to the network.',
    })
  }

  const handleUpdateAllocation = () => {
    const storageBytes = allocatedGB * 1024 ** 3
    
    if (storageBytes < stats.totalUsed) {
      toast.error('Cannot reduce allocation', {
        description: 'New allocation must be larger than currently used storage.',
      })
      return
    }

    setStats((currentStats) => ({
      ...currentStats,
      totalAllocated: storageBytes,
    }))

    toast.success('Allocation updated!', {
      description: `Storage allocation set to ${allocatedGB} GB.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Become a Provider</h2>
        <p className="text-muted-foreground">Earn points by sharing your storage space with the network</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShareNetwork size={24} className="text-primary" />
              Provider Setup
            </CardTitle>
            <CardDescription>
              Allocate storage space and start earning passive income
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Storage Allocation</label>
                  <span className="text-2xl font-bold text-primary">{allocatedGB} GB</span>
                </div>
                <Slider
                  value={[allocatedGB]}
                  onValueChange={(value) => setAllocatedGB(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  disabled={stats.isProvider}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 GB</span>
                  <span>100 GB</span>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Estimated Monthly Earnings</span>
                  <div className="flex items-center gap-2">
                    <Coins size={20} className="text-accent" />
                    <span className="text-xl font-bold text-accent">{estimatedMonthlyEarnings}</span>
                    <span className="text-xs text-muted-foreground">SNT</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Based on current network rates</p>
              </div>
            </div>

            {!stats.isProvider ? (
              <Button onClick={handleActivateProvider} className="w-full" size="lg">
                <CheckCircle size={20} className="mr-2" />
                Activate as Provider
              </Button>
            ) : (
              <div className="space-y-3">
                <Button onClick={handleUpdateAllocation} variant="secondary" className="w-full">
                  Update Allocation
                </Button>
                <Button onClick={handleDeactivateProvider} variant="destructive" className="w-full">
                  Deactivate Provider
                </Button>
              </div>
            )}

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkle size={16} className="text-accent" />
                Provider Benefits
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Earn {allocatedGB * 50} SNT points monthly</li>
                <li>Bonus rewards for 99%+ uptime</li>
                <li>Priority file upload speeds</li>
                <li>Access to provider-exclusive features</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={20} />
                Provider Stats
              </CardTitle>
              <CardDescription>
                {stats.isProvider ? 'Your contribution to the network' : 'Statistics available after activation'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.isProvider ? (
                <>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Allocated</p>
                      <p className="text-2xl font-bold">{allocatedGB} GB</p>
                    </div>
                    <HardDrives size={32} className="text-primary" />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
                      <p className="text-2xl font-bold">
                        {(stats.totalUsed / (1024 ** 3)).toFixed(2)} GB
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {utilizationRate.toFixed(1)}% utilized
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {utilizationRate > 80 ? 'High' : utilizationRate > 40 ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-accent/20 bg-accent/5 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Provider Earnings</p>
                      <p className="text-2xl font-bold text-accent">{stats.providerEarnings}</p>
                      <p className="text-xs text-muted-foreground mt-1">Total SNT earned</p>
                    </div>
                    <Coins size={32} className="text-accent" />
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ShareNetwork size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Not yet a provider</p>
                  <p className="text-sm mt-1">Activate to start earning rewards</p>
                </div>
              )}
            </CardContent>
          </Card>

          {stats.isProvider && (
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Sparkle size={20} weight="fill" />
                  Achievement Unlocked!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2 font-medium">Storage Provider</p>
                <p className="text-xs text-muted-foreground">
                  You're now contributing to the decentralized storage network. Keep your node online to maximize earnings!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
