import { useCurrentLocale } from "@/locales/client";

export const useClientPath = (path: string) => {
  const currentLocale = useCurrentLocale();
  return `/${currentLocale}${path}`;
};
