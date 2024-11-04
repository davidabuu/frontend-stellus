// types/client/token.ts

export interface Metadata {
  name?: string;
  description?: string;
  attributes?: Array<MetadataAttributes>;
}

export interface MetadataAttributes {
  value: string;            // The value of the attribute, which can be a string or number.
  trait_type: string;       // The type of trait (e.g., color, size).
  value_type?: 'URL';      // Optional, indicates if the value is a URL.
}

export interface AttributeItem {
  trait_type: string;       // The type of trait (e.g., color, size).
  value: string | number;   // The value of the trait, can be a string or number.
  display_type?: string;    // Optional display type, like 'boost_number' or 'date'.
}

export interface BridgedTokenChain {
  id: string;              // Unique identifier for the chain.
  title: string;           // Full name of the chain.
  short_title: string;     // Shortened name for display purposes.
  base_url: string;        // Base URL for the chain.
}

export interface TokenBridge {
  type: string;            // The type of bridge (e.g., ERC20, ERC721).
  title: string;           // Full name of the bridge.
  short_title: string;     // Shortened name for display purposes.
}
