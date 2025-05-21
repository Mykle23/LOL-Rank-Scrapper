// main.js

async function main(accounts) {
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error(
      "Please provide an array of accounts with region, nameId, and hashtag"
    );
  }
  const results = [];
  for (const account of accounts) {
    const { region, nameId, hashtag } = account;
    try {
      // Import dinámico para que Vitest pueda espiar fetchSummonerData
      const mod = await import("./main.js");
      const data = await mod.fetchSummonerData(region, nameId, hashtag);
      results.push(data);
    } catch (error) {
      console.error(`Error fetching data for ${nameId}#${hashtag}:`, error);
      results.push({
        region,
        nameId,
        hashtag,
        errorMessage: error.message,
      });
    }
  }
  console.log("Results:", results);
  return results;
}

const fetchQueueData = async (region, nameId, hashtag) => {
  if (!region || !nameId || !hashtag) {
    throw new Error("Missing required parameters: region, nameId, or hashtag");
  }
  region = region.toUpperCase();
  const translateRegions = {
    EUW1: ["EUW", "Europe West"],
  };
  const translatedRegion = Object.keys(translateRegions).find((key) =>
    translateRegions[key].includes(region)
  );
  region = translatedRegion || region;

  const url = `https://lol.iesdev.com/riot_account/lol/${region}/${nameId}/${hashtag}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching summoner data for ${nameId}#${hashtag} - region:${region}. Message: ${response.statusText}`
    );
  }

  return response.json();
};

const extractQueueData = (data) => {
  const queueDefaultData = {
    tier: "Unranked",
    rank: "Unranked",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };
  const result = {
    summonerData: {
      name: data.account.game_name || "",
      summonerId: data.account.puuid || "",
      hashtag: data.account.tag_line || "",
      summonerLevel: data.summoner.summoner_level || 0,
    },
    queueData: {
      soloQueue: queueDefaultData,
      flexQueue: queueDefaultData,
    },
  };
  if (!data.league_lol) {
    return result;
  }
  data.league_lol.forEach((queue) => {
    if (queue.queue_type === "RANKED_SOLO_5x5") {
      result.queueData.soloQueue = {
        tier: queue.tier || "Unranked",
        rank: queue.rank || "Unranked",
        leaguePoints: queue.league_points || 0,
        wins: queue.wins || 0,
        losses: queue.losses || 0,
      };
    } else if (queue.queue_type === "RANKED_FLEX_SR") {
      result.queueData.flexQueue = {
        tier: queue.tier || "Unranked",
        rank: queue.rank || "Unranked",
        leaguePoints: queue.league_points || 0,
        wins: queue.wins || 0,
        losses: queue.losses || 0,
      };
    }
  });
  return result;
};

const fetchSummonerData = async (region, nameId, hashtag) => {
  // Import dinámico para que Vitest pueda espiar fetchQueueData y extractQueueData
  const mod = await import("./main.js");

  if (!region || !nameId || !hashtag) {
    throw new Error("Missing required parameters: region, nameId, or hashtag");
  }

  const initialData = {
    timeStamp: new Date().toISOString(),
    region,
    nameId,
    hashtag,
    fetchedData: null,
    hasFetched: false,
    errorMessage: null,
  };

  const rawData = await mod
    .fetchQueueData(region, nameId, hashtag)
    .catch((error) => {
      initialData.errorMessage = error.message;
      console.error(
        `Error fetching summoner data (${nameId}#${hashtag} at region ${region}):`,
        error
      );
      return initialData;
    });

  initialData.hasFetched = true;
  const data = mod.extractQueueData(rawData);
  initialData.fetchedData = data;

  return data;
};

const multipleAccounts = [
  { region: "EUW1", nameId: "marquesafanacc", hashtag: "EUW" },
  { region: "EUW1", nameId: "TheNameIsMartin", hashtag: "HAHAH" },
  { region: "EUW1", nameId: "Goosy", hashtag: "2828" },
  { region: "EUW1", nameId: "Goosy", hashtag: "123123122828" },
];

// main(multipleAccounts);

export { main, fetchQueueData, extractQueueData, fetchSummonerData };
