import { describe, it, expect } from 'vitest';
import {
  HttpError,
  NotFoundError,
  MethodNotAllowedError,
  InternalServerError,
} from '../../errors/index.js';

describe('HttpError', () => {
  it('sets status and default message', () => {
    const err = new HttpError(404);
    expect(err.status).toBe(404);
    expect(err.message).toBe('Not Found');
    expect(err.name).toBe('HttpError');
  });

  it('sets custom message', () => {
    const err = new HttpError(418, "I'm a teapot");
    expect(err.status).toBe(418);
    expect(err.message).toBe("I'm a teapot");
  });

  it('falls back to Unknown Error for unrecognised status', () => {
    const err = new HttpError(999);
    expect(err.message).toBe('Unknown Error');
  });
});

describe('NotFoundError', () => {
  it('has status 404', () => {
    const err = new NotFoundError();
    expect(err.status).toBe(404);
    expect(err.message).toBe('Not Found');
    expect(err.name).toBe('NotFoundError');
  });

  it('accepts custom message', () => {
    const err = new NotFoundError('Page not found');
    expect(err.message).toBe('Page not found');
  });
});

describe('MethodNotAllowedError', () => {
  it('has status 405', () => {
    const err = new MethodNotAllowedError();
    expect(err.status).toBe(405);
    expect(err.message).toBe('Method Not Allowed');
    expect(err.name).toBe('MethodNotAllowedError');
  });
});

describe('InternalServerError', () => {
  it('has status 500', () => {
    const err = new InternalServerError();
    expect(err.status).toBe(500);
    expect(err.message).toBe('Internal Server Error');
    expect(err.name).toBe('InternalServerError');
  });

  it('accepts custom message', () => {
    const err = new InternalServerError('DB connection failed');
    expect(err.message).toBe('DB connection failed');
  });
});

it('NotFoundError is instance of HttpError', () => {
  expect(new NotFoundError()).toBeInstanceOf(HttpError);
});

it('MethodNotAllowedError is instance of HttpError', () => {
  expect(new MethodNotAllowedError()).toBeInstanceOf(HttpError);
});

it('InternalServerError is instance of HttpError', () => {
  expect(new InternalServerError()).toBeInstanceOf(HttpError);
});

it('HttpError is instance of Error', () => {
  expect(new HttpError(500)).toBeInstanceOf(Error);
});
