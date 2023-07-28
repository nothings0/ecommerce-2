import axiosClient from "@/config/axiosConfig";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from "design-system";

async function fetchFC<T = unknown>(url: string): Promise<T> {
  const res = await axiosClient.get(url);
  return res.data;
}

export default function useFetch<
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  url: string,
  config?: UseQueryOptions<TData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  return useQuery(queryKey, () => fetchFC<TData>(url), config);
}
