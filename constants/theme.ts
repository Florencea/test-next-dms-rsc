import tailwindConfig from "@/tailwind.config";
import type { ThemeConfig } from "antd";

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;
/**
 * Layout 左側選單寬度
 */
export const MENU_WIDTH = 200;
/**
 * Layout 頂部選單高度
 */
export const NAV_HEIGHT = 64;
/**
 * Layout 頂部選單內距
 */
export const NAV_PADDING = 20;

export const theme: ThemeConfig = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorInfo: PRIMARY_COLOR,
  },
  components: {
    Layout: {
      headerHeight: NAV_HEIGHT,
      headerPadding: NAV_PADDING,
      headerBg: "#fff",
      siderBg: "#fff",
    },
  },
};
