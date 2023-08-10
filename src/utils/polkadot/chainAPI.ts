import { ApiPromise, WsProvider } from '@polkadot/api';

export default async () => {
  const chainRPCWSUrl =
    process.env.NEXT_PUBLIC_ENGI_ENV === 'local'
      ? 'ws://127.0.0.1:9944'
      : `wss://${process.env.NEXT_PUBLIC_ENGI_ENV}.engi.network:9944`;

  return await ApiPromise.create({
    provider: new WsProvider(chainRPCWSUrl),
  });
};
