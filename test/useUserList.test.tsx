import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useCustomHook } from "@/hooks/useCustomHook";
import { describe, expect, test } from "@jest/globals";

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe('useCustomHook Test', () => {
  test('useCustomHookの返り値が sample になること', async () => {
    const { result } = renderHook(() => useCustomHook(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data).toEqual('sample'));
  })
});
