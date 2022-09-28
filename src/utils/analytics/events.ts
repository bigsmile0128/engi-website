export const emitCreateWalletEvent = (walletId: string) => {
  if (typeof window === undefined) return;

  window.gtag('event', 'create_wallet', { walletId });
};
