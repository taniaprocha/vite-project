import { Container, Stack, Typography } from "@mui/material";
import { Header } from "../../components/header/header";
import "./discovery.scss";
import { Languages } from "../../components/languages/languages";
import { Repositories } from "../../components/repositories/repositories";
import { useContextApp } from "../../context/app-context";
import { Bookmarks } from "../../components/bookmarks/bookmarks";

export const DiscoveryScreen = () => {
  const {
    selectedLanguages,
    repositoriesData,
    bookmarksIds,
    bookmarks,
    onSelectLanguage,
    onSelectBookmark,
  } = useContextApp();

  return (
    <Container className="container">
      <Header />
      <Stack direction="column" spacing={3} className="discovery-container">
        <Typography variant="h5">My Bookmarks</Typography>

        <Bookmarks
          bookmarks={bookmarks}
          onRemoveBookmark={(id) => onSelectBookmark(id)}
        />

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
                <Repositories
                  language={language}
                  repositoriesData={repositoriesData}
                  onBookmark={(id) => onSelectBookmark(id)}
                  bookmarks={bookmarksIds}
                />
              </Stack>
            );
          })}
        </Stack>

        <Stack direction="row" spacing={2}></Stack>
      </Stack>
    </Container>
  );
};
