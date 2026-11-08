import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Introduction from '../components/Introduction.svelte';

describe('Introduction Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the introduction heading', () => {
    render(Introduction);
    
    expect(screen.getByRole('heading', { name: /about the amm/i })).toBeInTheDocument();
  });

  it('is expanded by default', () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows content when expanded', () => {
    render(Introduction);
    
    expect(screen.getByText(/adaptable framework for measuring how/i)).toBeInTheDocument();
  });

  it('collapses when toggle button is clicked', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
    await fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('hides content when collapsed', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
    await fireEvent.click(toggle);
    
    expect(screen.queryByText(/adaptable framework for measuring how/i)).not.toBeInTheDocument();
  });

  it('re-expands when toggle button is clicked again', async () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
    await fireEvent.click(toggle);
    await fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/adaptable framework for measuring how/i)).toBeInTheDocument();
  });

  it('toggle button has aria-controls attribute', () => {
    render(Introduction);
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
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
    
    const specLink = screen.getByRole('link', { name: /accessibility maturity model group note/i });
    expect(specLink).toBeInTheDocument();
    expect(specLink).toHaveAttribute('href', 'https://www.w3.org/TR/maturity-model/');
    expect(specLink).toHaveAttribute('target', '_blank');
    expect(specLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external links have screen reader text indicating new tab', () => {
    render(Introduction);

    const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link.textContent).toMatch(/opens in a new tab/i);
    });
  });

  it('states what the tool is not, including W3C endorsement and conformance', () => {
    render(Introduction);

    expect(screen.getByText(/not endorsed by w3c or its members/i)).toBeInTheDocument();
    expect(screen.getByText(/conformance test, audit, certification/i)).toBeInTheDocument();
    expect(screen.getByText(/not a w3c recommendation or a standard/i)).toBeInTheDocument();
  });

  it('discloses that the content also follows the editor\'s draft', () => {
    render(Introduction);

    expect(screen.getAllByText(/editor's draft/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/30 September 2026/).length).toBeGreaterThan(0);
    expect(screen.getByText(/goes beyond the Note/i)).toBeInTheDocument();
  });

  it('names where the tool differs from the published Group Note', () => {
    render(Introduction);

    expect(screen.getByText(/where this differs from the group note/i)).toBeInTheDocument();
    expect(screen.getByText(/governance and oversight/i)).toBeInTheDocument();
    expect(screen.getByText(/continuity additions/i)).toBeInTheDocument();
  });

  it('describes four maturity levels, not five', () => {
    render(Introduction);

    expect(screen.getByText(/four maturity levels: inactive, launch, integrate, and optimize/i)).toBeInTheDocument();
    expect(screen.queryByText(/five maturity levels/i)).not.toBeInTheDocument();
  });

  it('lists five reasons to use the model', () => {
    render(Introduction);

    expect(screen.getByText(/structured assessment/i)).toBeInTheDocument();
    expect(screen.getByText(/shared language/i)).toBeInTheDocument();
    expect(screen.getByText(/progress tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/^planning:/i)).toBeInTheDocument();
    expect(screen.getByText(/^communication:/i)).toBeInTheDocument();
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

  it('can render as always-open page content', () => {
    render(Introduction, { props: { toggleable: false } });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /about the amm/i })).toBeInTheDocument();
    expect(screen.getByText(/adaptable framework for measuring how/i)).toBeInTheDocument();
    expect(screen.getByText(/what this tool is, and is not/i)).toBeInTheDocument();
  });

  it('states that it was initially developed against the Group Note', () => {
    render(Introduction);

    expect(screen.getByText(/initially developed against that Group Note/i)).toBeInTheDocument();
  });

  it('uses a heading that contains the disclosure button', () => {
    render(Introduction);

    const heading = screen.getByRole('heading', { level: 2, name: /about the amm/i });
    expect(heading.querySelector('button')).not.toBeNull();
    expect(heading.parentElement?.tagName).not.toBe('BUTTON');
  });

  it('toggle icon changes between − and + states', async () => {
    render(Introduction);
    
    // When expanded the icon shows '−'
    expect(document.querySelector('.toggle-icon')?.textContent).toBe('−');
    
    const toggle = screen.getByRole('button', { name: /about the amm/i });
    await fireEvent.click(toggle);
    
    // When collapsed the icon shows '+'
    expect(document.querySelector('.toggle-icon')?.textContent).toBe('+');
  });
});
