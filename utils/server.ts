import { getCurrentLocale } from "@/locales/server";

export const getServerPath = (path: string) => `/${getCurrentLocale()}${path}`;
