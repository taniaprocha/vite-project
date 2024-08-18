import { Chip, Stack } from "@mui/material";
import "./languages.scss";

const languagesAndSDKs = [
  "javascript",
  "python",
  "java",
  "php",
  "ruby",
  "typescript",
  "react",
  "angular",
  "vue",
  "django",
  "flask",
  "spring",
  "laravel",
];

type LanguagesProps = {
  selectedLanguages: string[];
  onSelect: (language: string) => void;
};

export const Languages = ({ selectedLanguages, onSelect }: LanguagesProps) => {
  console.log(selectedLanguages);
  return (
    <Stack className="languages" direction="row" spacing={2}>
      {languagesAndSDKs.map((language) => {
        return (
          <Chip
            key={language}
            onClick={() => onSelect(language)}
            variant={
              selectedLanguages.includes(language) ? "filled" : "outlined"
            }
            label={language}
          />
        );
      })}
    </Stack>
  );
};
