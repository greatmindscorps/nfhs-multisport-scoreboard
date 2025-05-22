// Polling interval in milliseconds
const POLL_INTERVAL = 2000; // 2 seconds

// Main polling function
async function fetchScoreboard() {
  try {
    // Update this URL if your Cardputer serves data elsewhere
    const res = await fetch('/api/scoreboard');
    if (!res.ok) throw new Error('Failed to fetch scoreboard data');
    const data = await res.json();
    renderScoreboard(data);
  } catch (err) {
    renderError(err.message);
  }
}

// Render the scoreboard based on sport and NFHS-required fields
function renderScoreboard(data) {
  const sb = document.getElementById('scoreboard');
  let html = `
    <div class="teams">
      <span>Home</span>
      <span class="big">${data.home_score ?? '-'}</span>
      <span>:</span>
      <span class="big">${data.away_score ?? '-'}</span>
      <span>Away</span>
    </div>
  `;

  switch (data.sport) {
    case "basketball":
      html += `
        <div class="details">
          <span><span class="label">Period</span> ${data.period ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Fouls</span> H:${data.home_fouls ?? '-'} G:${data.away_fouls ?? '-'}</span>
          <span><span class="label">Timeouts</span> H:${data.timeouts_home ?? '-'} G:${data.timeouts_away ?? '-'}</span>
          <span><span class="label">Possession</span> ${data.possession ?? '-'}</span>
        </div>
      `;
      break;

    case "football":
      html += `
        <div class="details">
          <span><span class="label">Quarter</span> ${data.quarter ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Down</span> ${data.down ?? '-'}</span>
          <span><span class="label">To Go</span> ${data.togo ?? '-'}</span>
          <span><span class="label">Ball On</span> ${data.ball_on ?? '-'}</span>
          <span><span class="label">Timeouts</span> H:${data.timeouts_home ?? '-'} G:${data.timeouts_away ?? '-'}</span>
        </div>
      `;
      break;

    case "baseball":
      html += `
        <div class="details">
          <span><span class="label">Inning</span> ${data.inning ?? '-'}</span>
          <span><span class="label">Outs</span> ${data.outs ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Balls</span> ${data.balls ?? '-'}</span>
          <span><span class="label">Strikes</span> ${data.strikes ?? '-'}</span>
        </div>
      `;
      break;

    case "wrestling":
      html += `
        <div class="details">
          <span><span class="label">Period</span> ${data.period ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
      `;
      break;

    case "lacrosse":
      html += `
        <div class="details">
          <span><span class="label">Period</span> ${data.period ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Timeouts</span> H:${data.timeouts_home ?? '-'} G:${data.timeouts_away ?? '-'}</span>
        </div>
      `;
      break;

    case "hockey":
      html += `
        <div class="details">
          <span><span class="label">Period</span> ${data.period ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Penalties</span> H:${data.penalties_home ?? '-'} G:${data.penalties_away ?? '-'}</span>
        </div>
      `;
      break;

    case "handball":
      html += `
        <div class="details">
          <span><span class="label">Half</span> ${data.half ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
      `;
      break;

    case "tennis":
      html += `
        <div class="details">
          <span><span class="label">Set</span> ${data.set ?? '-'}</span>
          <span><span class="label">Game</span> ${data.game ?? '-'}</span>
        </div>
      `;
      break;

    case "volleyball":
      html += `
        <div class="details">
          <span><span class="label">Set</span> ${data.set ?? '-'}</span>
        </div>
      `;
      break;

    case "track":
      html += `
        <div class="details">
          <span><span class="label">Event</span> ${data.event ?? '-'}</span>
          <span><span class="label">Heat</span> ${data.heat ?? '-'}</span>
        </div>
      `;
      break;

    case "soccer":
      html += `
        <div class="details">
          <span><span class="label">Half</span> ${data.half ?? '-'}</span>
          <span><span class="label">Clock</span> ${data.clock ?? '-'}</span>
        </div>
        <div class="extra">
          <span><span class="label">Yellow Cards</span> H:${data.yellow_home ?? '-'} G:${data.yellow_away ?? '-'}</span>
          <span><span class="label">Red Cards</span> H:${data.red_home ?? '-'} G:${data.red_away ?? '-'}</span>
        </div>
      `;
      break;

    case "gymnastics":
      html += `
        <div class="details">
          <span><span class="label">Event</span> ${data.event ?? '-'}</span>
        </div>
      `;
      break;

    default:
      html += `<div class="details"><span>Sport not recognized.</span></div>`;
      break;
  }

  sb.innerHTML = html;
}

// Render error messages
function renderError(msg) {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = `<div style="color:red;text-align:center;">${msg}</div>`;
}

// Start polling for live updates
setInterval(fetchScoreboard, POLL_INTERVAL);
fetchScoreboard();

