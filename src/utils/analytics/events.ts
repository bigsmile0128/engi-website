export const emitRegisterWalletAnalyticsEvent = (
  address: string,
  display: string,
  email: string,
  source: string
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'register_account', {
    address,
    display,
    email,
    source,
  });
};

export const emitRegisterWalletErrorAnalyticsEvent = (
  error: any,
  address: string,
  display: string,
  email: string,
  source: string
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_register_account', {
    error,
    address,
    display,
    email,
    source,
  });
};

export const emitLoginAnalyticsEvent = (
  accessToken: string,
  address: string,
  display: string,
  source: string
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'login', { accessToken, address, display, source });
};

export const emitLoginErrorAnalyticsEvent = (
  error: any,
  address: string,
  display: string,
  source: string
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_login', { error, address, display, source });
};

export const emitFoundJobsAnalyticsEvent = (jobs: number, address?: string) => {
  if (typeof window === undefined) return;

  console.log('emitting found jobs event', jobs, address);

  window?.gtag?.('event', 'jobs', { jobs, address });
};

export const emitFoundJobsErrorAnalyticsEvent = (
  error: any,
  address?: string
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_jobs', { error, address });
};

export const emitBoughtEngiAnalyticsEvent = (
  address: string,
  amount: number
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'bought_engi', { address, amount });
};

export const emitBoughtEngiErrorAnalyticsEvent = (
  error: any,
  address: string,
  amount: number
) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_bought_engi', { error, address, amount });
};

export const emitConnectedPolkadotExtensionAnalyticsEvent = () => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'connected_polkadot_extension');
};

export const emitConnectedEthereumExtensionAnalyticsEvent = () => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'connected_ethereum_extension');
};

export const emitJoinNewsletterEvent = (email: string) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'newsletter', { email });
};

export const emitJoinNewsletterErrorEvent = (error: any, email: string) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_newsletter', { email });
};

export const emitContactUsEvent = (email: string) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'contact_us', { email });
};

export const emitContactUsErrorEvent = (error: any, email: string) => {
  if (typeof window === undefined) return;

  window?.gtag?.('event', 'error_contact_us', { email });
};
