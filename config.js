// Web app URL of the Google Apps Script that stores leaderboard scores (see apps_script.gs).
// Leave empty to run the game without a leaderboard.
const BOARD_URL = '';
// Only scores from this many recent hours count, so each lecture gets a fresh board.
const BOARD_HOURS = 3;

async function boardFetch() {
  const res = await fetch(`${BOARD_URL}?hours=${BOARD_HOURS}`);
  if (!res.ok) throw new Error(res.status);
  return (await res.json()).rows || [];
}
async function boardSubmit(entry) {
  // A plain-text body keeps this a "simple" request, which Apps Script accepts cross-origin.
  const res = await fetch(BOARD_URL, { method: 'POST', body: JSON.stringify(entry) });
  if (!res.ok) throw new Error(res.status);
}
