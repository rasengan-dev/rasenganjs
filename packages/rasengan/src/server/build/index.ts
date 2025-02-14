export interface BuildOptions {
  buildDirectory: string;
  manifestPathDirectory: string;
  assetPathDirectory: string;
  entryServerPath: string;
}

const defaultBuildDirectory = "./dist";

export const resolveBuildOptions = (buildPath = defaultBuildDirectory): BuildOptions => {
  return {
    buildDirectory: buildPath,
    manifestPathDirectory: 'client/.vite',
    assetPathDirectory: 'client/assets',
    entryServerPath: 'server/entry.server.js',
  };
};