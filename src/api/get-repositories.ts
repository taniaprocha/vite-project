import axios from "axios";
import { RepositoryType, SortType } from "../types";

export const getRepositories = async (
  language: string,
  page: number,
  sort: SortType = "stars"
): Promise<{ list: RepositoryType[]; total: number }> => {
  try {
    const repos = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent("language:" + language)}&page=${page}&per_page=10&sort=${sort}&order=desc`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    return { list: repos.data.items, total: repos.data.total_count };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export interface GitHubAppToken {
  token: string;
  expiresAt: Date;
}
