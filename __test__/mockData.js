export const sampleRawDataNoLeague = {
  account: { game_name: "TestPlayer", puuid: "uuid-123", tag_line: "TAG" },
  summoner: { summoner_level: 30 },
  league_lol: null,
};
export const sampleRawDataWithQueues = {
  account: { game_name: "TestPlayer", puuid: "uuid-123", tag_line: "TAG" },
  summoner: { summoner_level: 50 },
  league_lol: [
    {
      queue_type: "RANKED_SOLO_5x5",
      tier: "GOLD",
      rank: "II",
      league_points: 75,
      wins: 100,
      losses: 80,
    },
    {
      queue_type: "RANKED_FLEX_SR",
      tier: "SILVER",
      rank: "I",
      league_points: 50,
      wins: 60,
      losses: 40,
    },
  ],
};
