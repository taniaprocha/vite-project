import { Box, Button, Stack, Typography } from "@mui/material";
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
};

export const Repositories = ({
  language,
  repositoriesData,
  bookmarks,
  onBookmark,
}: RepositoriesProps) => {
  const listRef = useRef<HTMLDivElement>();

  const handleSlideLeft = () => {
    if (listRef.current && listRef.current.scrollLeft >= 0) {
      listRef.current.scrollLeft -= listRef.current?.clientWidth;
    }
  };
  const handleSlideRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current?.clientWidth;
    }
  };

  return (
    <Box className="scroll-element">
      <Box ref={listRef} className="repo-list">
        <Box className="repo-list-container">
          <Stack direction="row" key={language} className="repo-container">
            {repositoriesData[language]?.map((repo) => {
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
                  <Button
                    className="bookmark"
                    onClick={(event) => {
                      event.preventDefault();
                      onBookmark(repo.id);
                    }}
                  >
                    {bookmarks.includes(repo.id) ? (
                      <GoStarFill size="3em" color="black" />
                    ) : (
                      <MdOutlineStarOutline size="3em" color="black" />
                    )}
                  </Button>
                </a>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Button className="repo-list-arrow-left" onClick={handleSlideLeft}>
        <IoIosArrowBack size="2rem" color="white" />
      </Button>
      <Button className="repo-list-arrow-right" onClick={handleSlideRight}>
        <IoIosArrowForward size="2rem" color="white" />
      </Button>
    </Box>
  );
};
