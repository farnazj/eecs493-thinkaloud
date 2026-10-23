// Leaderboard backend for the Worst Facilitator game.
// Paste into Extensions > Apps Script of a Google Sheet, then deploy as a web app
// (Execute as: Me, Who has access: Anyone). Put the web app URL in config.js.

const SHEET_NAME = 'Scores';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const name = String(d.name || 'Anonymous').replace(/\s+/g, ' ').trim().slice(0, 24) || 'Anonymous';
  const score = Math.max(0, Math.min(100, Number(d.score) || 0));
  const picks = Array.isArray(d.picks) ? d.picks.map(n => Number(n) || 0).join(',') : '';
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow([new Date(), name, score, picks]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

function doGet(e) {
  const hours = Number(e.parameter.hours) || 3;
  const since = Date.now() - hours * 3600 * 1000;
  const rows = getSheet().getDataRange().getValues().slice(1)
    .filter(r => r[0] instanceof Date && r[0].getTime() >= since)
    .map(r => ({ t: r[0].getTime(), name: String(r[1]), score: Number(r[2]), picks: String(r[3]) }));
  return json({ rows });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Time', 'Name', 'Score', 'Picks']);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
