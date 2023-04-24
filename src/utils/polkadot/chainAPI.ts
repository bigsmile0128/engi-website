import { ApiPromise, WsProvider } from '@polkadot/api';

export default async () =>
  await ApiPromise.create({
    provider: new WsProvider(
      `wss://${process.env.NEXT_PUBLIC_ENGI_ENV}.engi.network:9944`
    ),
  });
