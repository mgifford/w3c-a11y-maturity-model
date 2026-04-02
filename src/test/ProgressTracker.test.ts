import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ProgressTracker from '../components/ProgressTracker.svelte';
import { assessmentStore } from '../stores/assessmentStore';

describe('ProgressTracker Component', () => {
  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
  });

  it('renders Assessment Progress heading', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByRole('heading', { name: /assessment progress/i })).toBeInTheDocument();
  });

  it('displays dimension progress section', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByText(/dimension progress/i)).toBeInTheDocument();
  });

  it('displays proof point progress section', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByText(/proof point progress/i)).toBeInTheDocument();
  });

  it('shows 0 of 7 dimensions assessed initially', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByText(/0 of 7 assessed/i)).toBeInTheDocument();
  });

  it('shows 0% dimension completion initially', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    // Both progress bars start at 0%
    const percentages = screen.getAllByText(/^0%$/);
    expect(percentages.length).toBeGreaterThan(0);
  });

  it('dimension progress bar has correct ARIA attributes', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThanOrEqual(2);
    
    const dimBar = screen.getByRole('progressbar', { name: /dimension completion/i });
    expect(dimBar).toHaveAttribute('aria-valuenow', '0');
    expect(dimBar).toHaveAttribute('aria-valuemin', '0');
    expect(dimBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('proof point progress bar has correct ARIA attributes', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    const ppBar = screen.getByRole('progressbar', { name: /proof point completion/i });
    expect(ppBar).toHaveAttribute('aria-valuenow', '0');
    expect(ppBar).toHaveAttribute('aria-valuemin', '0');
    expect(ppBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('progress stats have aria-live for dynamic updates', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    const liveRegions = document.querySelectorAll('[aria-live="polite"]');
    expect(liveRegions.length).toBeGreaterThanOrEqual(2);
  });

  it('updates dimension count when a maturity level is set', async () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByText(/0 of 7 assessed/i)).toBeInTheDocument();
    
    assessmentStore.setMaturityLevel('communications', 'launch');
    
    await Promise.resolve();
    
    expect(screen.getByText(/1 of 7 assessed/i)).toBeInTheDocument();
  });

  it('does not show completion banner when not all dimensions assessed', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.queryByText(/congratulations/i)).not.toBeInTheDocument();
  });

  it('does not show completion banner when currentView is summary', async () => {
    // Set all 7 dimensions to have maturity levels
    const store = assessmentStore;
    const { dimensions } = await new Promise<{ dimensions: any[] }>(resolve => {
      let unsubscribe: () => void;
      unsubscribe = store.subscribe(state => {
        resolve(state);
        if (unsubscribe) unsubscribe();
      });
    });
    
    dimensions.forEach(dim => {
      store.setMaturityLevel(dim.id, 'launch');
    });
    
    render(ProgressTracker, { props: { currentView: 'summary' } });
    
    // Should not show completion banner on summary view
    expect(screen.queryByRole('button', { name: /view summary report/i })).not.toBeInTheDocument();
  });

  it('shows completion banner with View Summary Report button when all dimensions are assessed', async () => {
    const dimensions = ['communications', 'ict-lifecycle', 'knowledge-skills', 'oversight-culture', 'personnel', 'procurement', 'support'];
    dimensions.forEach(id => assessmentStore.setMaturityLevel(id, 'launch'));
    
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    await Promise.resolve();
    
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view summary report/i })).toBeInTheDocument();
  });

  it('View Summary Report button is clickable', async () => {
    const dimensions = ['communications', 'ict-lifecycle', 'knowledge-skills', 'oversight-culture', 'personnel', 'procurement', 'support'];
    dimensions.forEach(id => assessmentStore.setMaturityLevel(id, 'launch'));
    
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    await Promise.resolve();
    
    const btn = screen.getByRole('button', { name: /view summary report/i });
    await expect(import('@testing-library/svelte').then(({ fireEvent }) => fireEvent.click(btn))).resolves.toBeTruthy();
  });

  it('section has aria-labelledby on progress heading', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'progress-heading');
  });

  it('displays Proof Points completed count', () => {
    render(ProgressTracker, { props: { currentView: 'overview' } });
    
    expect(screen.getByText(/proof points:/i)).toBeInTheDocument();
    expect(screen.getByText(/0 of \d+ completed/i)).toBeInTheDocument();
  });
});
