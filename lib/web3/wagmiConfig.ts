import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { http } from 'viem';
import { type CreateConfigParameters } from 'wagmi';

import config from 'configs/app';
import currentChain from 'lib/web3/currentChain';
const feature = config.features.blockchainInteraction;

const wagmiConfig = (() => {
  // Define chains as a tuple with at least one Chain item
  const chains: [typeof currentChain] = [currentChain];

  return defaultWagmiConfig({
    chains,
    multiInjectedProviderDiscovery: feature.isEnabled,
    transports: {
      [currentChain.id]: http(feature.isEnabled ? undefined : config.chain.rpcUrl || `${config.api.endpoint}/api/eth-rpc`),
    },
    projectId: feature.isEnabled ? feature.walletConnect.projectId : undefined,
    metadata: feature.isEnabled
      ? {
          name: `${config.chain.name} explorer`,
          description: `${config.chain.name} explorer`,
          url: config.app.baseUrl,
          icons: [config.UI.navigation.icon.default].filter(Boolean),
        }
      : undefined,
    auth: feature.isEnabled
      ? {
          email: true,
          socials: [],
        }
      : undefined,
    ssr: true,
    batch: { multicall: { wait: 100 } },
  });
})();

export default wagmiConfig;
