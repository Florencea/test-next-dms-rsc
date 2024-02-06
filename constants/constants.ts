export const COOKIE_PASSWORD = "Kpgdq5fYdE&Sy#FjouDCWaa5mwrL8QNd";

export const COOKIE_NAME = "tingarasec";

export const DEFAULT_PUBLIC_ROUTE = "/";

export const DEFAULT_PRIVATE_ROUTE = "/star";

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

export type ActionT<T = {}> = (
  prevState: unknown,
  formData: FormData,
) => Promise<{
  data?: T;
  status: keyof typeof Code;
  message: string;
}>;
