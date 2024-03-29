import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    "en-US": () => import("./data/en-US"),
    "zh-TW": () => import("./data/zh-TW"),
    "ja-JP": () => import("./data/ja-JP"),
  });
