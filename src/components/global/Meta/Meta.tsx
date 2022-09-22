import React from 'react';
import Head from 'next/head';

export interface MetaProps {
  canonical?: string;
  description?: string;
  hasCanonical?: boolean;
  hideRobots?: boolean;
  robots?: string;
  title?: string;
}

function Meta({ title, description }: MetaProps) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,user-scalable=yes"
      />
      <meta name="description" content={description} />
      <link
        rel="shortcut icon"
        href="/static/favicon.ico"
        type="image/x-icon"
        key="shortcut icon"
      />
    </Head>
  );
}

export default Meta;
