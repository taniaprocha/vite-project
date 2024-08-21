import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { BookmarkType, RepositoriesData, SortType } from "../types";
import { languages } from "../components/languages/languages";
import { getRepositories } from "../api/get-repositories";

type Context = {
  repositoriesData: RepositoriesData;
  selectedLanguages: string[];
  bookmarksIds: number[];
  bookmarks: BookmarkType[];
  onSelectLanguage: (language: string) => void;
  onSelectBookmark: (id: number) => void;
  loadMoreRepositories: (language: string) => void;
  sortRepositories: (language: string, type: SortType) => void;
};

export const AppContext = createContext<Context>({
  repositoriesData: {},
  bookmarksIds: [],
  bookmarks: [],
  selectedLanguages: [languages[0]],
  onSelectLanguage: () => {},
  onSelectBookmark: () => {},
  loadMoreRepositories: () => {},
  sortRepositories: () => {},
});

export function AppContextProvider({ children }: { children?: ReactNode }) {
  const [repositoriesData, setRepositoriesData] = useState<RepositoriesData>(
    {}
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    languages[0],
  ]);
  const [bookmarksIds, setBookmarksIds] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  useEffect(() => {
    const getInitialRepo = async () => {
      const repos = await getRepositories("vue", 1);
      if (repos) {
        setRepositoriesData({
          ["vue"]: { list: repos.list, page: 1, total: repos.total },
        });
      }
    };
    getInitialRepo();
  }, []);

  const handleSelectLanguage = async (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
      if (!repositoriesData[language]) {
        const repos = await getRepositories(language, 1);
        if (repos) {
          setRepositoriesData({
            ...repositoriesData,
            [language]: { list: repos.list, page: 1, total: repos.total },
          });
        }
      }
    }
  };

  const handleSelectBookmark = (id: number) => {
    if (bookmarksIds.includes(id)) {
      setBookmarksIds(bookmarksIds.filter((b) => b !== id));
      setBookmarks(bookmarks.filter((b) => b.id !== id));
    } else {
      setBookmarksIds([...bookmarksIds, id]);
      Object.keys(repositoriesData).forEach((language) => {
        const repo = repositoriesData[language]?.list.find((r) => r.id === id);
        if (repo) {
          setBookmarks([
            ...bookmarks,
            { id: repo.id, name: repo.name, image: repo.owner.avatar_url },
          ]);
        }
      });
    }
  };

  const handleLoadMoreRepositories = async (language: string) => {
    if (!repositoriesData[language]) {
      return;
    }
    const newPage = repositoriesData[language].page + 1;
    if (
      repositoriesData[language].list.length >= repositoriesData[language].total
    ) {
      return;
    }
    const repos = await getRepositories(language, newPage);
    if (repos) {
      setRepositoriesData({
        ...repositoriesData,
        [language]: { list: repos.list, page: newPage, total: repos.total },
      });
    }
  };

  const handleSortRepositories = async (language: string, type: SortType) => {
    setRepositoriesData({
      ...repositoriesData,
      [language]: undefined,
    });
    const repos = await getRepositories(language, 1, type);
    if (repos) {
      setRepositoriesData({
        ...repositoriesData,
        [language]: { list: repos.list, page: 1, total: repos.total },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        repositoriesData,
        selectedLanguages,
        bookmarksIds,
        bookmarks,
        onSelectLanguage: handleSelectLanguage,
        onSelectBookmark: handleSelectBookmark,
        loadMoreRepositories: handleLoadMoreRepositories,
        sortRepositories: handleSortRepositories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/**
 * Gets App data.
 *
 * @example
 * ```
 * const app = useContextApp();
 * ```
 */
export function useContextApp(): Context {
  return useContext(AppContext);
}
