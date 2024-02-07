import { useI18n } from "@/locales/client";
import dayjs, { Dayjs } from "dayjs";

export const useFormat = () => {
  const emptyText = "-";
  const datetimeFormat = "YYYY-MM-DD HH:mm:ss";
  const t = useI18n();
  return {
    renderText: (content: unknown) =>
      typeof content === "string" || typeof content === "number"
        ? `${content}`
        : emptyText,
    renderDatetime: (content: unknown) =>
      (typeof content === "string" ||
        content instanceof Date ||
        content instanceof Dayjs) &&
      dayjs(content).isValid()
        ? dayjs(content).format(datetimeFormat)
        : emptyText,
    renderBoolean: (content: unknown) =>
      typeof content === "boolean" ? (content ? t("yes") : t("no")) : emptyText,
  };
};
