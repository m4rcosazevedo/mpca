export function filterParams<T extends object, K extends keyof T>(
  params: T
): T {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value != null && value !== '') {
      acc[key as K] = value as T[K]
    }

    return acc
  }, {} as T)
}
