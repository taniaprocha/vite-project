import axios from "axios";
import { RepositoryType } from "../types";

export const getRepositories = async (
  language: string
): Promise<RepositoryType[]> => {
  try {
    const repos = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent("language:" + language)}&page=1&per_page=15`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    return repos.data.items;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export interface GitHubAppToken {
  token: string;
  expiresAt: Date;
}
