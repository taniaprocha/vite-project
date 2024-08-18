import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Header } from "../../components/header/header";
import "./discovery.scss";
import { Languages } from "../../components/languages/languages";
import { RepositoriesData } from "../../types";
import { getRepositories } from "../../api/get-repositories";
import { Repositories } from "../../components/repositories/repositories";

export const DiscoveryScreen = () => {
  const [repositoriesData, setRepositoriesData] = useState<RepositoriesData>(
    {}
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

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
  console.log(repositoriesData);

  return (
    <>
      <Header />
      <Stack direction="column" spacing={3} className="discovery-container">
        <Typography variant="h3">My Bookmarks</Typography>
        <Typography variant="h5">Toggle topics to show</Typography>

        <Languages
          selectedLanguages={selectedLanguages}
          onSelect={handleSelectLanguage}
        />
        <Stack>
          {selectedLanguages.map((language) => {
            return (
              <Stack direction="column" spacing={5} className="top-repo">
                <Typography variant="h5">{`Top ${language}`}</Typography>
                <Box className="repo-list">
                  <Repositories
                    language={language}
                    repositoriesData={repositoriesData}
                  />
                </Box>
              </Stack>
            );
          })}
        </Stack>

        <Stack direction="row" spacing={2}></Stack>
      </Stack>
    </>
  );
};
