import { useQuery } from '@tanstack/react-query';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';

const feature = config.features.addressProfileAPI;

type AddressInfoApiQueryResponse = {
  user_profile: {
    username: string | null;
  };
};

const ERROR_NAME = 'Invalid response schema';

export default function useAddressProfileApiQuery(hash: string | undefined, isEnabled = true) {
  const fetch = useFetch();

  return useQuery<unknown, ResourceError<unknown>, AddressInfoApiQueryResponse>({
    queryKey: ['username_api', hash],
    queryFn: async () => {
      if (!feature.isEnabled || !hash) {
        return Promise.reject(new Error('Feature is disabled or hash is missing.'));
      }

      // Fetch the data from the API using the provided hash
      return fetch(
        feature.apiUrlTemplate.replace('{address}', hash),
        undefined,
        { omitSentryErrorLog: true }
      );
    },
    enabled: isEnabled && Boolean(hash),
    refetchOnMount: false,
    select: (response) => {
      // Assuming response matches AddressInfoApiQueryResponse structure
      const responseObj = response as AddressInfoApiQueryResponse;
      
      if (!responseObj.user_profile || typeof responseObj.user_profile.username !== 'string' && responseObj.user_profile.username !== null) {
        throw new Error(ERROR_NAME);
      }

      return responseObj;
    },
  });
}
