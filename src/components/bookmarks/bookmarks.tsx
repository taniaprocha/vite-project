import { Box, Button, Typography } from "@mui/material";
import "./bookmarks.scss";
import { BookmarkType } from "../../types";
import { GoStarFill } from "react-icons/go";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type BookmarksProps = {
  bookmarks: BookmarkType[];
  onRemoveBookmark: (id: number) => void;
};

export const Bookmarks = ({ bookmarks, onRemoveBookmark }: BookmarksProps) => {
  const listRef = useRef<HTMLDivElement>();

  const handleSlideLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= listRef.current?.clientWidth;
    }
  };
  const handleSlideRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current?.clientWidth;
    }
  };

  if (bookmarks.length === 0) {
    return (
      <Box className="bookmarks-container">
        <Typography variant="body1">No bookmarks yet</Typography>
      </Box>
    );
  }

  return (
    <Box className="bookmarks-container">
      <Box className="list" ref={listRef}>
        {bookmarks.map((bookmark) => {
          return (
            <Box key={bookmark.id} className="bookmark">
              <img src={bookmark.image} alt={bookmark.name} />
              <Box className="name">
                <Typography variant="caption">{bookmark.name}</Typography>
              </Box>
              <Button
                className="bookmark"
                onClick={() => onRemoveBookmark(bookmark.id)}
              >
                <GoStarFill size="2em" color="yellow" />
              </Button>
            </Box>
          );
        })}
      </Box>
      <Button className="bookmarks-arrow-left" onClick={handleSlideLeft}>
        <IoIosArrowBack size="2rem" color="white" />
      </Button>
      <Button className="bookmarks-arrow-right" onClick={handleSlideRight}>
        <IoIosArrowForward size="2rem" color="white" />
      </Button>
    </Box>
  );
};
