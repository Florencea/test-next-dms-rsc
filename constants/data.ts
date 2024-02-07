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
  constructor({
    status,
    message,
  }: {
    status: keyof typeof Code;
    message: string;
  }) {
    super(message);
    this.status = status;
    this.message = message;
  }
  toMessage() {
    return { status: this.status, message: this.message };
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
