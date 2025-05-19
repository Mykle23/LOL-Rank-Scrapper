// El input sera el nameId + hashtag
// Utilizaremos las llamadas de blitz.gg

async function main() {
  // const rawData = await fetchQueueData('EUW1', 'marquesafanacc', 'EUW');
  // const rawData = await fetchQueueData('EUW1', 'TheNameIsMartin', 'HAHAH');// With all ranks
  const initialData = {
    timeStamp: new Date().toISOString(),
    region: 'EUW1',
    nameId: 'Goosy',
    hashtag: '2828',
    fetchedData: null,
    hasFetched: false,
    errorMessage: null,
  };
  const data = await fetchSummonerData(
    initialData.region,
    initialData.nameId,
    initialData.hashtag
  );

  console.log(data);

  var temp = 1;
}

const fetchQueueData = async (region, nameId, hashtag) => {
  if (!region || !nameId || !hashtag) {
    throw new Error('Missing required parameters: region, nameId, or hashtag');
  }
  const translateRegions = {
    EUW1: ['EUW', 'Europe West'],
  };
  // Buscamos por propiedad de transalteRegions
  const translatedRegion = Object.keys(translateRegions).find((key) =>
    translateRegions[key].includes(region)
  );
  region = translatedRegion || region;

  const url = `https://lol.iesdev.com/riot_account/lol/${region}/${nameId}/${hashtag}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

const extractQueueData = (data) => {
  const queueDefaultData = {
    tier: 'Unranked',
    rank: 'Unranked',
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };
  const result = {
    summonerData: {
      name: data.account.game_name || '',
      summonerId: data.account.puuid || '',
      hashtag: data.account.tag_line || '',
      summonerLevel: data.summoner.summoner_level || 0,
    },
    queueData: {
      soloQueue: queueDefaultData,
      flexQueue: queueDefaultData,
    },
  };
  // Comprobamos si tenemos clasificacion en league_lol, ya que puede ser null
  if (!data.league_lol) {
    return result; // No league data available
  }
  data.league_lol.forEach((queue) => {
    if (queue.queue_type === 'RANKED_SOLO_5x5') {
      result.queueData.soloQueue = {
        tier: queue.tier || 'Unranked',
        rank: queue.rank || 'Unranked',
        leaguePoints: queue.league_points || 0,
        wins: queue.wins || 0,
        losses: queue.losses || 0,
      };
    } else if (queue.queue_type === 'RANKED_FLEX_SR') {
      result.queueData.flexQueue = {
        tier: queue.tier || 'Unranked',
        rank: queue.rank || 'Unranked',
        leaguePoints: queue.league_points || 0,
        wins: queue.wins || 0,
        losses: queue.losses || 0,
      };
    }
  });
  return result;
};

const fetchSummonerData = async (region, nameId, hashtag) => {
  if (!region || !nameId || !hashtag) {
    throw new Error('Missing required parameters: region, nameId, or hashtag');
  }
  const rawData = await fetchQueueData(region, nameId, hashtag);

  const data = extractQueueData(rawData);

  return data;
};

main();
