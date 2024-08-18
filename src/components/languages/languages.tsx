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
  //"react",
];

type LanguagesProps = {
  selectedLanguages: string[];
  onSelect: (language: string) => void;
};

export const Languages = ({ selectedLanguages, onSelect }: LanguagesProps) => {
  console.log(selectedLanguages);
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
