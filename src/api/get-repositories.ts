import axios from "axios";
import { RepositoryType } from "../types";

export const getRepositories = async (
  language: string
): Promise<RepositoryType[]> => {
  try {
    const repos = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent("language:" + language)}&page=1&per_page=10`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer cenas`,
        },
      }
    );
    return repos.data.items;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
