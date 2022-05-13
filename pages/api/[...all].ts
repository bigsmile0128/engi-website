import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const proxyOptions = [
    {
      target: process.env.API_URL,
      pathRewrite: [
        {
          patternStr: '^/api',
          replaceStr: '',
        },
      ],
    },
  ];

  const proxyOption = proxyOptions.find(({ pathRewrite }) => {
    return pathRewrite.some(({ patternStr }) =>
      RegExp(patternStr).test(req?.url)
    );
  });

  if (proxyOption) {
    return httpProxyMiddleware(req, res, proxyOption);
  } else {
    return res.status(404).send(null);
  }
};
