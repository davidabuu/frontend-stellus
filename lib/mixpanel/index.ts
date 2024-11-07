import getPageType from './getPageType';
import getUuid from './getUuid';
import logEvent from './logEvent';  // Import logEvent from './logEvent'
import useInit from './useInit';
import useLogPageView from './useLogPageView';
import * as userProfile from './userProfile';

export * from './utils';

export {
  useInit,
  useLogPageView,
  logEvent,
  getPageType,
  getUuid,
  userProfile,
};

// Define the EventTypes interface to include the necessary event types
export interface EventTypes {
  WALLET_CONNECT: 'Started' | 'Connected';
  WALLET_DISCONNECT: 'Disconnected';  // Adding WALLET_DISCONNECT event type
}

// Define the EventPayload interface, which describes the structure of the event payload
export interface EventPayload<T> {
  Source: string;
  Status: T;  // Status can be 'Started', 'Connected', or 'Disconnected'
}

// Rename the local logEvent function to logMixpanelEvent to avoid conflict
export function logMixpanelEvent<T extends keyof EventTypes>(event: T, payload: EventPayload<EventTypes[T]>) {
  console.log(`Event: ${event}`, payload);
  // Add the actual Mixpanel logging logic here
}
