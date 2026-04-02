import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Introduction from '../components/Introduction.svelte';

describe('Introduction Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the introduction heading', () => {
    render(Introduction);
    
    expect(screen.getByRole('heading', { name: /about the w3c accessibility maturity model/i })).toBeInTheDocument();
  });

  it('is expanded by default', () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows content when expanded', () => {
    render(Introduction);
    
    expect(screen.getByText(/helps organizations systematically assess/i)).toBeInTheDocument();
  });

  it('collapses when toggle button is clicked', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    await fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('hides content when collapsed', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    await fireEvent.click(toggle);
    
    expect(screen.queryByText(/helps organizations systematically assess/i)).not.toBeInTheDocument();
  });

  it('re-expands when toggle button is clicked again', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    await fireEvent.click(toggle);
    await fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/helps organizations systematically assess/i)).toBeInTheDocument();
  });

  it('toggle button has aria-controls attribute', () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    expect(toggle).toHaveAttribute('aria-controls', 'intro-content');
  });

  it('displays Why Use This Model section', () => {
    render(Introduction);
    
    expect(screen.getByRole('heading', { name: /why use this model/i })).toBeInTheDocument();
  });

  it('displays Getting Started section', () => {
    render(Introduction);
    
    expect(screen.getByRole('heading', { name: /getting started/i })).toBeInTheDocument();
  });

  it('displays links to W3C resources', () => {
    render(Introduction);
    
    const specLink = screen.getByRole('link', { name: /w3c accessibility maturity model specification/i });
    expect(specLink).toBeInTheDocument();
    expect(specLink).toHaveAttribute('href', 'https://www.w3.org/TR/maturity-model/');
    expect(specLink).toHaveAttribute('target', '_blank');
    expect(specLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external links have screen reader text indicating new tab', () => {
    render(Introduction);
    
    const srOnlyTexts = document.querySelectorAll('.sr-only');
    expect(srOnlyTexts.length).toBeGreaterThan(0);
    srOnlyTexts.forEach(el => {
      expect(el.textContent).toMatch(/opens in new tab/i);
    });
  });

  it('lists five reasons to use the model', () => {
    render(Introduction);
    
    expect(screen.getByText(/structured assessment/i)).toBeInTheDocument();
    expect(screen.getByText(/actionable insights/i)).toBeInTheDocument();
    expect(screen.getByText(/progress tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/strategic planning/i)).toBeInTheDocument();
    expect(screen.getByText(/stakeholder communication/i)).toBeInTheDocument();
  });

  it('getting started has ordered list with five steps', () => {
    render(Introduction);
    
    // Find the ordered list inside the quick-start section
    const lists = screen.getAllByRole('list');
    // Find the ordered list (ol)
    const ols = Array.from(document.querySelectorAll('ol'));
    expect(ols.length).toBeGreaterThan(0);
    const steps = ols[0].querySelectorAll('li');
    expect(steps.length).toBe(5);
  });

  it('toggle icon changes between − and + states', async () => {
    render(Introduction);
    
    // When expanded the icon shows '−'
    expect(document.querySelector('.toggle-icon')?.textContent).toBe('−');
    
    const toggle = screen.getByRole('button', { name: /about the w3c accessibility maturity model/i });
    await fireEvent.click(toggle);
    
    // When collapsed the icon shows '+'
    expect(document.querySelector('.toggle-icon')?.textContent).toBe('+');
  });
});
