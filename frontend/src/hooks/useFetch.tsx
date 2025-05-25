import { toast } from "sonner";
import { useCallback, useState } from "react";

export const useFetch = (callbackFunction: any, options?: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null | any>(null);

  const fn = useCallback(async (...args: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = options
        ? await callbackFunction(options, ...args)
        : await callbackFunction(...args); // ✅ skip if no options
      setData(response);
      return response;
    } catch (error: any) {
      toast.error(error.message);
      setIsError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [callbackFunction, options]);

  return { data, isLoading, isError, fn };
};
