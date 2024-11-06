import React from 'react';
import * as mixpanel from 'lib/mixpanel/index';

interface Params {
  source: mixpanel.EventPayload<mixpanel.EventTypes.WALLET_CONNECT>['Source'];
}

export default function useWeb3Wallet({ source }: Params) {
  const [isOpening, setIsOpening] = React.useState(false);
  const [isClientLoaded, setIsClientLoaded] = React.useState(false);
  const isConnectionStarted = React.useRef(false);
  const [address, setAddress] = React.useState<string | undefined>(undefined);
  const [isDisconnected, setIsDisconnected] = React.useState(true);

  React.useEffect(() => {
    setIsClientLoaded(true); // Mimic client load state
  }, []);

  const handleConnect = React.useCallback(async () => {
    setIsOpening(true);
    // Simulate the wallet connection, replace with your connection logic
    setAddress("0xSomeAddress");  // Example address, replace with actual connection logic
    setIsOpening(false);
    mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Started' });
    isConnectionStarted.current = true;
  }, [source]);

  const handleAccountConnected = React.useCallback(({ isReconnected }: { isReconnected: boolean }) => {
    if (!isReconnected && isConnectionStarted.current) {
      mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Connected' });
      mixpanel.userProfile.setOnce({
        'With Connected Wallet': true,
      });
    }
    isConnectionStarted.current = false;
  }, [source]);

  const handleDisconnect = React.useCallback(() => {
    setAddress(undefined); // Clear the address on disconnect
    setIsDisconnected(true);

    // Log the disconnect event
    mixpanel.logEvent(mixpanel.EventTypes.WALLET_DISCONNECT, { Source: source, Status: 'Disconnected' });
  }, [source]);

  // Simulate account connection handling based on address
  React.useEffect(() => {
    if (address && !isDisconnected) {
      handleAccountConnected({ isReconnected: false });
    }
  }, [address, isDisconnected, handleAccountConnected]);

  const isConnected = isClientLoaded && !isDisconnected && address !== undefined;

  return React.useMemo(() => ({
    connect: handleConnect,
    disconnect: handleDisconnect,
    isOpen: isOpening,
    isConnected,
    address,
  }), [handleConnect, handleDisconnect, isOpening, isConnected, address]);
}
