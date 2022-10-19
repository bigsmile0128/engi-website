export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return process.env.NEXT_PUBLIC_ENGI_ENV === 'mainnet';
}

export function isStaging() {
  return process.env.NEXT_PUBLIC_ENGI_ENV === 'testnet';
}
