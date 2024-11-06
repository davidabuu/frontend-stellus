
// wagmi-overrides.d.ts
declare module "@wagmi/core" {
  // Define a simplified version of deployContract to avoid type-checking issues.
  export declare function deployContract(
    config: any,
    parameters: any
  ): Promise<any>;

  // If you have other imports from @wagmi/core that are causing issues,
  // you can define them similarly with `any` as the type.
}
