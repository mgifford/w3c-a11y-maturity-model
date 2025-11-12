import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import DimensionDetail from '../components/DimensionDetail.svelte';

describe('DimensionDetail Component - Form Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders dimension detail with proof points', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    expect(screen.getByRole('heading', { name: /communications/i })).toBeInTheDocument();
    expect(screen.getByText(/proof points/i)).toBeInTheDocument();
  });

  it('allows checking proof point checkbox', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Find first checkbox
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    
    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    expect(firstCheckbox.checked).toBe(false);
    
    await fireEvent.click(firstCheckbox);
    
    // Check should be updated (via store)
    expect(firstCheckbox.checked).toBe(true);
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
    
    // Find N/A buttons
    const naButtons = screen.getAllByRole('button', { name: /mark as not applicable/i });
    expect(naButtons.length).toBeGreaterThan(0);
    
    const firstNAButton = naButtons[0];
    await fireEvent.click(firstNAButton);
    
    // Button should show pressed state
    expect(firstNAButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables checkbox when marked not applicable', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const checkboxes = screen.getAllByRole('checkbox');
    const naButtons = screen.getAllByRole('button', { name: /mark as not applicable/i });
    
    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    const firstNAButton = naButtons[0];
    
    expect(firstCheckbox.disabled).toBe(false);
    
    await fireEvent.click(firstNAButton);
    
    // Checkbox should now be disabled
    expect(firstCheckbox.disabled).toBe(true);
  });

  it('shows evidence textarea when proof point is completed', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const checkboxes = screen.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[0];
    
    // Initially no evidence textarea visible
    let evidenceTextareas = screen.queryAllByRole('textbox', { name: /evidence/i });
    const initialCount = evidenceTextareas.length;
    
    // Check the proof point
    await fireEvent.click(firstCheckbox);
    
    // Evidence textarea should now be visible
    evidenceTextareas = screen.queryAllByRole('textbox', { name: /evidence/i });
    expect(evidenceTextareas.length).toBeGreaterThan(initialCount);
  });

  it('allows entering evidence text', async () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    // Check first proof point
    const checkboxes = screen.getAllByRole('checkbox');
    await fireEvent.click(checkboxes[0]);
    
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

  it('proof point checkboxes have descriptions', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Each checkbox should have aria-describedby
    checkboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('aria-describedby');
    });
  });

  it('displays help text for proof points', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    expect(screen.getByText(/check off proof points that your organization has completed/i)).toBeInTheDocument();
  });

  it('N/A button has proper ARIA attributes', () => {
    render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    const naButtons = screen.getAllByRole('button', { pressed: false });
    
    naButtons.forEach(button => {
      if (button.textContent?.includes('N/A')) {
        expect(button).toHaveAttribute('aria-pressed');
        expect(button).toHaveAttribute('title');
      }
    });
  });

  it('saves and returns to overview on button click', async () => {
    const { component } = render(DimensionDetail, { props: { dimensionId: 'communications' } });
    
    let backEventFired = false;
    component.$on('back', () => {
      backEventFired = true;
    });
    
    const saveButton = screen.getByRole('button', { name: /save and return to overview/i });
    await fireEvent.click(saveButton);
    
    expect(backEventFired).toBe(true);
  });
});
