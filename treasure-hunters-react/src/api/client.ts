import { type BaseSchema, type Output, parse } from "valibot";

export type AnyFetcher = (...args: any[]) => any;

export type ValibotFetcher<TFetcher extends AnyFetcher> = <
  TSchema extends BaseSchema,
>(
  schema: TSchema,
  ...args: Parameters<TFetcher>
) => Promise<Output<TSchema>>;

export const defaultFetcher = async (
  ...[url, init]: Parameters<typeof fetch>
) => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export function createValibotFetcher(): ValibotFetcher<typeof fetch>;

export function createValibotFetcher<TFetcher extends AnyFetcher>(
  /**
   * A fetcher function that returns the data you'd like to parse
   * with the schema.
   */
  fetcher: TFetcher
): ValibotFetcher<TFetcher>;
export function createValibotFetcher(
  fetcher: AnyFetcher = defaultFetcher
): ValibotFetcher<any> {
  return async (schema, ...args) => {
    const response = await fetcher(...args);
    return parse(schema, response);
  };
}
