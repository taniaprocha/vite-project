import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { RepositoriesData } from "../types";
import { languages } from "../components/languages/languages";
import { getRepositories } from "../api/get-repositories";

type Context = {
  repositoriesData: RepositoriesData;
  selectedLanguages: string[];
  onSelectLanguage: (language: string) => void;
};

const initialValue: Context = {
  repositoriesData: {},
  selectedLanguages: [languages[0]],
  onSelectLanguage: () => {},
};

export const AppContext = createContext<Context>(initialValue);

export function AppContextProvider({ children }: { children?: ReactNode }) {
  const [repositoriesData, setRepositoriesData] = useState(
    initialValue.repositoriesData
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialValue.selectedLanguages
  );

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

  return (
    <AppContext.Provider
      value={{
        repositoriesData,
        selectedLanguages,
        onSelectLanguage: handleSelectLanguage,
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
