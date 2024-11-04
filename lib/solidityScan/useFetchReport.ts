import React from 'react';
import * as v from 'valibot';

import buildUrl from 'lib/api/buildUrl';
import useApiQuery from 'lib/api/useApiQuery';
import { SOLIDITY_SCAN_REPORT } from 'stubs/contract';

// Define a schema for the expected response shape
const responseSchema = v.object({
  // Define the expected properties of the response here
  // Adjust according to the actual response structure
  contractname: v.string(),
  scan_status: v.string(),
  issues: v.array(
    v.object({
      severity: v.string(),
      description: v.string(),
    })
  ),
  // Add more properties as needed
});

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
        // Validate response against the schema
        const parsedResponse = v.safeParse(responseSchema, response);

        // Check if the response is valid
        if (!parsedResponse.success) {
          throw new Error(ERROR_NAME);
        }

        return parsedResponse.output; // Return the parsed and validated output
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
