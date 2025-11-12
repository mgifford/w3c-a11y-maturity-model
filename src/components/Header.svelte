<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';

  function handleReset() {
    if (confirm('Are you sure you want to start a new assessment? This will clear all current data.')) {
      assessmentStore.reset();
    }
  }

  function handleExport() {
    const data = assessmentStore.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `a11y-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const success = assessmentStore.importData(content);
          if (success) {
            alert('Assessment data imported successfully!');
          } else {
            alert('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <h1>W3C Accessibility Maturity Model</h1>
      <p class="tagline">Assessment Tool</p>
    </div>
    <nav class="header-actions" aria-label="Main actions">
      <button on:click={handleExport} class="btn btn-secondary" title="Export assessment data">
        <span aria-hidden="true">📥</span> Export
      </button>
      <button on:click={handleImport} class="btn btn-secondary" title="Import assessment data">
        <span aria-hidden="true">📤</span> Import
      </button>
      <button on:click={handleReset} class="btn btn-danger" title="Reset and start new assessment">
        <span aria-hidden="true">🔄</span> New Assessment
      </button>
    </nav>
  </div>
</header>

<style>
  .header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    padding: 2rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .header-content h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
  }

  .tagline {
    margin-top: 0.25rem;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .header-actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-secondary {
    background-color: #3498db;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
  }

  .btn-danger {
    background-color: #e74c3c;
    color: white;
  }

  .btn-danger:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .header-content h1 {
      font-size: 1.5rem;
    }

    .tagline {
      font-size: 1rem;
    }

    .header-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
