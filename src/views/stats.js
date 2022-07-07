const Stats = () => {
  return (
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-secondary"></div>
        <div class="stat-title">Rating</div>
        <div class="stat-value text-accent">8.4</div>
        <div class="stat-desc">Enviro Rating</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary"></div>
        <div class="stat-title">Temperature</div>
        <div class="stat-value">21°</div>
        <div class="stat-desc">↗︎ Celsius</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary"></div>
        <div class="stat-title">Humidity</div>
        <div class="stat-value">34</div>
        <div class="stat-desc">Humidex</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary"></div>
        <div class="stat-title">Brightness</div>
        <div class="stat-value">425</div>
        <div class="stat-desc">↘︎ Lux</div>
      </div>
    </div>
  );
};

export { Stats };
