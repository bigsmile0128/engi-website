import { REGISTER_ENCRYPT_KEY_URL } from './constants';
const { Keyring } = require('@polkadot/keyring');
const { u8aToBuffer } = require('@polkadot/util');

// Encrypt a user's pkcs8 key to be registered on Engi
export const encryptMnemonic = async (mnemonic: string) => {
  const { JSEncrypt } = require('jsencrypt');

  const publicKey = await fetch(REGISTER_ENCRYPT_KEY_URL).then((r) => r.text());

  const rsa = new JSEncrypt();
  rsa.setPublicKey(publicKey);

  const pair = new Keyring().addFromMnemonic(mnemonic, undefined, 'sr25519');

  const pkcs8 = u8aToBuffer(pair.encodePkcs8());
  const base64 = pkcs8.toString('base64');

  return rsa.encrypt(base64);
};
