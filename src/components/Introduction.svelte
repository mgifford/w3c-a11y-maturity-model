<script lang="ts">
  let isExpanded = true;
  
  function toggleIntro() {
    isExpanded = !isExpanded;
  }
</script>

<div class="introduction" aria-labelledby="intro-heading">
  <button 
    class="intro-toggle" 
    on:click={toggleIntro}
    aria-expanded={isExpanded}
    aria-controls="intro-content"
  >
    <h2 id="intro-heading">
      About the W3C Accessibility Maturity Model
      <span class="toggle-icon" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
    </h2>
  </button>
  
  {#if isExpanded}
    <div id="intro-content" class="intro-content">
      <p>
        The <strong>W3C Accessibility Maturity Model</strong> helps organizations systematically assess 
        and improve their digital accessibility practices. This tool guides you through a comprehensive 
        evaluation across seven key dimensions of organizational accessibility.
      </p>
      
      <h3>Why Use This Model?</h3>
      <ul>
        <li><strong>Structured Assessment:</strong> Evaluate your organization's accessibility maturity across multiple dimensions</li>
        <li><strong>Actionable Insights:</strong> Identify strengths and areas for improvement with specific proof points</li>
        <li><strong>Progress Tracking:</strong> Measure advancement through five maturity levels from Initial to Sustained</li>
        <li><strong>Strategic Planning:</strong> Build a roadmap for enhancing accessibility throughout your organization</li>
        <li><strong>Stakeholder Communication:</strong> Generate clear visualizations and reports for leadership</li>
      </ul>

      <h3>Learn More</h3>
      <ul class="resource-links">
        <li>
          <a 
            href="https://www.w3.org/TR/maturity-model/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            W3C Accessibility Maturity Model Specification
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </li>
        <li>
          <a 
            href="https://www.w3.org/WAI/planning/statements/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Accessibility Statements Generator
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </li>
        <li>
          <a 
            href="https://www.w3.org/WAI/planning-and-managing/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Planning and Managing Web Accessibility
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </li>
        <li>
          <a 
            href="https://www.w3.org/WAI/fundamentals/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Accessibility Fundamentals Overview
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </li>
      </ul>

      <div class="quick-start">
        <h3>Getting Started</h3>
        <ol>
          <li>Enter your organization information below</li>
          <li>Review each of the seven dimensions</li>
          <li>Mark applicable proof points for your organization</li>
          <li>Select your current maturity level for each dimension</li>
          <li>View your results and generate a comprehensive report</li>
        </ol>
      </div>
    </div>
  {/if}
</div>

<style>
  .introduction {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .intro-toggle {
    width: 100%;
    background: none;
    border: none;
    padding: 1.5rem;
    cursor: pointer;
    color: white;
    text-align: left;
    transition: background-color 0.2s;
  }

  .intro-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .intro-toggle:focus {
    outline: 3px solid #ffd700;
    outline-offset: -3px;
  }

  .intro-toggle h2 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
  }

  .toggle-icon {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
  }

  .intro-content {
    padding: 0 1.5rem 1.5rem;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .intro-content p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .intro-content h3 {
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 0.5rem;
  }

  .intro-content ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .intro-content li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .resource-links {
    list-style: none;
    padding-left: 0;
  }

  .resource-links li {
    margin-bottom: 0.75rem;
  }

  .resource-links a {
    color: #ffd700;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
    padding-bottom: 2px;
  }

  .resource-links a:hover {
    border-bottom-color: #ffd700;
  }

  .resource-links a:focus {
    outline: 3px solid #ffd700;
    outline-offset: 2px;
    border-radius: 2px;
  }

  .quick-start {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1.5rem;
  }

  .quick-start h3 {
    margin-top: 0;
    border-bottom: none;
  }

  .quick-start ol {
    margin: 0.5rem 0 0;
    padding-left: 1.5rem;
  }

  .quick-start li {
    margin-bottom: 0.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    @keyframes slideDown {
      from, to {
        opacity: 1;
        transform: none;
      }
    }
  }

  @media (max-width: 768px) {
    .intro-toggle h2 {
      font-size: 1.25rem;
    }

    .intro-content p {
      font-size: 1rem;
    }

    .intro-content h3 {
      font-size: 1.1rem;
    }
  }
</style>
