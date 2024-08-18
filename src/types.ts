export type RepositoryType = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  owner: {
    avatar_url: string;
  };
};

export type RepositoriesData = {
  [language: string]: RepositoryType[];
};
