<script lang="ts">
  import LogoUrl from '../assets/accessibility-maturity-model-logo.svg';
  import { MODEL } from '../lib/maturity';
</script>

<div class="brand">
  <img src={LogoUrl} alt="" class="logo" width="48" height="48" />
  <div class="titles">
    <h1>{MODEL.name}</h1>
    <p class="tagline">Assessment Tool</p>
  </div>
</div>

<style>
  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    display: block;
    flex: none;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
    color: var(--color-header-text);
  }

  .titles {
    display: flex;
    flex-direction: column;
  }

  .tagline {
    margin-top: 0.25rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }

    .brand {
      align-items: flex-start;
    }

    .logo {
      width: 40px;
      height: 40px;
    }

    .tagline {
      font-size: 1rem;
    }
  }
</style>
