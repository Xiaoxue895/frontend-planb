// Configuration utilities for development and production modes

/**
 * Check if authentication skip is enabled (for testing/development only)
 * This should NEVER be true in production
 */
export const isAuthSkipEnabled = (): boolean => {
  return import.meta.env.VITE_ENABLE_AUTH_SKIP === 'true';
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

/**
 * Check if we're in production mode
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

/**
 * Get all configuration for development features
 */
export const getDevConfig = () => ({
  authSkipEnabled: isAuthSkipEnabled(),
  isDev: isDevelopment(),
  isProd: isProduction(),
});

// Log configuration in development for debugging
if (isDevelopment()) {
  console.log('🔧 Development Configuration:', getDevConfig());
} 