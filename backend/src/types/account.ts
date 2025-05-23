export type Region = 'EUW' | 'EUNE' | 'NA' | 'BR' | 'LAN' | 'LAS' | 'OCE' | 'KR';

export type Tier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

export type Division = 'IV' | 'III' | 'II' | 'I';

export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export interface Rank {
  tier: Tier;
  division: Division;
  lp: number;
}

export interface Champion {
  key: string;
  games: number;
  winrate: number;
}

export interface CalendarDay {
  date: string;
  deltaLP: number;
  hoursPlayed: number;
  gamesPlayed: number;
}

export interface Account {
  id: string;
  iconUrl: string;
  level: number;
  nickname: string;
  tag: string;
  region: Region;
  rank: Rank;
  roles: Role[];
  locked: boolean;
  username: string;
  password: string;
  calendar: CalendarDay[];
  champions: Champion[];
} 