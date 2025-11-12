import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import OrganizationInfo from '../components/OrganizationInfo.svelte';

describe('OrganizationInfo Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders organization name input', () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/organization name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('renders assessor input and add button', () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/assessment team members/i);
    const addButton = screen.getByRole('button', { name: /add team member/i });
    
    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('allows entering organization name', async () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/organization name/i) as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'Test Organization' } });
    
    expect(input.value).toBe('Test Organization');
  });

  it('adds assessor to list when clicking add button', async () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/assessment team members/i) as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /add team member/i });
    
    await fireEvent.input(input, { target: { value: 'John Doe' } });
    await fireEvent.click(addButton);
    
    // Check that assessor appears in list
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check that input is cleared
    expect(input.value).toBe('');
  });

  it('adds assessor on Enter key', async () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/assessment team members/i) as HTMLInputElement;
    
    await fireEvent.input(input, { target: { value: 'Jane Smith' } });
    await fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('removes assessor from list', async () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/assessment team members/i) as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /add team member/i });
    
    // Add an assessor
    await fireEvent.input(input, { target: { value: 'Test User' } });
    await fireEvent.click(addButton);
    
    // Find and click remove button
    const removeButton = screen.getByRole('button', { name: /remove test user/i });
    await fireEvent.click(removeButton);
    
    // Assessor should be removed
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(OrganizationInfo);
    
    // Check section has labelledby
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'org-info-heading');
    
    // Check assessor input has describedby
    const input = screen.getByLabelText(/assessment team members/i);
    expect(input).toHaveAttribute('aria-describedby', 'assessor-help');
    
    // Check help text exists
    expect(screen.getByText(/press enter or click add/i)).toBeInTheDocument();
  });

  it('has accessible list for assessors', async () => {
    render(OrganizationInfo);
    
    const input = screen.getByLabelText(/assessment team members/i) as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /add team member/i });
    
    await fireEvent.input(input, { target: { value: 'User 1' } });
    await fireEvent.click(addButton);
    
    // Check list has role and aria-label
    const list = screen.getByRole('list', { name: /assessment team members/i });
    expect(list).toBeInTheDocument();
    
    // Check list items
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });
});
