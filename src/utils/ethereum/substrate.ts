// eslint-disable-next-line @typescript-eslint/no-var-requires
const uc = require('@polkadot/util-crypto');

export const substrateToHex = (address) => {
  const ar = uc.decodeAddress(address);

  return (
    '0x' +
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.from(ar, function (byte: any) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('')
  );
};
