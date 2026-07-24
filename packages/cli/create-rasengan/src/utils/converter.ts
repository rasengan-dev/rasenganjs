// Convert seconds to minutes and seconds
export function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
}
