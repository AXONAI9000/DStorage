import type { StorageFile, StorageStats, Transaction } from './types'

/**
 * Generates mock storage statistics with realistic values
 * @returns Mock StorageStats object
 */
export const generateMockStorageStats = (): StorageStats => {
  const totalAllocated = Math.floor(Math.random() * 900 + 100) * 1024 * 1024 * 1024 // 100GB-1TB in bytes
  const usedPercent = Math.random() * 0.6 + 0.2 // 20-80% usage
  const totalUsed = Math.floor(totalAllocated * usedPercent)
  const isProvider = Math.random() > 0.5
  const networkNodes = Math.floor(Math.random() * 90) + 10 // 10-100 nodes
  
  return {
    totalAllocated,
    totalUsed,
    filesStored: Math.floor(Math.random() * 50) + 5,
    pointsEarned: Math.floor(Math.random() * 9900) + 100,
    isProvider,
    providerEarnings: isProvider ? Math.floor(Math.random() * 1000) + 50 : 0,
    networkNodes
  }
}

/**
 * Generates an array of mock storage files
 * @param count - Number of files to generate (default: 10)
 * @returns Array of mock StorageFile objects
 */
export const generateMockFiles = (count: number = 10): StorageFile[] => {
  const fileNames = [
    'document', 'presentation', 'spreadsheet', 'image', 'video',
    'archive', 'backup', 'project', 'report', 'dataset',
    'photo', 'music', 'ebook', 'config', 'script'
  ]
  
  const extensions = [
    '.pdf', '.docx', '.xlsx', '.pptx', '.jpg', '.png', '.mp4',
    '.zip', '.tar.gz', '.csv', '.json', '.xml', '.txt', '.md'
  ]
  
  const statuses: Array<'uploading' | 'active' | 'retrieving'> = ['uploading', 'active', 'retrieving']
  const statusWeights = [0.2, 0.7, 0.1] // 20% uploading, 70% active, 10% retrieving
  
  const files: StorageFile[] = []
  const now = Date.now()
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000)
  
  for (let i = 0; i < count; i++) {
    const name = fileNames[Math.floor(Math.random() * fileNames.length)]
    const ext = extensions[Math.floor(Math.random() * extensions.length)]
    const size = Math.floor(Math.random() * 5 * 1024 * 1024 * 1024) + 1024 // 1KB - 5GB
    const uploadedAt = Math.floor(Math.random() * (now - thirtyDaysAgo)) + thirtyDaysAgo
    
    // Weighted random status selection
    const random = Math.random()
    let status: 'uploading' | 'active' | 'retrieving'
    if (random < statusWeights[0]) {
      status = 'uploading'
    } else if (random < statusWeights[0] + statusWeights[1]) {
      status = 'active'
    } else {
      status = 'retrieving'
    }
    
    // Calculate shards based on file size (1 shard per GB, minimum 3)
    const sizeInGB = size / (1024 * 1024 * 1024)
    const shards = Math.max(3, Math.ceil(sizeInGB))
    
    files.push({
      id: `file-${i + 1}-${Date.now()}`,
      name: `${name}_${i + 1}${ext}`,
      size,
      uploadedAt,
      shards,
      status,
      retrievalCode: `RC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    })
  }
  
  return files.sort((a, b) => b.uploadedAt - a.uploadedAt) // Sort by newest first
}

/**
 * Generates an array of mock transactions
 * @param count - Number of transactions to generate (default: 15)
 * @returns Array of mock Transaction objects
 */
export const generateMockTransactions = (count: number = 15): Transaction[] => {
  const transactionTypes: Array<'upload' | 'download' | 'provide' | 'reward'> = ['upload', 'download', 'provide', 'reward']
  
  const uploadDescriptions = [
    'Uploaded document file',
    'Stored backup archive',
    'Added image collection',
    'Saved project files',
    'Submitted dataset'
  ]
  
  const downloadDescriptions = [
    'Retrieved document',
    'Downloaded backup',
    'Accessed images',
    'Fetched project files',
    'Requested dataset'
  ]
  
  const provideDescriptions = [
    'Storage allocation bonus',
    'Network participation reward',
    'Uptime incentive',
    'Storage contribution',
    'Network maintenance'
  ]
  
  const rewardDescriptions = [
    'Daily login bonus',
    'Referral reward',
    'Community contribution',
    'Bug bounty',
    'Feature participation'
  ]
  
  const transactions: Transaction[] = []
  const now = Date.now()
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000)
  
  for (let i = 0; i < count; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
    const timestamp = Math.floor(Math.random() * (now - thirtyDaysAgo)) + thirtyDaysAgo
    
    let description: string
    let amount: number
    
    switch (type) {
      case 'upload':
        description = uploadDescriptions[Math.floor(Math.random() * uploadDescriptions.length)]
        amount = Math.floor(Math.random() * 50) + 10 // 10-60 points
        break
      case 'download':
        description = downloadDescriptions[Math.floor(Math.random() * downloadDescriptions.length)]
        amount = Math.floor(Math.random() * 20) + 5 // 5-25 points
        break
      case 'provide':
        description = provideDescriptions[Math.floor(Math.random() * provideDescriptions.length)]
        amount = Math.floor(Math.random() * 100) + 50 // 50-150 points
        break
      case 'reward':
        description = rewardDescriptions[Math.floor(Math.random() * rewardDescriptions.length)]
        amount = Math.floor(Math.random() * 200) + 25 // 25-225 points
        break
      default:
        description = 'Transaction completed'
        amount = 10
    }
    
    transactions.push({
      id: `tx-${i + 1}-${Date.now()}`,
      type,
      amount,
      timestamp,
      description
    })
  }
  
  return transactions.sort((a, b) => b.timestamp - a.timestamp) // Sort by newest first
}

/**
 * Generates complete mock dashboard data
 * @returns Object containing mock stats, files, and transactions
 */
export const getMockDashboardData = () => {
  return {
    stats: generateMockStorageStats(),
    files: generateMockFiles(),
    transactions: generateMockTransactions()
  }
}