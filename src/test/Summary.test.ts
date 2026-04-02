import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Summary from '../components/Summary.svelte';
import { assessmentStore } from '../stores/assessmentStore';

describe('Summary Component', () => {
  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
    vi.restoreAllMocks();
  });

  it('renders the Assessment Summary Report heading', () => {
    render(Summary);
    
    expect(screen.getByRole('heading', { name: /assessment summary report/i })).toBeInTheDocument();
  });

  it('has back to overview button', () => {
    render(Summary);
    
    // The button has aria-label="Back to dimension list" and text "← Back to Overview"
    expect(screen.getByRole('button', { name: /back to dimension list/i })).toBeInTheDocument();
  });

  it('back button is accessible with aria-label', () => {
    render(Summary);
    
    const backBtn = screen.getByRole('button', { name: /back to dimension list/i });
    expect(backBtn).toHaveAttribute('aria-label', 'Back to dimension list');
  });

  it('back button is clickable without error', async () => {
    render(Summary);
    
    const backBtn = screen.getByRole('button', { name: /back to dimension list/i });
    await expect(fireEvent.click(backBtn)).resolves.toBeTruthy();
  });

  it('shows organization label in report info', () => {
    render(Summary);
    
    expect(screen.getByText(/organization:/i)).toBeInTheDocument();
  });

  it('shows "Not specified" when organization name is empty', () => {
    render(Summary);
    
    expect(screen.getByText(/not specified/i)).toBeInTheDocument();
  });

  it('shows organization name when set', () => {
    assessmentStore.updateOrganizationInfo('ACME Corp', []);
    
    render(Summary);
    
    expect(screen.getByText('ACME Corp')).toBeInTheDocument();
  });

  it('shows assessment date', () => {
    render(Summary);
    
    expect(screen.getByText(/assessment date:/i)).toBeInTheDocument();
  });

  it('shows assessment team when assessors are provided', () => {
    assessmentStore.updateOrganizationInfo('Test Org', ['Alice', 'Bob']);
    
    render(Summary);
    
    expect(screen.getByText(/assessment team:/i)).toBeInTheDocument();
    expect(screen.getByText(/alice, bob/i)).toBeInTheDocument();
  });

  it('does not show assessment team section when no assessors', () => {
    render(Summary);
    
    expect(screen.queryByText(/assessment team:/i)).not.toBeInTheDocument();
  });

  it('renders a Dimensions Assessment table', () => {
    render(Summary);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /dimensions assessment/i })).toBeInTheDocument();
  });

  it('table has correct column headers', () => {
    render(Summary);
    
    expect(screen.getByRole('columnheader', { name: /dimension/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /maturity level/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /proof points/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /completion/i })).toBeInTheDocument();
  });

  it('table has rows for all 7 dimensions', () => {
    render(Summary);
    
    const rows = screen.getAllByRole('row');
    // 1 header row + 7 dimension rows
    expect(rows.length).toBe(8);
  });

  it('shows Detailed Findings section', () => {
    render(Summary);
    
    expect(screen.getByRole('heading', { name: /detailed findings/i })).toBeInTheDocument();
  });

  it('shows "Not Assessed" for dimensions without maturity level', () => {
    render(Summary);
    
    const notAssessed = screen.getAllByText(/not assessed/i);
    expect(notAssessed.length).toBeGreaterThan(0);
  });

  it('shows overall maturity when some dimensions are assessed', () => {
    assessmentStore.setMaturityLevel('communications', 'launch');
    assessmentStore.setMaturityLevel('procurement', 'integrate');
    
    render(Summary);
    
    expect(screen.getByRole('heading', { name: /overall maturity level/i })).toBeInTheDocument();
  });

  it('does not show overall maturity when no dimensions assessed', () => {
    render(Summary);
    
    expect(screen.queryByRole('heading', { name: /overall maturity level/i })).not.toBeInTheDocument();
  });

  it('renders Export as JSON button', () => {
    render(Summary);
    
    expect(screen.getByRole('button', { name: /export as json/i })).toBeInTheDocument();
  });

  it('renders Print/Save as PDF button', () => {
    render(Summary);
    
    expect(screen.getByRole('button', { name: /print\/save as pdf/i })).toBeInTheDocument();
  });

  it('Print/PDF button calls window.print()', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    
    render(Summary);
    
    const printBtn = screen.getByRole('button', { name: /print\/save as pdf/i });
    await fireEvent.click(printBtn);
    
    expect(printSpy).toHaveBeenCalled();
  });

  it('Export JSON button calls exportData', async () => {
    const exportSpy = vi.spyOn(assessmentStore, 'exportData').mockReturnValue('{}');
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    
    render(Summary);
    
    const exportBtn = screen.getByRole('button', { name: /export as json/i });
    await fireEvent.click(exportBtn);
    
    expect(exportSpy).toHaveBeenCalled();
  });

  it('shows proof point notes when evidence is present', () => {
    assessmentStore.toggleProofPoint('communications', 'comm-1');
    assessmentStore.updateProofPointEvidence('communications', 'comm-1', 'Evidence doc URL');
    
    render(Summary);
    
    expect(screen.getByText(/evidence: evidence doc url/i)).toBeInTheDocument();
  });

  it('shows dimension notes when present', () => {
    assessmentStore.updateDimension('communications', { notes: 'Important notes here' });
    
    render(Summary);
    
    expect(screen.getByText(/important notes here/i)).toBeInTheDocument();
  });

  it('section has accessible aria-labelledby', () => {
    render(Summary);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'summary-heading');
  });
});
