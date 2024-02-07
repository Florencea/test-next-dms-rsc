import { SITE_TITLE } from "@/configs/site";
import type { Metadata } from "next";

export const generateTitle = (title?: string) =>
  title ? `${title} - ${SITE_TITLE}` : SITE_TITLE;

export const generateMeta = (title?: string, meta?: Metadata) => ({
  title: generateTitle(title),
  ...meta,
});
