import type { FieldData } from "rc-field-form/es/interface";
import type { ZodError } from "zod";

export const Code = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
export class DataError extends Error {
  status: keyof typeof Code;
  zodError?: ZodError;
  fieldData?: FieldData[];
  constructor({
    status,
    message,
    zodError,
    fieldData,
  }: {
    status: keyof typeof Code;
    message: string;
    zodError?: ZodError;
    fieldData?: FieldData[];
  }) {
    super(message);
    this.status = status;
    this.message = message;
    this.zodError = zodError;
    this.fieldData = fieldData;
  }
  toMessage() {
    return {
      status: this.status,
      message: this.message,
      zodError: this.zodError?.flatten(),
      fieldData: this.fieldData,
    };
  }
}
export type ActionT<D = {}> = (
  prevState: unknown,
  formData: FormData,
) => Promise<{
  data?: D;
  status: keyof typeof Code;
  message?: string;
}>;
export const MSG_DURATION = 4500;
export type ListT<D> = {
  list: D[];
  total: number;
};
