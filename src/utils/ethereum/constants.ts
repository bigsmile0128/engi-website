import Web3 from 'web3';

// Exact selector for fetching connected provider accounts
// - https://docs.metamask.io/guide/rpc-api.html#restricted-methods
export const ETHEREUM_REQUEST_ACCOUNTS_METHOD = 'eth_requestAccounts';
export const QUERY_KEY_CONNECT_ETHEREUM_EXTENSION =
  'CONNECT_ETHEREUM_EXTENSION';
export const NO_GLOBAL_ETHEREUM_ERROR_MESSAGE =
  'Cannot query extension connection without ethereum global.';

export const Web3Provider = new Web3(Web3.givenProvider);

// Formatted Ethereum contract address for buying ENGI w/ ETH
// - Mainnet: https://etherscan.io/address/0x59CE40c888a7bF39FE12e277cEeC1EB7f41Ef71a
// - Goerli: https://goerli.etherscan.io/address/0xF7150Be741157ef36EFF47D5464028b950a0df1C
export const PURCHASE_CONTRACT_ADDRESS = Web3.utils.toChecksumAddress(
  process.env.NEXT_PUBLIC_ENGI_PURCHASE_CONTRACT_ADDRESS
);
