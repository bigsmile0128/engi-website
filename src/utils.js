export function getEnv() {
  // NODE_ENV cannot be overridden with react-scripts
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  return process.env.REACT_APP_ENV || 'development';
}

export function isDevEnv() {
  return getEnv() === 'development';
}
