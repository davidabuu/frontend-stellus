import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { http } from 'viem';
import config from 'configs/app';
import currentChain from 'lib/web3/currentChain';

const feature = config.features.blockchainInteraction;

const wagmiConfig = (() => {
  // Define `chains` as a tuple to satisfy TypeScript's requirement for at least one Chain element
  const chains = [currentChain] as const;

  const commonConfig = {
    chains,
    transports: {
      [currentChain.id]: http(
        feature.isEnabled ? '' : config.chain.rpcUrl || `${config.api.endpoint}/api/eth-rpc`
      ),
    },
    ssr: true,
    batch: { multicall: { wait: 100 } },
  };

  if (!feature.isEnabled) {
    return defaultWagmiConfig({
      ...commonConfig,
    });
  }

  return defaultWagmiConfig({
    ...commonConfig,
    multiInjectedProviderDiscovery: true,
  });
})();

export default wagmiConfig;
