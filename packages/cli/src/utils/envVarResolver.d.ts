/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Resolves environment variables in a string.
 * Replaces $VAR_NAME, ${VAR_NAME}, and ${VAR_NAME:-DEFAULT_VALUE} with their corresponding
 * environment variable values. If the environment variable is not defined and no default
 * value is provided, the original placeholder is preserved.
 *
 * @param value - The string that may contain environment variable placeholders
 * @param customEnv - Optional record of environment variables to use before process.env
 * @returns The string with environment variables resolved
 *
 * @example
 * resolveEnvVarsInString("Token: $API_KEY") // Returns "Token: secret-123"
 * resolveEnvVarsInString("URL: ${BASE_URL}/api") // Returns "URL: https://api.example.com/api"
 * resolveEnvVarsInString("URL: ${MISSING_VAR:-https://default.com}") // Returns "URL: https://default.com"
 * resolveEnvVarsInString("Missing: $UNDEFINED_VAR") // Returns "Missing: $UNDEFINED_VAR"
 */
export declare function resolveEnvVarsInString(
  value: string,
  customEnv?: Record<string, string>,
): string;
/**
 * Recursively resolves environment variables in an object of any type.
 * Handles strings, arrays, nested objects, and preserves other primitive types.
 * Protected against circular references using a WeakSet to track visited objects.
 *
 * @param obj - The object to process for environment variable resolution
 * @returns A new object with environment variables resolved
 *
 * @example
 * const config = {
 *   server: {
 *     host: "$HOST",
 *     port: "${PORT}",
 *     enabled: true,
 *     tags: ["$ENV", "api"]
 *   }
 * };
 * const resolved = resolveEnvVarsInObject(config);
 */
export declare function resolveEnvVarsInObject<T>(
  obj: T,
  customEnv?: Record<string, string>,
): T;
