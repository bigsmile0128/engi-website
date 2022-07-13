export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function isBeta() {
  return process.env.NEXT_PUBLIC_VERSION === 'BETA';
}
