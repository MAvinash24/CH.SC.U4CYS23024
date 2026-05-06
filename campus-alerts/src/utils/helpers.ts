export const getMinutesAgo = (timestamp: string) => {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();

  return Math.floor((now - time) / (1000 * 60));
};