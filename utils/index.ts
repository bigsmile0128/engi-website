export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isBeta() {
  return isDev() || process.env.NEXT_PUBLIC_VERSION === 'beta';
}

export function isProd() {
  return process.env.NEXT_PUBLIC_VERSION === 'production';
}
