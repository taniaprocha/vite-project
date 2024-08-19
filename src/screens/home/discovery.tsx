import {
  Button,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Header } from "../../components/header/header";
import "./discovery.scss";
import { Languages } from "../../components/languages/languages";
import { Repositories } from "../../components/repositories/repositories";
import { useContextApp } from "../../context/app-context";
import { Bookmarks } from "../../components/bookmarks/bookmarks";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export const DiscoveryScreen = () => {
  const {
    selectedLanguages,
    repositoriesData,
    bookmarksIds,
    bookmarks,
    onSelectLanguage,
    onSelectBookmark,
    loadMoreRepositories,
    sortRepositories,
  } = useContextApp();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();

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
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">{`Top ${language}`}</Typography>
                  <Button
                    size="small"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    className="sort-button"
                    color="inherit"
                  >
                    <IoIosArrowDown size="2em" color="black" />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={anchorEl ? true : false}
                    onClose={() => setAnchorEl(undefined)}
                  >
                    <MenuItem
                      onClick={() => sortRepositories(language, "stars")}
                    >
                      Sort by stars
                    </MenuItem>
                    <MenuItem
                      onClick={() => sortRepositories(language, "forks")}
                    >
                      Sort by forks
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        sortRepositories(language, "help-wanted-issues")
                      }
                    >
                      Sort by help wanted issues
                    </MenuItem>
                    <MenuItem
                      onClick={() => sortRepositories(language, "updated")}
                    >
                      Sort by updated
                    </MenuItem>
                  </Menu>
                </Stack>

                <Repositories
                  language={language}
                  repositoriesData={repositoriesData}
                  onBookmark={(id) => onSelectBookmark(id)}
                  bookmarks={bookmarksIds}
                  loadMore={(language) => loadMoreRepositories(language)}
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
