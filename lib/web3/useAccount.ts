// Remove wagmi imports
// import type { UseAccountReturnType } from 'wagmi';
// import { useAccount } from 'wagmi';

import config from 'configs/app';

// Define a fallback hook for `useAccount`
function useAccountFallback(): any {
  return {
    address: undefined,
    addresses: undefined,
    chain: undefined,
    chainId: undefined,
    connector: undefined,
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
    isReconnecting: false,
    status: 'disconnected',
  };
}

// Use the fallback instead of wagmi's useAccount
const hook = config.features.blockchainInteraction.isEnabled ? useAccountFallback : useAccountFallback;

export default hook;
