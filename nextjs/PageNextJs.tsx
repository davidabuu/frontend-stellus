import Head from 'next/head';
import React from 'react';

import type { Route } from 'nextjs-routes';
import type { Props as PageProps } from 'nextjs/getServerSideProps';

import config from 'configs/app';
import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import * as mixpanel from 'lib/mixpanel';
import { init as initSentry } from 'lib/sentry/config';

interface Props<Pathname extends Route['pathname']> {
  pathname: Pathname;
  children: React.ReactNode;
  query?: PageProps<Pathname>['query'];
}

initSentry();

const PageNextJs = <Pathname extends Route['pathname']>(props: Props<Pathname>) => {
  useGetCsrfToken();
  useAdblockDetect();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <Head>
        {/* Title and meta tags are removed since metadata.generate is no longer used */}
        <title>Ozura Legder Explorer</title>
        <meta name="description" content="Default description"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content={ config.app.host }/>
      </Head>
      { props.children }
    </>
  );
};

export default React.memo(PageNextJs);
