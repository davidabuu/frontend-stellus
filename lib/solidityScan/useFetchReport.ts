import React from 'react';
import * as v from 'valibot';

import buildUrl from 'lib/api/buildUrl';
import useApiQuery from 'lib/api/useApiQuery';
import { SOLIDITY_SCAN_REPORT } from 'stubs/contract';

interface Params {
  hash: string;
}

const RESOURCE_NAME = 'contract_solidity_scan_report';
const ERROR_NAME = 'Invalid response schema';

export default function useFetchReport({ hash }: Params) {
  const query = useApiQuery(RESOURCE_NAME, {
    pathParams: { hash },
    queryOptions: {
      select: (response) => {
        // Directly using response without validation
        return response; // Return the response directly or handle it as needed
      },
      enabled: Boolean(hash),
      placeholderData: SOLIDITY_SCAN_REPORT,
      retry: 0,
    },
  });

  const errorMessage = query.error && 'message' in query.error ? query.error.message : undefined;

  React.useEffect(() => {
    if (errorMessage === ERROR_NAME) {
      fetch('/node-api/monitoring/invalid-api-schema', {
        method: 'POST',
        body: JSON.stringify({
          resource: RESOURCE_NAME,
          url: buildUrl(RESOURCE_NAME, { hash }, undefined, true),
        }),
      });
    }
  }, [errorMessage, hash]);

  return query;
}
