export type RepositoryType = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  updated_at: string;
  owner: {
    avatar_url: string;
  };
};

export type RepositoriesData = {
  [language: string]:
    | { list: RepositoryType[]; page: number; total: number }
    | undefined;
};

export type BookmarkType = {
  id: number;
  image: string;
  name: string;
};

export type SortType = "stars" | "forks" | "help-wanted-issues" | "updated";
