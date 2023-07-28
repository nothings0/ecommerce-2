import axiosClient from "@/config/axiosConfig";
import { useMutation } from "design-system";

async function fetchFC(url: string, data: any) {
  const res = await axiosClient.get(url, data);
  return res.data;
}

export default function useUpdate(url: string, data: any) {
  return useMutation(
    () => {
      return fetchFC(url, data);
    },
    {
      onError: (error: any) => {},
      onSuccess: (data: any) => {},
    }
  );
}
