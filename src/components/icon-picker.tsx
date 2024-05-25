"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IconPickerProps {
  onChange: (emoji: string) => void;
  children: React.ReactNode;
}

const IconPicker = ({ children, onChange }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(emojiData) => onChange(emojiData.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
