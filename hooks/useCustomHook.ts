import { useQuery } from "@tanstack/react-query";

// testを試すためのカスタムフック
export function useCustomHook() {
  return useQuery({
    queryKey: ['customHook'],
    queryFn: () => 'sample'
  });
}
