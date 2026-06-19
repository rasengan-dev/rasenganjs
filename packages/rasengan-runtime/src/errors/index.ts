/**
 * Errors package — standard HTTP error hierarchy.
 *
 * Every error carries a numeric `status` so the Application
 * can map it directly to an HTTP response status code.
 */

/**
 * Generic HTTP error. Thrown (or stored) anywhere in the
 * middleware chain.  The Application's error handler
 * catches these and responds with the appropriate status.
 */
export class HttpError extends Error {
  /** The HTTP status code (e.g. 404, 500) */
  status: number;

  constructor(status: number, message?: string) {
    super(message || STATUS_MESSAGES[status] || 'Unknown Error');
    this.name = 'HttpError';
    this.status = status;
  }
}

/** 404 Not Found */
export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

/** 405 Method Not Allowed */
export class MethodNotAllowedError extends HttpError {
  constructor(message = 'Method Not Allowed') {
    super(405, message);
    this.name = 'MethodNotAllowedError';
  }
}

/** 500 Internal Server Error */
export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
    this.name = 'InternalServerError';
  }
}

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  409: 'Conflict',
  413: 'Payload Too Large',
  415: 'Unsupported Media Type',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};
