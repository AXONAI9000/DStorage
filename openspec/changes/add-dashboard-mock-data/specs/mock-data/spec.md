# Mock Data Implementation Specification

## Summary
Generate realistic mock data for the StorageNet dashboard to enhance development experience and enable demonstration capabilities.

## Problem
The dashboard component currently requires actual data to display meaningful content, creating barriers for development, testing, and demonstration activities.

## Solution
Create a mock data generation utility that produces realistic sample data matching the existing TypeScript interfaces for StorageStats, StorageFile, and Transaction.

## Success Criteria
1. Mock data generator creates realistic data matching all TypeScript interfaces
2. Dashboard displays correctly with mock data
3. Mock data can be easily toggled on/off for development
4. Generated data covers various edge cases and realistic scenarios

## Implementation Plan

### Phase 1: Create Mock Data Utility
1. Create `src/lib/mockData.ts` with generation functions
2. Implement `generateMockStorageStats()` function
3. Implement `generateMockFiles()` function
4. Implement `generateMockTransactions()` function
5. Create `getMockDashboardData()` aggregator function

### Phase 2: Update Dashboard Component
1. Add optional mock data prop to Dashboard component
2. Ensure component works with both real and mock data
3. Add mock data toggle for development mode

### Phase 3: Integration
1. Update App.tsx to use mock data when appropriate
2. Add environment variable or flag to control mock data usage
3. Ensure seamless switching between mock and real data

## UI Changes
No direct UI changes required. The dashboard will display the same components but with mock data instead of empty states.

## Technical Details

### Mock Data Structure
The mock data generator will create:

1. **StorageStats** with realistic values:
   - Total allocated: 100GB-1TB range
   - Used storage: 20-80% of allocated
   - Points earned: 100-10,000 range
   - Provider status: Randomly true/false
   - Network nodes: 10-100 range

2. **StorageFile** array with 5-15 files:
   - Realistic file names and extensions
   - File sizes from KB to GB
   - Random upload timestamps within last 30 days
   - Shard counts based on file size
   - Status distribution: 70% active, 20% uploading, 10% retrieving

3. **Transaction** array with 10-20 entries:
   - Mix of transaction types
   - Realistic point values
   - Timestamps spread across last 30 days
   - Descriptive transaction descriptions

### Code Structure
```typescript
// src/lib/mockData.ts
export const generateMockStorageStats = (): StorageStats => { ... }
export const generateMockFiles = (count?: number): StorageFile[] => { ... }
export const generateMockTransactions = (count?: number): Transaction[] => { ... }
export const getMockDashboardData = () => ({
  stats: generateMockStorageStats(),
  files: generateMockFiles(),
  transactions: generateMockTransactions()
})
```

## Considerations

### Performance
- Mock data generation should be lightweight
- Consider caching generated data to avoid regeneration

### Realism
- File names should be realistic (not just "file1", "file2")
- Transaction descriptions should be meaningful
- Data relationships should make sense (e.g., more transactions for active users)

### Extensibility
- Design generators to accept parameters for customization
- Allow easy addition of new mock data scenarios
- Consider different user profiles (new user, power user, provider)

### Testing
- Mock data should cover edge cases
- Include empty state scenarios
- Test with maximum values to ensure UI scales properly

## Security
No security concerns as this is client-side mock data generation.

## Future Enhancements
1. Add different mock data profiles (new user, experienced user, provider)
2. Include mock data for network visualization
3. Add time-based mock data progression for demos
4. Create mock data for file upload simulation