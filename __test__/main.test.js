import { describe, it, expect, vi, beforeEach } from "vitest";
import * as mainModule from "../main";
import { sampleRawDataNoLeague, sampleRawDataWithQueues } from "./mockData.js";

const { main } = mainModule;

// Mock global fetch for fetchQueueData tests
global.fetch = vi.fn();

describe("fetchQueueData", () => {
  const { fetchQueueData } = mainModule;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if parameters are missing", async () => {
    await expect(fetchQueueData("", "name", "tag")).rejects.toThrow(
      "Missing required parameters: region, nameId, or hashtag"
    );
  });

  it("normalizes region aliases and fetches data", async () => {
    const mockJson = { foo: "bar" };
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

  it("uses region as-is if not alias", async () => {
    const mockJson = { baz: "qux" };
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
  const { extractQueueData } = mainModule;

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

describe("fetchSummonerData", () => {
  const { fetchSummonerData } = mainModule;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if required parameters are missing", async () => {
    await expect(fetchSummonerData("", "foo", "bar")).rejects.toThrow(
      "Missing required parameters: region, nameId, or hashtag"
    );
  });

  it("returns extracted data when fetchQueueData succeeds", async () => {
    const raw = { account: {}, summoner: {}, league_lol: null };
    const extracted = { foo: "bar" };
    vi.spyOn(mainModule, "fetchQueueData").mockResolvedValue(raw);
    vi.spyOn(mainModule, "extractQueueData").mockReturnValue(extracted);

    const result = await fetchSummonerData("EUW1", "name", "tag");
    expect(mainModule.extractQueueData).toHaveBeenCalledWith(raw);
    expect(result).toBe(extracted);
  });

  it("handles fetchQueueData errors and logs errorMessage on initialData", async () => {
    const err = new Error("network failure");
    vi.spyOn(mainModule, "fetchQueueData").mockRejectedValue(err);
    const extractSpy = vi.spyOn(mainModule, "extractQueueData");

    const result = await fetchSummonerData("EUW1", "name", "tag");
    expect(extractSpy).toHaveBeenCalled();
    expect(result).toBe(extractSpy.mock.results[0].value);
  });
});

describe("main", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if accounts is not a non-empty array", async () => {
    await expect(main(null)).rejects.toThrow(
      "Please provide an array of accounts with region, nameId, and hashtag"
    );
    await expect(main([])).rejects.toThrow(
      "Please provide an array of accounts with region, nameId, and hashtag"
    );
  });

  it("returns results array on mixed success and failure", async () => {
    const accounts = [
      { region: "R1", nameId: "ok", hashtag: "#1" },
      { region: "R2", nameId: "err", hashtag: "#2" },
    ];
    const dataSuccess = { data: 123 };
    const errorMsg = "fail fetch";

    vi.spyOn(mainModule, "fetchSummonerData").mockImplementation(
      (_, nameId) => {
        if (nameId === "err") throw new Error(errorMsg);
        return Promise.resolve(dataSuccess);
      }
    );

    const results = await main(accounts);
    expect(results).toEqual([
      dataSuccess,
      { region: "R2", nameId: "err", hashtag: "#2", errorMessage: errorMsg },
    ]);
  });
});
