# EECS 493 Think-Aloud Activities

Static pages used in the EECS 493 (User Interface Development) think-aloud lecture.

- `rooms.html`: Northgate Rooms, a fictional study-room booking site used for an in-class think-aloud.
- `facilitator.html`: Worst Facilitator, a game about think-aloud facilitation.
- `leaderboard.html`: live class leaderboard for the game, meant for the projector.

Served with GitHub Pages: https://farnazj.github.io/eecs493-thinkaloud/

## Connecting the leaderboard (Google Sheets)

1. Create a new Google Sheet.
2. In the sheet, open **Extensions > Apps Script**, replace the contents with `apps_script.gs`, and save.
3. Click **Deploy > New deployment**, choose type **Web app**, set *Execute as* to **Me** and *Who has access* to **Anyone**, then deploy and authorize.
4. Copy the web app URL (it ends in `/exec`) into `BOARD_URL` in `config.js` and push.

Scores land in the sheet's `Scores` tab. The leaderboard only shows the last 3 hours (`BOARD_HOURS` in `config.js`), so each lecture starts fresh. Delete rows in the sheet to remove a score.
