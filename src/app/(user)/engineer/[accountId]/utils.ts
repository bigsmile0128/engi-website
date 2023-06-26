export function isCurrentUser(accountId, user) {
  return accountId !== 'current' || accountId === user?.walletId;
}
