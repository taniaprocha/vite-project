import { Chip, Stack } from "@mui/material";

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
    <Stack direction="row" rowGap={1} columnGap={2} flexWrap="wrap">
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
