async function main(accounts) {
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error(
      "Please provide an array of accounts with region, nameId, and hashtag"
    );
  }
  const results = [];
  for (const account of accounts) {
    const { region, nameId, hashtag } = account;
    // Import dinámico para Vitest
    const mod = await import("./main.js");
    const data = await mod.fetchSummonerData(region, nameId, hashtag);
    results.push(data);
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
  const queueDefault = {
    tier: "Unranked",
    rank: "Unranked",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };
  const result = {
    summonerData: {
      name: data.account?.game_name || "",
      summonerId: data.account?.puuid || "",
      hashtag: data.account?.tag_line || "",
      summonerLevel: data.summoner?.summoner_level || 0,
    },
    queueData: {
      soloQueue: { ...queueDefault },
      flexQueue: { ...queueDefault },
    },
  };
  if (Array.isArray(data.league_lol)) {
    data.league_lol.forEach((q) => {
      const entry = {
        tier: q.tier || "Unranked",
        rank: q.rank || "Unranked",
        leaguePoints: q.league_points || 0,
        wins: q.wins || 0,
        losses: q.losses || 0,
      };
      if (q.queue_type === "RANKED_SOLO_5x5") {
        result.queueData.soloQueue = entry;
      } else if (q.queue_type === "RANKED_FLEX_SR") {
        result.queueData.flexQueue = entry;
      }
    });
  }
  return result;
};

const fetchSummonerData = async (region, nameId, hashtag) => {
  if (!region || !nameId || !hashtag) {
    throw new Error("Missing required parameters: region, nameId, or hashtag");
  }

  const wrapper = {
    summonerData: {
      name: "",
      summonerId: "",
      hashtag: "",
      summonerLevel: 0,
    },
    queueData: {
      soloQueue: {
        tier: "Unranked",
        rank: "Unranked",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
      },
      flexQueue: {
        tier: "Unranked",
        rank: "Unranked",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
      },
    },
    timeStamp: new Date().toISOString(),
    region,
    nameId,
    hashtag,
    fetchedData: null,
    hasFetched: false,
    errorMessage: null,
  };

  let raw;
  try {
    raw = await fetchQueueData(region, nameId, hashtag);
  } catch (err) {
    wrapper.hasFetched = true;
    wrapper.errorMessage = err.message;
    return wrapper;
  }

  wrapper.fetchedData = raw;
  wrapper.hasFetched = true;

  const extracted = extractQueueData(raw);
  wrapper.summonerData = extracted.summonerData;
  wrapper.queueData = extracted.queueData;

  return wrapper;
};

export { main, fetchQueueData, extractQueueData, fetchSummonerData };
