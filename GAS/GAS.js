const SHEET_NAME = "cuentas";

///////////////////////////////
// Funcion main
///////////////////////////////
async function main() {
  const accounts = readAccounts();
  for (const acc of accounts) {
    const res = await fetchSummonerData(acc.region, acc.nameId, acc.hashtag);
    writeResult(acc, res);
  }
}

///////////////////////////////
// 1) Función que carga datos
///////////////////////////////
function readAccounts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();

  // LEEMOS cabeceras de la fila 2 y las normalizamos a minúsculas
  const headers = sheet.getRange(2, 1, 1, lastCol).getValues()[0];
  const lcHeaders = headers.map((h) => h.toString().toLowerCase());

  // Buscamos índices “fuzzy”
  const idxTimestamp = lcHeaders.indexOf("timestamp");
  const idxErrorMessage = lcHeaders.indexOf("errormessage");
  const idxRegion = lcHeaders.indexOf("region");
  // Nick puede llamarse 'nick' o 'nickname'
  const idxNick =
    lcHeaders.indexOf("nick") >= 0
      ? lcHeaders.indexOf("nick")
      : lcHeaders.indexOf("nickname");
  const idxHashtag = lcHeaders.indexOf("hashtag");

  // Valores desde la fila 4 hasta lastRow
  const rows = sheet.getRange(4, 1, lastRow - 3, lastCol).getValues();
  const accounts = [];

  rows.forEach((r, i) => {
    const nameId = r[idxNick];
    // Si no hay nickname, saltamos la fila
    if (!nameId) return;

    accounts.push({
      region: r[idxRegion],
      nameId: nameId,
      hashtag: r[idxHashtag] || "",
      timestampCol: idxTimestamp + 1,
      errorMessageCol: idxErrorMessage + 1,
      _row: i + 4,
    });
  });

  return accounts;
}

////////////////////////////////////
// 2) Función que escribe un resultado
////////////////////////////////////
function writeResult(account, result) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const hdrs = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = account._row;
  const writes = {};

  // timestamp
  writes[account.timestampCol] = result.timeStamp;

  // si hubo error:
  if (result.errorMessage) {
    writes[account.errorMessageCol] = result.errorMessage;
  } else {
    // si no hay error, volcamos los campos del summoner y queues:
    // buscamos cada cabecera en hdrs y asignamos
    const mapeo = {
      summonerLevel: result.summonerData.summonerLevel,
      soloQueueTier: result.queueData.soloQueue.tier,
      soloQueueRank: result.queueData.soloQueue.rank,
      soloQueueLp: result.queueData.soloQueue.leaguePoints,
      SoloQueueWinsLoses: `${result.queueData.soloQueue.wins}/${result.queueData.soloQueue.losses}`,
      flexQueueTier: result.queueData.flexQueue.tier,
      flexQueueRank: result.queueData.flexQueue.rank,
      flexQueueLp: result.queueData.flexQueue.leaguePoints,
      FlexQueueWinsLoses: `${result.queueData.flexQueue.wins}/${result.queueData.flexQueue.losses}`,
    };
    for (const key in mapeo) {
      const col = hdrs.indexOf(key) + 1;
      if (col > 0) writes[col] = mapeo[key];
    }
  }

  // ahora aplicamos el setValues parciales:
  const cols = Object.keys(writes).map((c) => parseInt(c, 10));
  cols.forEach((col) => {
    sheet.getRange(row, col).setValue(writes[col]);
  });
}

/////////////////////////////////////////////////////////
// 3) Funciones adaptadas de tu módulo para Google Apps
/////////////////////////////////////////////////////////
async function fetchQueueData(region, nameId, hashtag) {
  if (!region || !nameId || !hashtag) {
    throw new Error("Missing parameters");
  }
  region = region.toUpperCase();
  const translateRegions = { EUW1: ["EUW", "Europe West"] };
  const tr = Object.keys(translateRegions).find((k) =>
    translateRegions[k].includes(region)
  );
  region = tr || region;
  const url = `https://lol.iesdev.com/riot_account/lol/${region}/${nameId}/${hashtag}`;
  const resp = await UrlFetchApp.fetch(url);
  const responseCode = resp.getResponseCode();
  if (!responseCode === 200) {
    throw new Error(`Status ${resp.status}: ${resp.statusText}`);
  }
  const responseText = resp.getContentText();

  return JSON.parse(responseText);
}

function extractQueueData(data) {
  const defaultQ = {
    tier: "Unranked",
    rank: "Unranked",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };
  const r = {
    summonerData: {
      summonerLevel: data.summoner?.summoner_level || 0,
    },
    queueData: {
      soloQueue: { ...defaultQ },
      flexQueue: { ...defaultQ },
    },
  };
  if (Array.isArray(data.league_lol)) {
    data.league_lol.forEach((q) => {
      const e = {
        tier: q.tier || defaultQ.tier,
        rank: q.rank || defaultQ.rank,
        leaguePoints: q.league_points || 0,
        wins: q.wins || 0,
        losses: q.losses || 0,
      };
      if (q.queue_type === "RANKED_SOLO_5x5") r.queueData.soloQueue = e;
      else if (q.queue_type === "RANKED_FLEX_SR") r.queueData.flexQueue = e;
    });
  }
  return r;
}

async function fetchSummonerData(region, nameId, hashtag) {
  const wrapper = {
    timeStamp: new Date().toISOString(),
    region,
    nameId,
    hashtag,
    summonerData: {},
    queueData: {},
    errorMessage: null,
  };
  try {
    const raw = await fetchQueueData(region, nameId, hashtag);
    const ex = extractQueueData(raw);
    wrapper.summonerData = ex.summonerData;
    wrapper.queueData = ex.queueData;
  } catch (e) {
    wrapper.errorMessage = e.message;
  }
  return wrapper;
}
