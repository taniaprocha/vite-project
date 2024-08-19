import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { BookmarkType, RepositoriesData } from "../types";
import { languages } from "../components/languages/languages";
import { getRepositories } from "../api/get-repositories";

type Context = {
  repositoriesData: RepositoriesData;
  selectedLanguages: string[];
  bookmarksIds: number[];
  bookmarks: BookmarkType[];
  onSelectLanguage: (language: string) => void;
  onSelectBookmark: (id: number) => void;
};

const initialValue: Context = {
  repositoriesData: {},
  bookmarksIds: [],
  bookmarks: [],
  selectedLanguages: [languages[0]],
  onSelectLanguage: () => {},
  onSelectBookmark: () => {},
};

export const AppContext = createContext<Context>(initialValue);

export function AppContextProvider({ children }: { children?: ReactNode }) {
  const [repositoriesData, setRepositoriesData] = useState(
    initialValue.repositoriesData
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialValue.selectedLanguages
  );
  const [bookmarksIds, setBookmarksIds] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  useEffect(() => {
    const getInitialRepo = async () => {
      const repos = await getRepositories("vue");
      if (repos) {
        setRepositoriesData({
          ["vue"]: repos,
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
        const repos = await getRepositories(language);
        if (repos) {
          setRepositoriesData({ ...repositoriesData, [language]: repos });
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
        const repo = repositoriesData[language].find((r) => r.id === id);
        if (repo) {
          setBookmarks([
            ...bookmarks,
            { id: repo.id, name: repo.name, image: repo.owner.avatar_url },
          ]);
        }
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
