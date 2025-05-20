import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  main,
  fetchQueueData,
  extractQueueData,
  fetchSummonerData,
} from "../main";
import { fetchQueueData as mockedFetchQueueData } from "../main";
import { sampleRawDataWithQueues, sampleRawDataNoLeague } from "./mockData.js";
// Mock global fetch
global.fetch = vi.fn();

describe("fetchQueueData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if parameters are missing", async () => {
    await expect(fetchQueueData("", "name", "tag")).rejects.toThrow(
      "Missing required parameters: region, nameId, or hashtag"
    );
  });

  it("normalizes region aliases and fetches data", async () => {
    const mockJson = { ok: true, data: {} };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const data = await fetchQueueData("euw", "nameId", "hashtag");
    expect(fetch).toHaveBeenCalledWith(
      "https://lol.iesdev.com/riot_account/lol/EUW1/nameId/hashtag"
    );
    expect(data).toEqual(mockJson);

    const data2 = await fetchQueueData("Europe West", "nameId", "hashtag");
    expect(fetch).toHaveBeenCalledWith(
      "https://lol.iesdev.com/riot_account/lol/EUW1/nameId/hashtag"
    );
    expect(data2).toEqual(mockJson);
  });

  it("normalizes region aliases if not in dictionary translateRegion and fetches data", async () => {
    const mockJson = { ok: true, data: {} };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const data = await fetchQueueData("TRK", "nameId", "hashtag");
    expect(fetch).toHaveBeenCalledWith(
      "https://lol.iesdev.com/riot_account/lol/TRK/nameId/hashtag"
    );
    expect(data).toEqual(mockJson);
  });
  it("throws on non-ok response", async () => {
    fetch.mockResolvedValueOnce({ ok: false, statusText: "Not Found" });
    await expect(fetchQueueData("EUW1", "name", "tag")).rejects.toThrow(
      "Error fetching summoner data for name#tag - region:EUW1. Message: Not Found"
    );
  });
});
describe("extractQueueData", () => {
  it("returns default unranked data when league_lol is null", () => {
    const result = extractQueueData(sampleRawDataNoLeague);
    expect(result).toEqual({
      summonerData: {
        name: "TestPlayer",
        summonerId: "uuid-123",
        hashtag: "TAG",
        summonerLevel: 30,
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
    });
  });

  it("maps provided league queues to result object", () => {
    const result = extractQueueData(sampleRawDataWithQueues);
    expect(result).toEqual({
      summonerData: {
        name: "TestPlayer",
        summonerId: "uuid-123",
        hashtag: "TAG",
        summonerLevel: 50,
      },
      queueData: {
        soloQueue: {
          tier: "GOLD",
          rank: "II",
          leaguePoints: 75,
          wins: 100,
          losses: 80,
        },
        flexQueue: {
          tier: "SILVER",
          rank: "I",
          leaguePoints: 50,
          wins: 60,
          losses: 40,
        },
      },
    });
  });
});

// Mock fetchQueueData in fetchSummonerData tests
vi.mock("../main.js", async () => {
  const actual = await vi.importActual("../main.js");
  return {
    ...actual,
    fetchQueueData: vi.fn(),
  };
});

describe("fetchSummonerData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if parameters are missing", async () => {
    await expect(fetchSummonerData("", "", "")).rejects.toThrow(
      "Missing required parameters: region, nameId, or hashtag"
    );
  });

  it("returns structured data on successful fetch", async () => {
    mockedFetchQueueData.mockResolvedValueOnce(sampleRawDataWithQueues);

    const result = await fetchSummonerData("EUW1", "name", "tag");
    expect(mockedFetchQueueData).toHaveBeenCalledWith("EUW1", "name", "tag");
    expect(result.queueData.soloQueue.tier).toBe("GOLD");
  });

  it("catches fetch errors and returns initial data on error", async () => {
    const error = new Error("network failure");
    mockedFetchQueueData.mockRejectedValueOnce(error);

    await expect(fetchSummonerData("EUW1", "name", "tag")).resolves.toEqual(
      expect.objectContaining({ tier: undefined })
    );
  });
});

describe("main", () => {
  it("throws if input is invalid", async () => {
    await expect(main(null)).rejects.toThrow(
      "Please provide an array of accounts with region, nameId, and hashtag"
    );
  });

  it("returns results array for multiple accounts", async () => {
    mockedFetchQueueData.mockResolvedValue(sampleRawDataNoLeague);
    const accounts = [
      { region: "EUW1", nameId: "a", hashtag: "b" },
      { region: "NA1", nameId: "c", hashtag: "d" },
    ];
    const results = await main(accounts);
    expect(results).toHaveLength(2);
    expect(results[0].summonerData.name).toBe("TestPlayer");
  });
});
