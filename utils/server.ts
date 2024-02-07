import { SITE_TITLE } from "@/configs/site";
import { getCurrentLocale } from "@/locales/server";
import type { Metadata } from "next";

export const getServerPath = (path: string) => `/${getCurrentLocale()}${path}`;

export const generateTitle = (title?: string) =>
  title ? `${title} - ${SITE_TITLE}` : SITE_TITLE;

export const generateMeta = (title?: string, meta?: Metadata) => ({
  title: generateTitle(title),
  ...meta,
});
