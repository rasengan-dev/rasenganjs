/**
 * Template list
 */
export const Templates = ['blank', 'tailwind'];

/**
 * Language list
 */
export const Languages = ['typescript', 'javascript'];

/**
 * State manager list
 */
export const StateManagers = ['blank', 'gx', 'redux'];

/**
 * Tools list
 */
export const Tools = ['eslint', 'prettier'];

/**
 * Version list with stable and beta
 */
export const Versions: {
  stable: string;
  beta: string | null;
} = {
  stable: '^1.2.0',
  beta: null,
};

/*
 * Template github url
 * @type {string}
 */
export const TEMPLATE_GITHUB_URL: string =
  'https://github.com/rasengan-dev/rasenganjs.git';
