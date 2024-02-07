import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    en: () => import("./data/en"),
    tw: () => import("./data/tw"),
    jp: () => import("./data/jp"),
  });
