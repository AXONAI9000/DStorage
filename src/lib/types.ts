export interface StorageFile {
  id: string
  name: string
  size: number
  uploadedAt: number
  shards: number
  status: 'uploading' | 'active' | 'retrieving'
  retrievalCode: string
}

export interface StorageStats {
  totalAllocated: number
  totalUsed: number
  filesStored: number
  pointsEarned: number
  isProvider: boolean
  providerEarnings: number
  networkNodes: number
}

export interface Transaction {
  id: string
  type: 'upload' | 'download' | 'provide' | 'reward'
  amount: number
  timestamp: number
  description: string
}
