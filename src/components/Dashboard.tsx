import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { HardDrives, CloudArrowUp, Coins, TrendUp, File, CheckCircle } from '@phosphor-icons/react'
import type { StorageFile, StorageStats, Transaction } from '@/lib/types'

interface DashboardProps {
  stats: StorageStats
  files: StorageFile[]
  transactions: Transaction[]
}

export default function Dashboard({ stats, files, transactions }: DashboardProps) {
  const storageUsedPercent = stats.totalAllocated > 0 
    ? (stats.totalUsed / stats.totalAllocated) * 100 
    : 0

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 GB'
    const gb = bytes / (1024 ** 3)
    return `${gb.toFixed(2)} GB`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Monitor your storage activity and earnings</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
            <HardDrives size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(stats.totalAllocated)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatBytes(stats.totalUsed)} used
            </p>
            <Progress value={storageUsedPercent} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Files Stored</CardTitle>
            <CloudArrowUp size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {stats.networkNodes} nodes
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Coins size={20} className="text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.pointsEarned}</div>
            <p className="text-xs text-muted-foreground mt-1">
              SNT tokens
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provider Earnings</CardTitle>
            <TrendUp size={20} className="text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.providerEarnings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.isProvider ? (
                <Badge variant="secondary" className="text-xs">Active Provider</Badge>
              ) : (
                'Not providing storage'
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <File size={20} />
              Recent Files
            </CardTitle>
            <CardDescription>Your recently uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CloudArrowUp size={48} className="mx-auto mb-3 opacity-50" />
                <p>No files uploaded yet</p>
                <p className="text-sm mt-1">Upload your first file to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.slice(0, 5).map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <File size={24} className="text-primary" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(file.size)} • {file.shards} shards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-secondary" weight="fill" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins size={20} />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Coins size={48} className="mx-auto mb-3 opacity-50" />
                <p>No activity yet</p>
                <p className="text-sm mt-1">Start uploading or providing storage</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <Badge variant={tx.type === 'reward' ? 'default' : 'secondary'}>
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{tx.description}</TableCell>
                      <TableCell className="text-right font-medium text-accent">
                        +{tx.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
