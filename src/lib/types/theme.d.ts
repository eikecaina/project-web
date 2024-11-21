import { theme } from "lib/styles/theme";

type ThemeType = typeof theme;
declare module "@emotion/react" {
  export interface Theme extends ThemeType {
    name: string;
  }
}
