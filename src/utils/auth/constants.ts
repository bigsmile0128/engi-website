// The hosted public key used to encrypt the users pkcs8 key when it is used to register a wallet with Engi
export const REGISTER_ENCRYPT_KEY_URL = '/api/engi/public-key';
// Prefixed local key storing the last signed in user
// - { walletId, accessToke }
export const USER_PERSISTED_STATE_KEY = 'ENGI_USER';
