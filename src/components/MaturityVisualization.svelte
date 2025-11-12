<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import type { Dimension, MaturityLevel } from '../types';
  import { MATURITY_LEVELS } from '../types';

  $: dimensions = $assessmentStore.dimensions;
  
  // Convert maturity level to numeric value for visualization
  function getMaturityValue(level: MaturityLevel | null): number {
    if (!level) return 0;
    const index = MATURITY_LEVELS.findIndex(l => l.level === level);
    return index + 1; // 1-4 scale
  }

  // Get color for maturity level
  function getColor(level: MaturityLevel | null): string {
    if (!level) return '#e0e0e0';
    switch(level) {
      case 'Inactive': return '#f44336';
      case 'Launch': return '#ff9800';
      case 'Integrate': return '#2196f3';
      case 'Optimize': return '#4caf50';
      default: return '#e0e0e0';
    }
  }

  // Calculate SVG coordinates for radar chart
  function getRadarPoints(): string {
    if (!dimensions || dimensions.length === 0) return '';
    
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;
    const angleStep = (2 * Math.PI) / dimensions.length;

    const points = dimensions.map((dim, index) => {
      const value = getMaturityValue(dim.maturityLevel);
      const radius = (value / 4) * maxRadius; // Scale to 0-4 range
      const angle = angleStep * index - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    });

    return points.join(' ');
  }

  // Get axis lines for radar chart
  function getAxisLines(): Array<{x1: number, y1: number, x2: number, y2: number, label: string, labelX: number, labelY: number}> {
    if (!dimensions || dimensions.length === 0) return [];
    
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 130;
    const angleStep = (2 * Math.PI) / dimensions.length;

    return dimensions.map((dim, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x2 = centerX + maxRadius * Math.cos(angle);
      const y2 = centerY + maxRadius * Math.sin(angle);
      const labelX = centerX + (maxRadius + 30) * Math.cos(angle);
      const labelY = centerY + (maxRadius + 30) * Math.sin(angle);
      
      return {
        x1: centerX,
        y1: centerY,
        x2,
        y2,
        label: dim.name,
        labelX,
        labelY
      };
    });
  }

  // Calculate proof point statistics
  $: proofPointStats = dimensions ? {
    completed: dimensions.reduce((sum, d) => sum + d.proofPoints.filter(pp => pp.completed && !pp.notApplicable).length, 0),
    total: dimensions.reduce((sum, d) => sum + d.proofPoints.filter(pp => !pp.notApplicable).length, 0)
  } : {
    completed: 0,
    total: 0
  };

  // Calculate overall statistics
  $: stats = dimensions ? {
    total: dimensions.length,
    assessed: dimensions.filter(d => d.maturityLevel).length,
    inactive: dimensions.filter(d => d.maturityLevel === 'Inactive').length,
    launch: dimensions.filter(d => d.maturityLevel === 'Launch').length,
    integrate: dimensions.filter(d => d.maturityLevel === 'Integrate').length,
    optimize: dimensions.filter(d => d.maturityLevel === 'Optimize').length,
    avgMaturity: dimensions.filter(d => d.maturityLevel).length > 0
      ? (dimensions.reduce((sum, d) => sum + getMaturityValue(d.maturityLevel), 0) / dimensions.filter(d => d.maturityLevel).length).toFixed(1)
      : '0.0'
  } : {
    total: 0,
    assessed: 0,
    inactive: 0,
    launch: 0,
    integrate: 0,
    optimize: 0,
    avgMaturity: '0.0'
  };

  $: radarPoints = getRadarPoints();
  $: axisLines = getAxisLines();
</script>

<div class="visualization-container">
  <h2>Maturity Assessment Visualization</h2>
  
  <!-- Statistics Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{stats.assessed}/{stats.total}</div>
      <div class="stat-label">Dimensions Assessed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{stats.avgMaturity}</div>
      <div class="stat-label">Average Maturity</div>
      <div class="stat-sublabel">(out of 4.0)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{proofPointStats.completed}/{proofPointStats.total}</div>
      <div class="stat-label">Proof Points</div>
      <div class="stat-sublabel">({proofPointStats.total > 0 ? Math.round((proofPointStats.completed / proofPointStats.total) * 100) : 0}% complete)</div>
    </div>
  </div>

  <!-- Maturity Level Staircase (like DAMM) -->
  {#if stats.assessed > 0}
    <div class="staircase-section">
      <h3>Maturity Progression</h3>
      <p class="section-description">Visual representation of your organization's accessibility maturity levels</p>
      <div class="staircase-container">
        {#each MATURITY_LEVELS as level, index}
          {@const count = stats[level.level.toLowerCase()]}
          {@const height = 60 + (index * 40)}
          <div class="staircase-step" style="height: {height}px;">
            <div class="step-content" style="background-color: {getColor(level.level)};">
              <div class="step-level">{level.level}</div>
              <div class="step-count">{count} dimension{count !== 1 ? 's' : ''}</div>
            </div>
            <div class="step-label">{level.description}</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Maturity Level Distribution -->
  <div class="distribution-section">
    <h3>Maturity Level Distribution</h3>
    <div class="distribution-bars">
      {#each MATURITY_LEVELS as level}
        {@const count = stats[level.level.toLowerCase()]}
        {@const percentage = stats.assessed > 0 ? (count / stats.assessed) * 100 : 0}
        <div class="distribution-item">
          <div class="distribution-label">
            <span class="level-badge" style="background-color: {getColor(level.level)}">{level.level}</span>
            <span class="count">({count})</span>
          </div>
          <div class="distribution-bar-container">
            <div 
              class="distribution-bar" 
              style="width: {percentage}%; background-color: {getColor(level.level)}"
            >
              {#if percentage > 5}
                <span class="percentage-label">{percentage.toFixed(0)}%</span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Radar Chart -->
  {#if stats.assessed > 0}
    <div class="radar-section">
      <h3>Maturity Radar Chart</h3>
      <div class="radar-container">
        <svg viewBox="0 0 300 300" class="radar-chart">
          <!-- Background circles -->
          {#each [1, 2, 3, 4] as level}
            <circle
              cx="150"
              cy="150"
              r={level * 30}
              fill="none"
              stroke="#e0e0e0"
              stroke-width="1"
            />
            <text
              x="155"
              y={150 - level * 30 + 4}
              class="level-text"
            >
              {level}
            </text>
          {/each}

          <!-- Axis lines and labels -->
          {#each axisLines as axis}
            <line
              x1={axis.x1}
              y1={axis.y1}
              x2={axis.x2}
              y2={axis.y2}
              stroke="#cccccc"
              stroke-width="1"
            />
            <text
              x={axis.labelX}
              y={axis.labelY}
              text-anchor="middle"
              class="axis-label"
            >
              {axis.label}
            </text>
          {/each}

          <!-- Data polygon -->
          <polygon
            points={radarPoints}
            fill="rgba(33, 150, 243, 0.3)"
            stroke="#2196f3"
            stroke-width="2"
          />

          <!-- Data points -->
          {#each dimensions as dim, index}
            {@const value = getMaturityValue(dim.maturityLevel)}
            {@const centerX = 150}
            {@const centerY = 150}
            {@const maxRadius = 120}
            {@const angleStep = (2 * Math.PI) / dimensions.length}
            {@const angle = angleStep * index - Math.PI / 2}
            {@const radius = (value / 4) * maxRadius}
            {@const x = centerX + radius * Math.cos(angle)}
            {@const y = centerY + radius * Math.sin(angle)}
            
            {#if dim.maturityLevel}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={getColor(dim.maturityLevel)}
                stroke="white"
                stroke-width="2"
              />
            {/if}
          {/each}
        </svg>
      </div>
      <div class="legend">
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #f44336"></span> Inactive (1)
        </div>
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #ff9800"></span> Launch (2)
        </div>
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #2196f3"></span> Integrate (3)
        </div>
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #4caf50"></span> Optimize (4)
        </div>
      </div>
    </div>
  {/if}

  <!-- Dimension Progress Bars with Proof Points -->
  <div class="dimension-bars-section">
    <h3>Progress by Dimension</h3>
    <p class="section-description">Maturity level and proof point completion for each dimension</p>
    <div class="dimension-bars">
      {#each dimensions as dim}
        {@const value = getMaturityValue(dim.maturityLevel)}
        {@const maturityPercentage = (value / 4) * 100}
        {@const proofPointsCompleted = dim.proofPoints.filter(pp => pp.completed && !pp.notApplicable).length}
        {@const proofPointsTotal = dim.proofPoints.filter(pp => !pp.notApplicable).length}
        {@const proofPointPercentage = proofPointsTotal > 0 ? (proofPointsCompleted / proofPointsTotal) * 100 : 0}
        
        <div class="dimension-bar-item">
          <div class="dimension-bar-header">
            <span class="dimension-name">{dim.name}</span>
            <div class="dimension-stats">
              <span class="dimension-level" style="color: {getColor(dim.maturityLevel)}">
                {dim.maturityLevel || 'Not Assessed'}
              </span>
              <span class="proof-point-count">
                {proofPointsCompleted}/{proofPointsTotal} proof points
              </span>
            </div>
          </div>
          
          <!-- Maturity Level Bar -->
          <div class="bar-row">
            <span class="bar-label">Maturity:</span>
            <div class="progress-bar-container">
              <div 
                class="progress-bar maturity-bar" 
                style="width: {maturityPercentage}%; background-color: {getColor(dim.maturityLevel)}"
              >
                {#if maturityPercentage > 10}
                  <span class="bar-text">{Math.round(maturityPercentage)}%</span>
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Proof Points Bar -->
          <div class="bar-row">
            <span class="bar-label">Proof Points:</span>
            <div class="progress-bar-container">
              <div 
                class="progress-bar proof-bar" 
                style="width: {proofPointPercentage}%; background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)"
              >
                {#if proofPointPercentage > 10}
                  <span class="bar-text">{Math.round(proofPointPercentage)}%</span>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .visualization-container {
    margin: 2rem 0;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  h3 {
    color: #34495e;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 1rem;
    opacity: 0.9;
  }

  .stat-sublabel {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-top: 0.25rem;
  }

  .distribution-section, .radar-section, .dimension-bars-section {
    margin-top: 2rem;
  }

  .distribution-bars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .distribution-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .distribution-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }

  .level-badge {
    display: inline-block;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .count {
    color: #666;
    font-size: 0.9rem;
  }

  .distribution-bar-container {
    height: 30px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .distribution-bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    transition: width 0.3s ease;
  }

  .percentage-label {
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .radar-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .radar-chart {
    width: 100%;
    height: auto;
  }

  .level-text {
    font-size: 10px;
    fill: #999;
  }

  .axis-label {
    font-size: 11px;
    fill: #333;
    font-weight: 500;
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .legend-marker {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }

  .section-description {
    color: #666;
    font-size: 0.95rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }

  /* Staircase Visualization */
  .staircase-section {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
    border-radius: 8px;
  }

  .staircase-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    gap: 1rem;
    padding: 2rem 1rem;
    min-height: 300px;
  }

  .staircase-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .staircase-step:hover {
    transform: translateY(-5px);
  }

  .step-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    gap: 0.5rem;
  }

  .step-level {
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
  }

  .step-count {
    font-size: 1.5rem;
    font-weight: 800;
  }

  .step-label {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: #666;
    text-align: center;
    max-width: 150px;
    line-height: 1.3;
  }

  /* Dimension Bars */
  .dimension-bars {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .dimension-bar-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .dimension-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .dimension-name {
    font-weight: 700;
    color: #2c3e50;
    font-size: 1.05rem;
    flex: 1;
  }

  .dimension-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .dimension-level {
    font-weight: 700;
    font-size: 0.95rem;
  }

  .proof-point-count {
    font-size: 0.85rem;
    color: #666;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .bar-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
    min-width: 90px;
  }

  .progress-bar-container {
    flex: 1;
    height: 24px;
    background: #e9ecef;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }

  .progress-bar {
    height: 100%;
    transition: width 0.5s ease;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
  }

  .bar-text {
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    .visualization-container {
      padding: 1rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    .stat-value {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .legend {
      gap: 1rem;
    }

    .staircase-container {
      flex-wrap: wrap;
      min-height: auto;
    }

    .staircase-step {
      min-width: 120px;
    }

    .bar-row {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .bar-label {
      min-width: auto;
    }
  }
</style>
