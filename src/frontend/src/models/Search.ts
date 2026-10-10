export interface Search {
  url: string;
  message: string;
}

export interface AdvancedSearch {
  url: string;
  message: string;
  limit: number;
  requiredWords: string[];
  acceptedDeviation: number;
  minNumComments: number;
  state: string;
}
