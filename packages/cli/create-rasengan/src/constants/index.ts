/**
 * Project kind list
 */
export const Kinds = ['frontend', 'futon', 'server', 'monorepo'] as const;

export type Kind = (typeof Kinds)[number];

/**
 * Template list (frontend kind only)
 */
export const Templates = ['blank', 'tailwind', 'shadcn'];

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
  stable: '^1.2.1',
  beta: null,
};

export const githubTemplatesURL = {
  starter: 'https://github.com/rasengan-dev/rasenganjs-starter.git',
  chidori: 'https://github.com/rasengan-dev/chidori.git',
} as const;

export type GithubTemplatesURL =
  (typeof githubTemplatesURL)[keyof typeof githubTemplatesURL];
