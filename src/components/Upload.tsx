import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { CloudArrowUp, File, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { StorageFile, StorageStats, Transaction } from '@/lib/types'

interface UploadProps {
  files: StorageFile[]
  setFiles: (updater: (files: StorageFile[]) => StorageFile[]) => void
  stats: StorageStats
  setStats: (updater: (stats: StorageStats) => StorageStats) => void
  setTransactions: (updater: (txs: Transaction[]) => Transaction[]) => void
}

export default function Upload({ files, setFiles, stats, setStats, setTransactions }: UploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const simulateUpload = async (file: File) => {
    setUploading(true)
    setUploadProgress(0)

    const fileSize = file.size
    const shardCount = Math.ceil(fileSize / (10 * 1024 * 1024)) || 1
    const pointsEarned = Math.floor(fileSize / (1024 * 1024)) || 1

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    const retrievalCode = `SN-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const newFile: StorageFile = {
      id: Date.now().toString(),
      name: file.name,
      size: fileSize,
      uploadedAt: Date.now(),
      shards: shardCount,
      status: 'active',
      retrievalCode,
    }

    setFiles((currentFiles) => [...currentFiles, newFile])
    setStats((currentStats) => ({
      ...currentStats,
      totalUsed: currentStats.totalUsed + fileSize,
      filesStored: currentStats.filesStored + 1,
      pointsEarned: currentStats.pointsEarned + pointsEarned,
    }))

    setTransactions((currentTxs) => [
      {
        id: Date.now().toString(),
        type: 'upload',
        amount: pointsEarned,
        timestamp: Date.now(),
        description: `Uploaded ${file.name}`,
      },
      ...currentTxs,
    ])

    setUploading(false)
    setUploadProgress(0)
    setSelectedFile(null)

    toast.success('File uploaded successfully!', {
      description: `Your file has been distributed across ${shardCount} shards. Retrieval code: ${retrievalCode}`,
      duration: 5000,
    })
  }

  const handleUpload = () => {
    if (!selectedFile) return
    
    if (stats.totalAllocated === 0) {
      toast.error('No storage allocated', {
        description: 'Please allocate storage space in the Provider tab first.',
      })
      return
    }

    if (stats.totalUsed + selectedFile.size > stats.totalAllocated) {
      toast.error('Insufficient storage', {
        description: 'You need to allocate more storage space.',
      })
      return
    }

    simulateUpload(selectedFile)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Upload Files</h2>
        <p className="text-muted-foreground">Distribute your files across the decentralized network</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudArrowUp size={24} className="text-primary" />
              Upload to Network
            </CardTitle>
            <CardDescription>
              Your files will be encrypted, sharded, and distributed across multiple nodes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <CloudArrowUp size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  {selectedFile ? selectedFile.name : 'Click to select a file'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedFile ? formatBytes(selectedFile.size) : 'Any file type supported'}
                </p>
              </label>
            </div>

            {uploading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Encrypting file data</p>
                  <p>• Creating file shards</p>
                  <p>• Distributing across network nodes</p>
                </div>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploading}
              className="w-full"
              size="lg"
            >
              {uploading ? 'Uploading...' : 'Upload to Network'}
            </Button>

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkle size={16} className="text-accent" />
                How it works
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Files are encrypted with AES-256 encryption</li>
                <li>Split into multiple shards for redundancy</li>
                <li>Distributed across {stats.networkNodes}+ global nodes</li>
                <li>Earn points for every MB uploaded</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <File size={20} />
              Your Files
            </CardTitle>
            <CardDescription>
              {files.length} file{files.length !== 1 ? 's' : ''} stored on the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <File size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium">No files yet</p>
                <p className="text-sm mt-1">Upload your first file to get started</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {files.map((file) => (
                  <div 
                    key={file.id} 
                    className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <File size={24} className="text-primary mt-1" />
                        <div>
                          <p className="font-medium text-sm mb-1">{file.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatBytes(file.size)}</span>
                            <span>•</span>
                            <span>{file.shards} shards</span>
                            <span>•</span>
                            <span>{formatDate(file.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <CheckCircle size={20} className="text-secondary" weight="fill" />
                    </div>
                    <div className="bg-muted/30 rounded px-3 py-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Retrieval Code:</span>
                      <code className="text-xs font-mono text-primary">{file.retrievalCode}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
