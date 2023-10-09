export const isServer = () => typeof window === "undefined";

export const pluralize = (word: string, count: number) => {
  return count === 1 ? word : `${word}s`;
};
