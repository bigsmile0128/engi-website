const uc = require('@polkadot/util-crypto');

export const substrateToHex = (address) => {
  const ar = uc.decodeAddress(address);

  return (
    '0x' +
    Array.from(ar, function (byte: any) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('')
  );
};
