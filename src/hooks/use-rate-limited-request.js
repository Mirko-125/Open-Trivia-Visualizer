import { useState, useRef, useCallback } from "react";

const MIN_REQUEST_INTERVAL = 5000; // 5 seconds ||

export const useRateLimitedRequest = (apiFunction, minInterval = MIN_REQUEST_INTERVAL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastRequestTime = useRef(0);

  const getTimeUntilNextCall = useCallback(() => {
    const timeSinceLastRequest = Date.now() - lastRequestTime.current;
    const timeRemaining = minInterval - timeSinceLastRequest;
    return timeRemaining > 0 ? timeRemaining : 0;
  }, [minInterval]);

  const canCall = useCallback(() => {
    return getTimeUntilNextCall() === 0;
  }, [getTimeUntilNextCall]);

  const call = useCallback(
    async (...args) => {
      const timeUntilNext = getTimeUntilNextCall();
      if (timeUntilNext > 0) {
        const waitTime = Math.ceil(timeUntilNext / 1000);
        const errorMsg = `Please wait ${waitTime} seconds before making another request.`;
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        lastRequestTime.current = Date.now();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, getTimeUntilNextCall]
  );

  return {
    call,
    loading,
    error,
    canCall,
    timeUntilNextCall: getTimeUntilNextCall,
  };
};
