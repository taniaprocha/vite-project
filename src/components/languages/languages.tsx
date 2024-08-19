import { Chip, Stack } from "@mui/material";
import "./languages.scss";

export const languages = [
  "vue",
  "javascript",
  "python",
  "java",
  "php",
  "ruby",
  "typescript",
  "kotlin",
  "c#",
  "go",
];

type LanguagesProps = {
  selectedLanguages: string[];
  onSelect: (language: string) => void;
};

export const Languages = ({ selectedLanguages, onSelect }: LanguagesProps) => {
  return (
    <Stack className="languages" direction="row" spacing={2}>
      {languages.map((language) => {
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
