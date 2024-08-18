import { Box, Stack, Typography } from "@mui/material";
import { RepositoriesData } from "../../types";
import "./repositories.scss";

type RepositoriesProps = {
  language: string;
  repositoriesData: RepositoriesData;
};

export const Repositories = ({
  language,
  repositoriesData,
}: RepositoriesProps) => {
  return (
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
              <img key={repo.id} alt={repo.name} src={repo.owner.avatar_url} />
              <Box className="name">
                <Typography variant="caption">{repo.name}</Typography>
              </Box>
            </a>
          );
        })}
      </Stack>
    </Box>
  );
};
