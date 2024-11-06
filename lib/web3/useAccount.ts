import config from 'configs/app';

function useAccountFallback() {
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

const hook = config.features.blockchainInteraction.isEnabled ? useAccountFallback : useAccountFallback;

export default hook;
