import { Barcelona } from '../utils/BarcelonaStatistics.js';

export default function barcaPage(teamId) {
  const data = Barcelona.response;
  const team = data.team;
  const league = data.league;
  const fixtures = data.fixtures;
  const form = data.form;
  const goals = data.goals;
  const cleanSheets = data.clean_sheet;
  const failedToScore = data.failed_to_score;
  const biggest = data.biggest;
  const lineups = data.lineups;

  return {
    render: (container) => {
      if (team.id != teamId) {
        container.innerHTML = `<p class="text-danger">Equipo no encontrado.</p>`;
        return;
      }

      // Form visual: W = green, D = yellow, L = red
      const formHtml = form.split('').map(result => {
        const color = result === 'W' ? '🟩' : result === 'D' ? '🟨' : '🟥';
        return `<span style="font-size: 1.1em;">${color}</span>`;
      }).join(' ');

      const topFormation = lineups[0]?.formation || 'N/A';

      container.innerHTML = `
        <div class="card p-4 shadow-lg">
          <div class="d-flex align-items-center mb-3">
            <img src="${team.logo}" alt="${team.name}" width="60" class="me-3" />
            <div>
              <h2 class="m-0">${team.name}</h2>
              <p class="text-muted m-0">
                <img src="${league.flag}" alt="${league.country}" width="20" /> ${league.name} ${league.season}
              </p>
            </div>
          </div>

          <div class="row row-cols-1 row-cols-md-2 g-4 mt-2">
            <div class="col">
              <div class="card p-3 h-100">
                <h5>📊 Estadísticas Generales</h5>
                <p>🏟️ Partidos jugados: ${fixtures.played.total}</p>
                <p>✅ Victorias: ${fixtures.wins.total}</p>
                <p>🤝 Empates: ${fixtures.draws.total}</p>
                <p>❌ Derrotas: ${fixtures.loses.total}</p>
                <p> Vallas invictas: ${cleanSheets.total}</p>
                <p>🚫 Partidos sin anotar: ${failedToScore.total}</p>
              </div>
            </div>

            <div class="col">
              <div class="card p-3 h-100">
                <h5>⚽ Goles</h5>
                <p>🟢 A favor: ${goals.for.total.total} (Avg: ${goals.for.average.total})</p>
                <p>🔴 En contra: ${goals.against.total.total} (Avg: ${goals.against.average.total})</p>
                <p> Máx goleada local: ${biggest.wins.home}</p>
                <p> Máx goleada visitante: ${biggest.wins.away}</p>
              </div>
            </div>

            <div class="col">
              <div class="card p-3 h-100">
                <h5>🧾 Datos adicionales</h5>
                <p> Formación más usada: ${topFormation}</p>
                <p> Mayor racha de victorias: ${data.biggest.streak.wins}</p>
                <p> Mayor racha sin ganar: ${data.biggest.streak.loses}</p>
              </div>
            </div>

            <div class="col">
              <div class="card p-3 h-100">
                <h5> Forma reciente</h5>
                <div style="font-size: 1.3em;">${formHtml}</div>
              </div>
            </div>
          </div>

          <button id="backBtn" class="btn btn-secondary mt-4">← Volver a tabla</button>
        </div>
      `;

      document.getElementById('backBtn').addEventListener('click', () => {
        location.hash = '#standings';
      });
    }
  };
}
