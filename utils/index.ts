export function isDev() {
  return process.env.NEXT_PUBLIC_VERSION === 'DEV';
}

export function isBeta() {
  return process.env.NEXT_PUBLIC_VERSION === 'BETA';
}
