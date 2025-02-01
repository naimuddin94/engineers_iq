/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";

import { envConfig } from "@/config";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

// Custom Fetch Function with Interceptor
export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Request Interceptor: Add headers, auth tokens, etc.
  const modifiedOptions = {
    ...options,
    headers: {
      cookie: `accessToken=${accessToken}`,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(
      `${envConfig.api_host}${endpoint}`,
      modifiedOptions,
    );

    // Parse JSON response
    return response.json();
  } catch (error: any) {
    throw error;
  }
}
