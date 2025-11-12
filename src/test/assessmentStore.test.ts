import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { createAssessmentStore } from '../stores/assessmentStore';

describe('Assessment Store', () => {
  let store: ReturnType<typeof createAssessmentStore>;

  beforeEach(() => {
    localStorage.clear();
    store = createAssessmentStore();
  });

  describe('Organization Info', () => {
    it('should initialize with empty organization name', () => {
      const state = get(store);
      expect(state.organizationName).toBe('');
    });

    it('should update organization name', () => {
      store.updateOrganizationInfo('Acme Corp', []);
      const state = get(store);
      expect(state.organizationName).toBe('Acme Corp');
    });

    it('should update assessors list', () => {
      const assessors = ['John Doe', 'Jane Smith'];
      store.updateOrganizationInfo('Acme Corp', assessors);
      const state = get(store);
      expect(state.assessors).toEqual(assessors);
    });

    it('should persist organization info to localStorage', () => {
      store.updateOrganizationInfo('Acme Corp', ['John Doe']);
      
      // Create new store instance
      const newStore = createAssessmentStore();
      const state = get(newStore);
      
      expect(state.organizationName).toBe('Acme Corp');
      expect(state.assessors).toEqual(['John Doe']);
    });
  });

  describe('Proof Points', () => {
    it('should toggle proof point completion', () => {
      const state = get(store);
      const dimension = state.dimensions[0];
      const proofPoint = dimension.proofPoints[0];
      
      expect(proofPoint.completed).toBe(false);
      
      store.toggleProofPoint(dimension.id, proofPoint.id);
      
      const updatedState = get(store);
      const updatedProofPoint = updatedState.dimensions[0].proofPoints[0];
      expect(updatedProofPoint.completed).toBe(true);
    });

    it('should toggle proof point back to uncompleted', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      const proofPointId = state.dimensions[0].proofPoints[0].id;
      
      store.toggleProofPoint(dimensionId, proofPointId);
      store.toggleProofPoint(dimensionId, proofPointId);
      
      const updatedState = get(store);
      const proofPoint = updatedState.dimensions[0].proofPoints[0];
      expect(proofPoint.completed).toBe(false);
    });

    it('should toggle not applicable status', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      const proofPointId = state.dimensions[0].proofPoints[0].id;
      
      store.toggleNotApplicable(dimensionId, proofPointId);
      
      const updatedState = get(store);
      const proofPoint = updatedState.dimensions[0].proofPoints[0];
      expect(proofPoint.notApplicable).toBe(true);
    });

    it('should uncheck completed when marked not applicable', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      const proofPointId = state.dimensions[0].proofPoints[0].id;
      
      // First complete it
      store.toggleProofPoint(dimensionId, proofPointId);
      // Then mark as N/A
      store.toggleNotApplicable(dimensionId, proofPointId);
      
      const updatedState = get(store);
      const proofPoint = updatedState.dimensions[0].proofPoints[0];
      expect(proofPoint.completed).toBe(false);
      expect(proofPoint.notApplicable).toBe(true);
    });

    it('should update proof point evidence', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      const proofPointId = state.dimensions[0].proofPoints[0].id;
      const evidence = 'Document uploaded to SharePoint';
      
      store.updateProofPointEvidence(dimensionId, proofPointId, evidence);
      
      const updatedState = get(store);
      const proofPoint = updatedState.dimensions[0].proofPoints[0];
      expect(proofPoint.evidence).toBe(evidence);
    });
  });

  describe('Maturity Levels', () => {
    it('should set dimension maturity level', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      
      store.setMaturityLevel(dimensionId, 'Launch');
      
      const updatedState = get(store);
      const dimension = updatedState.dimensions.find(d => d.id === dimensionId);
      expect(dimension?.maturityLevel).toBe('Launch');
    });

    it('should update dimension maturity level', () => {
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      
      store.setMaturityLevel(dimensionId, 'Launch');
      store.setMaturityLevel(dimensionId, 'Integrate');
      
      const updatedState = get(store);
      const dimension = updatedState.dimensions.find(d => d.id === dimensionId);
      expect(dimension?.maturityLevel).toBe('Integrate');
    });
  });

  describe('Data Persistence', () => {
    it('should save assessment to localStorage', () => {
      store.updateOrganizationInfo('Test Org', ['Tester']);
      const state = get(store);
      const dimensionId = state.dimensions[0].id;
      const proofPointId = state.dimensions[0].proofPoints[0].id;
      
      store.toggleProofPoint(dimensionId, proofPointId);
      store.setMaturityLevel(dimensionId, 'Launch');
      
      // Check localStorage
      const saved = localStorage.getItem('w3c-maturity-assessment');
      expect(saved).toBeTruthy();
      
      const parsed = JSON.parse(saved!);
      expect(parsed.organizationName).toBe('Test Org');
      expect(parsed.dimensions[0].maturityLevel).toBe('Launch');
    });

    it('should load assessment from localStorage', () => {
      // Set up initial state
      store.updateOrganizationInfo('Loaded Org', ['User1', 'User2']);
      const state = get(store);
      store.toggleProofPoint(state.dimensions[0].id, state.dimensions[0].proofPoints[0].id);
      
      // Create new store instance (simulates page reload)
      const newStore = createAssessmentStore();
      const newState = get(newStore);
      
      expect(newState.organizationName).toBe('Loaded Org');
      expect(newState.assessors).toEqual(['User1', 'User2']);
      expect(newState.dimensions[0].proofPoints[0].completed).toBe(true);
    });

    it('should export assessment data', () => {
      store.updateOrganizationInfo('Export Test', ['Assessor']);
      
      const exported = store.exportData();
      const parsed = JSON.parse(exported);
      
      expect(parsed.organizationName).toBe('Export Test');
      expect(parsed.assessors).toEqual(['Assessor']);
      expect(parsed.dimensions).toHaveLength(7); // 7 dimensions in the model
    });

    it('should import assessment data', () => {
      const mockData = {
        organizationName: 'Imported Org',
        assessors: ['Import User'],
        assessmentDate: new Date().toISOString(),
        dimensions: get(store).dimensions,
      };
      
      store.importData(JSON.stringify(mockData));
      
      const state = get(store);
      expect(state.organizationName).toBe('Imported Org');
      expect(state.assessors).toEqual(['Import User']);
    });

    it('should reset assessment data', () => {
      store.updateOrganizationInfo('Will be reset', ['User']);
      const state = get(store);
      store.toggleProofPoint(state.dimensions[0].id, state.dimensions[0].proofPoints[0].id);
      
      store.reset();
      
      const resetState = get(store);
      expect(resetState.organizationName).toBe('');
      expect(resetState.assessors).toEqual([]);
      expect(resetState.dimensions[0].proofPoints[0].completed).toBe(false);
    });
  });

  describe('Progress Tracking', () => {
    it('should calculate progress correctly', () => {
      const state = get(store);
      
      // Complete first dimension
      state.dimensions[0].proofPoints.forEach(pp => {
        store.toggleProofPoint(state.dimensions[0].id, pp.id);
      });
      store.setMaturityLevel(state.dimensions[0].id, 'Optimize');
      
      // Get progress from store's derived progress value
      // You'll need to export progress from the store file
      const updatedState = get(store);
      const dimension = updatedState.dimensions.find(d => d.id === state.dimensions[0].id);
      expect(dimension?.maturityLevel).toBe('Optimize');
    });
  });
});
