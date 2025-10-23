# Implementation Tasks for Add Dashboard Mock Data

## Phase 1: Create Mock Data Utility

### Task 1.1: Create mockData.ts file
- [x] Create `src/lib/mockData.ts` file
- [x] Add necessary imports for types and utilities
- [x] Set up basic file structure with exports

### Task 1.2: Implement generateMockStorageStats
- [x] Create function signature with return type StorageStats
- [x] Generate realistic total allocated storage (100GB-1TB)
- [x] Calculate used storage as 20-80% of allocated
- [x] Generate points earned (100-10,000 range)
- [x] Randomly set provider status (true/false)
- [x] Generate network nodes count (10-100)
- [x] Calculate provider earnings based on status

### Task 1.3: Implement generateMockFiles
- [x] Create function with optional count parameter
- [x] Define arrays of realistic file names and extensions
- [x] Generate file sizes from KB to GB range
- [x] Create random upload timestamps within last 30 days
- [x] Calculate shard counts based on file size
- [x] Distribute status: 70% active, 20% uploading, 10% retrieving
- [x] Generate unique IDs and retrieval codes for each file

### Task 1.4: Implement generateMockTransactions
- [x] Create function with optional count parameter
- [x] Define transaction type distribution
- [x] Generate realistic point values for each transaction type
- [x] Create timestamps spread across last 30 days
- [x] Write descriptive transaction descriptions for each type
- [x] Generate unique transaction IDs

### Task 1.5: Create aggregator function
- [x] Implement getMockDashboardData() function
- [x] Call all generator functions
- [x] Return data object matching dashboard props
- [x] Add JSDoc documentation

## Phase 2: Update Dashboard Component

### Task 2.1: Add mock data support
- [x] Review Dashboard component props
- [x] Determine if prop changes are needed
- [x] Ensure component works with mock data structure

### Task 2.2: Test mock data integration
- [x] Import mock data generator
- [x] Test dashboard with mock data
- [x] Verify all sections display correctly
- [x] Check edge cases (empty arrays, zero values)

## Phase 3: Integration

### Task 3.1: Update App.tsx
- [x] Review current App.tsx implementation
- [x] Determine integration point for mock data
- [x] Add mock data usage when appropriate
- [x] Ensure real data path still works

### Task 3.2: Add mock data toggle
- [x] Implement environment variable or flag
- [x] Add conditional logic for mock vs real data
- [x] Test switching between modes
- [x] Document usage instructions

## Phase 4: Testing and Refinement

### Task 4.1: Unit testing
- [x] Test each generator function
- [x] Verify data type compliance
- [x] Test edge cases and parameters
- [x] Validate data relationships

### Task 4.2: Integration testing
- [x] Test full dashboard with mock data
- [x] Verify UI renders correctly
- [x] Test with different data volumes
- [x] Check performance impact

### Task 4.3: Documentation
- [x] Update README with mock data usage
- [x] Add inline code documentation
- [x] Create development guide section
- [x] Document environment variables

## Validation Criteria

### Functional Requirements
- [ ] Dashboard displays correctly with mock data
- [ ] All data types match TypeScript interfaces
- [ ] Mock data can be toggled on/off
- [ ] No breaking changes to existing functionality

### Quality Requirements
- [ ] Code follows project conventions
- [ ] Mock data appears realistic
- [ ] Performance impact is minimal
- [ ] Documentation is complete

### Deliverables
- [ ] `src/lib/mockData.ts` implementation
- [ ] Updated component files (if needed)
- [ ] Documentation updates
- [ ] Test coverage

## Dependencies and Blockers

### Dependencies
- Existing TypeScript interfaces in `src/lib/types.ts`
- Current Dashboard component implementation
- App.tsx integration point

### Potential Blockers
- Changes to TypeScript interfaces may require mock data updates
- Dashboard component refactoring could affect integration
- Environment variable configuration may need setup

## Notes
- Mock data should be lightweight and fast to generate
- Consider adding different mock profiles in future iterations
- Ensure mock data doesn't interfere with production builds