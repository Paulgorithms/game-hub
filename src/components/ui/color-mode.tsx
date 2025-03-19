"use client";

import type { IconButtonProps, HTMLChakraProps } from "@chakra-ui/react";
import { IconButton, chakra } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { Moon as LuMoon, Sun as LuSun } from "lucide-react"; // ✅ Correct import

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
      sx={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  );
});

export const LightMode = React.forwardRef<
  HTMLSpanElement,
  HTMLChakraProps<"span">
>(function LightMode(props, ref) {
  return (
    <chakra.span
      color="fg"
      display="contents"
      className="chakra-theme light"
      ref={ref}
      {...props}
    />
  );
});

export const DarkMode = React.forwardRef<
  HTMLSpanElement,
  HTMLChakraProps<"span">
>(function DarkMode(props, ref) {
  return (
    <chakra.span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      ref={ref}
      {...props}
    />
  );
});
