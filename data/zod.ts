import { getScopedI18n } from "@/locales/server";
import dayjs from "dayjs";
import type { FieldData } from "rc-field-form/es/interface";
import { ZodIssueCode, ZodParsedType, type ZodError } from "zod";

export const convertZodError = async (
  zodError: ZodError,
): Promise<FieldData[]> => {
  const t = await getScopedI18n("zod");
  const { issues } = zodError;
  const data = issues.map((issue) => {
    let message = "";
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = t("errors.invalid_type_received_undefined");
        } else if (issue.received === ZodParsedType.null) {
          message = t("errors.invalid_type_received_null");
        } else {
          message = t("errors.invalid_type", {
            expected: t(`types.${issue.expected}`),
            received: t(`types.${issue.received}`),
          });
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = t("errors.invalid_literal", {
          expected: JSON.stringify(issue.expected),
        });
        break;
      case ZodIssueCode.unrecognized_keys:
        message = t("errors.unrecognized_keys", {
          keys: issue.keys.join(", "),
        });
        break;
      case ZodIssueCode.invalid_union:
        message = t("errors.invalid_union");
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = t("errors.invalid_union_discriminator", {
          options: issue.options.join(""),
        });
        break;
      case ZodIssueCode.invalid_enum_value:
        message = t("errors.invalid_enum_value", {
          options: issue.options.join(""),
          received: issue.received,
        });
        break;
      case ZodIssueCode.invalid_arguments:
        message = t("errors.invalid_arguments");
        break;
      case ZodIssueCode.invalid_return_type:
        message = t("errors.invalid_return_type");
        break;
      case ZodIssueCode.invalid_date:
        message = t("errors.invalid_date");
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("startsWith" in issue.validation) {
            message = t(`errors.invalid_string.startsWith`, {
              startsWith: issue.validation.startsWith,
            });
          } else if ("endsWith" in issue.validation) {
            message = t(`errors.invalid_string.endsWith`, {
              endsWith: issue.validation.endsWith,
            });
          }
        } else {
          if (
            issue.validation === "email" ||
            issue.validation === "url" ||
            issue.validation === "uuid" ||
            issue.validation === "cuid" ||
            issue.validation === "datetime"
          ) {
            message = t(`errors.invalid_string.${issue.validation}`, {
              validation: t(`validations.${issue.validation}`),
            });
          } else {
            message = t("errors.invalid_string.regex");
          }
        }
        break;
      case ZodIssueCode.too_small:
        const minimum =
          issue.type === "date"
            ? dayjs(issue.minimum.toString()).format("YYYY-MM-DD HH:mm:ss")
            : issue.minimum.toString();
        message = t(
          `errors.too_small.${issue.type}.${
            issue.exact
              ? "exact"
              : issue.inclusive
                ? "inclusive"
                : "not_inclusive"
          }`,
          {
            minimum,
          },
        );
        break;
      case ZodIssueCode.too_big:
        const maximum =
          issue.type === "date"
            ? dayjs(issue.maximum.toString()).format("YYYY-MM-DD HH:mm:ss")
            : issue.maximum.toString();
        message = t(
          `errors.too_big.${issue.type}.${
            issue.exact
              ? "exact"
              : issue.inclusive
                ? "inclusive"
                : "not_inclusive"
          }`,
          {
            maximum,
          },
        );
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = t("errors.invalid_intersection_types");
        break;
      case ZodIssueCode.not_multiple_of:
        message = t("errors.not_multiple_of", {
          multipleOf: issue.multipleOf.toString(),
        });
        break;
      case ZodIssueCode.not_finite:
        message = t("errors.not_finite");
        break;
      default:
    }
    return { name: issue.path, errors: [message] };
  });
  return data;
};
