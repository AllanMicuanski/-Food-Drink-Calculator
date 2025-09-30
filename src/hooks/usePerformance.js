// src/hooks/usePerformance.js
import { useCallback, useMemo, useRef } from "react";

const usePerformance = () => {
  const performanceMetrics = useRef({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
  });

  const startRender = useCallback(() => {
    performanceMetrics.current.lastRenderTime = performance.now();
  }, []);

  const endRender = useCallback(() => {
    const endTime = performance.now();
    const renderTime = endTime - performanceMetrics.current.lastRenderTime;
    performanceMetrics.current.renderCount++;

    const { renderCount, averageRenderTime } = performanceMetrics.current;
    performanceMetrics.current.averageRenderTime =
      (averageRenderTime * (renderCount - 1) + renderTime) / renderCount;
  }, []);

  const getMetrics = useCallback(() => {
    return { ...performanceMetrics.current };
  }, []);

  const memoize = useCallback((fn, deps) => {
    return useMemo(fn, deps);
  }, []);

  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  return {
    startRender,
    endRender,
    getMetrics,
    memoize,
    throttle,
  };
};

export default usePerformance;
