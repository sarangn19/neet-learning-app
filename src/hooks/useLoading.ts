import { useState, useEffect, useCallback } from 'react';

interface UseLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { delay = 0, minDuration = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setShowContent(false);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 50);
  }, []);

  const loadData = useCallback(async <T,>(
    fetchFn: () => Promise<T>
  ): Promise<T | null> => {
    startLoading();
    const startTime = Date.now();

    try {
      const result = await fetchFn();
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      await new Promise(resolve => setTimeout(resolve, remaining + delay));
      return result;
    } catch (error) {
      console.error('Loading error:', error);
      return null;
    } finally {
      stopLoading();
    }
  }, [delay, minDuration, startLoading, stopLoading]);

  return {
    isLoading,
    showContent,
    startLoading,
    stopLoading,
    loadData,
  };
}

export function useSplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Check if user has seen splash screen in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setShowSplash(false);
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setAppReady(true);
    sessionStorage.setItem('hasSeenSplash', 'true');
  }, []);

  return {
    showSplash,
    appReady,
    handleSplashComplete,
  };
}
