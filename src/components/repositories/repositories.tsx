import { Box, Stack } from "@mui/material";
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
            <a className="repo-item" href="#0">
              <img key={repo.id} alt={repo.name} src={repo.owner.avatar_url} />
            </a>
          );
        })}
      </Stack>
    </Box>
  );
};
