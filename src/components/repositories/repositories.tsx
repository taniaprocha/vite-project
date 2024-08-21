import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { RepositoriesData } from "../../types";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineStarOutline } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import "./repositories.scss";

type RepositoriesProps = {
  language: string;
  repositoriesData: RepositoriesData;
  bookmarks: number[];
  onBookmark: (id: number) => void;
  loadMore: (language: string) => void;
};

export const Repositories = ({
  language,
  repositoriesData,
  bookmarks,
  onBookmark,
  loadMore,
}: RepositoriesProps) => {
  const listRef = useRef<HTMLDivElement>();

  const handleSlideLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= listRef.current?.clientWidth;
    }
  };
  const handleSlideRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current?.clientWidth;
      if (listRef.current?.scrollLeft >= listRef.current?.clientWidth) {
        loadMore(language);
      }
    }
  };

  if (!repositoriesData[language]) {
    return (
      <Stack alignItems="center" className="loading-repositories">
        <CircularProgress color="inherit" />
      </Stack>
    );
  } else if (repositoriesData[language].list.length === 0) {
    return (
      <Stack alignItems="center" className="loading-repositories">
        <Typography variant="body1">No repositories found</Typography>
      </Stack>
    );
  }

  return (
    <Box className="scroll-element">
      <Box ref={listRef} className="repo-list">
        <Box
          sx={{
            paddingLeft:
              listRef.current?.scrollWidth > listRef.current?.clientWidth
                ? "2rem"
                : "0",
            paddingRight:
              listRef.current?.scrollWidth > listRef.current?.clientWidth
                ? "2rem"
                : "0",
          }}
          className="repo-list-container"
        >
          <Stack direction="row" key={language} className="repo-container">
            {repositoriesData[language]?.list.map((repo) => {
              return (
                <a
                  key={repo.id}
                  className="repo-item"
                  href={repo.html_url}
                  target="_blank"
                >
                  <img
                    key={repo.id}
                    alt={repo.name}
                    src={repo.owner.avatar_url}
                  />
                  <Box className="name">
                    <Typography variant="caption">{repo.name}</Typography>
                  </Box>
                  <Box className="details">
                    <Typography variant="caption">
                      {`Stars ${repo.stargazers_count}`}
                    </Typography>
                  </Box>
                  <Button
                    className="bookmark"
                    onClick={(event) => {
                      event.preventDefault();
                      onBookmark(repo.id);
                    }}
                  >
                    {bookmarks.includes(repo.id) ? (
                      <GoStarFill size="2em" color="yellow" />
                    ) : (
                      <MdOutlineStarOutline size="2em" fill="yellow" />
                    )}
                  </Button>
                </a>
              );
            })}
          </Stack>
        </Box>
      </Box>
      {listRef.current?.scrollWidth > listRef.current?.clientWidth && (
        <Button className="repo-list-arrow-left" onClick={handleSlideLeft}>
          <IoIosArrowBack size="2rem" color="white" />
        </Button>
      )}
      {listRef.current?.scrollWidth > listRef.current?.clientWidth && (
        <Button className="repo-list-arrow-right" onClick={handleSlideRight}>
          <IoIosArrowForward size="2rem" color="white" />
        </Button>
      )}
    </Box>
  );
};
