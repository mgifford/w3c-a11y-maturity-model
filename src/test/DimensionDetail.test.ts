import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import DimensionDetail from '../components/DimensionDetail.svelte';
import { assessmentStore } from '../stores/assessmentStore';

describe('DimensionDetail Component - Form Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
  });

  it('renders dimension detail with proof points', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Use getAllByRole since the dimension name appears in both the h2 and category headings
    const headings = screen.getAllByRole('heading', { name: /communications/i });
    expect(headings.length).toBeGreaterThan(0);
    // Check for the "Proof Points" section heading specifically
    expect(screen.getByRole('heading', { name: /^proof points$/i })).toBeInTheDocument();
  });

  it('allows setting proof point status to in-progress', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Find the first "In Progress" button
    const inProgressButtons = screen.getAllByRole('button', { name: /mark as in progress/i });
    expect(inProgressButtons.length).toBeGreaterThan(0);
    
    await fireEvent.click(inProgressButtons[0]);
    
    // Button should show pressed state
    expect(inProgressButtons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('allows setting proof point status to planned', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const plannedButtons = screen.getAllByRole('button', { name: /mark as planned/i });
    expect(plannedButtons.length).toBeGreaterThan(0);
    
    await fireEvent.click(plannedButtons[0]);
    
    expect(plannedButtons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('allows setting proof point status to completed', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const completedButtons = screen.getAllByRole('button', { name: /mark as completed/i });
    expect(completedButtons.length).toBeGreaterThan(0);
    
    await fireEvent.click(completedButtons[0]);
    
    expect(completedButtons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('allows selecting maturity level', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Find maturity level radio buttons
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(4); // Inactive, Launch, Integrate, Optimize
    
    const launchRadio = screen.getByRole('radio', { name: /launch/i }) as HTMLInputElement;
    expect(launchRadio.checked).toBe(false);
    
    await fireEvent.click(launchRadio);
    
    expect(launchRadio.checked).toBe(true);
  });

  it('allows marking proof point as not applicable', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // N/A buttons have text "N/A" and title "Mark as not applicable"
    const naButtons = screen.getAllByTitle(/mark as not applicable/i);
    expect(naButtons.length).toBeGreaterThan(0);
    
    const firstNAButton = naButtons[0];
    await fireEvent.click(firstNAButton);
    
    // Button should show pressed state
    expect(firstNAButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables status buttons when marked not applicable', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const inProgressButtons = screen.getAllByRole('button', { name: /mark as in progress/i });
    const naButtons = screen.getAllByTitle(/mark as not applicable/i);
    
    const firstInProgressButton = inProgressButtons[0] as HTMLButtonElement;
    const firstNAButton = naButtons[0];
    
    expect(firstInProgressButton.disabled).toBe(false);
    
    await fireEvent.click(firstNAButton);
    
    // Status buttons should now be disabled
    expect(firstInProgressButton.disabled).toBe(true);
  });

  it('shows evidence textarea when proof point is completed', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const completedButtons = screen.getAllByRole('button', { name: /mark as completed/i });
    
    // Initially no evidence textarea visible
    let evidenceTextareas = screen.queryAllByRole('textbox', { name: /evidence/i });
    const initialCount = evidenceTextareas.length;
    
    // Mark the first proof point as completed
    await fireEvent.click(completedButtons[0]);
    
    // Evidence textarea should now be visible
    evidenceTextareas = screen.queryAllByRole('textbox', { name: /evidence/i });
    expect(evidenceTextareas.length).toBeGreaterThan(initialCount);
  });

  it('allows entering evidence text', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Mark first proof point as completed
    const completedButtons = screen.getAllByRole('button', { name: /mark as completed/i });
    await fireEvent.click(completedButtons[0]);
    
    // Find evidence textarea
    const evidenceTextareas = screen.getAllByRole('textbox', { name: /evidence/i });
    const textarea = evidenceTextareas[0] as HTMLTextAreaElement;
    
    const evidenceText = 'Policy document on SharePoint';
    await fireEvent.input(textarea, { target: { value: evidenceText } });
    
    expect(textarea.value).toBe(evidenceText);
  });

  it('allows entering dimension notes', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const notesTextarea = screen.getByRole('textbox', { name: /additional notes/i }) as HTMLTextAreaElement;
    
    const notes = 'Need to improve internal communications';
    await fireEvent.input(notesTextarea, { target: { value: notes } });
    
    expect(notesTextarea.value).toBe(notes);
  });

  it('has accessible back button', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const backButton = screen.getByRole('button', { name: /back to dimension list/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('aria-label');
  });

  it('displays completion percentage', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Should show completion status
    expect(screen.getByText(/completion:/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has proper form labels', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Check maturity level group has label
    const maturityGroup = screen.getByRole('group', { name: /select maturity level/i });
    expect(maturityGroup).toBeInTheDocument();
    
    // Check that it has labelledby attribute
    expect(maturityGroup).toHaveAttribute('aria-labelledby', 'maturity-heading');
  });

  it('status button groups have accessible labels', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Each status button group should have aria-label
    const statusGroups = screen.getAllByRole('group', { name: /status for:/i });
    expect(statusGroups.length).toBeGreaterThan(0);
    statusGroups.forEach(group => {
      expect(group).toHaveAttribute('aria-label');
    });
  });

  it('displays help text for proof points', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    expect(screen.getByText(/set the status of each proof point/i)).toBeInTheDocument();
  });

  it('N/A button has proper ARIA attributes', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const naButtons = screen.getAllByTitle(/mark as not applicable/i);
    
    naButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed');
      expect(button).toHaveAttribute('title');
    });
  });

  it('save and return button is accessible and clickable', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const saveButton = screen.getByRole('button', { name: /save and return to overview/i });
    expect(saveButton).toBeInTheDocument();
    
    // Clicking should not throw an error
    await expect(fireEvent.click(saveButton)).resolves.toBeTruthy();
  });

  it('shows error when dimension not found', () => {
    render(DimensionDetail, { props: { dimensionId: 'nonexistent-id' } });
    
    expect(screen.getByText(/dimension not found/i)).toBeInTheDocument();
  });
});
