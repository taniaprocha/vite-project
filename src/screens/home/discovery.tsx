import { Box, Container, Stack, Typography } from "@mui/material";
import { Header } from "../../components/header/header";
import "./discovery.scss";
import { Languages } from "../../components/languages/languages";
import { Repositories } from "../../components/repositories/repositories";
import { useContextApp } from "../../context/app-context";

export const DiscoveryScreen = () => {
  const { selectedLanguages, repositoriesData, onSelectLanguage } =
    useContextApp();

  console.log(repositoriesData);

  return (
    <Container className="container">
      <Header />
      <Stack direction="column" spacing={3} className="discovery-container">
        <Typography variant="h3">My Bookmarks</Typography>
        <Typography variant="h5">Toggle topics to show</Typography>

        <Languages
          selectedLanguages={selectedLanguages}
          onSelect={(languages) => onSelectLanguage(languages)}
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
    </Container>
  );
};
