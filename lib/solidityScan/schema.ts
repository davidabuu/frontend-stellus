import * as v from 'valibot';

// Define the schema for issue severity distribution
export const SolidityScanIssueSeverityDistributionSchema = v.shape({
  critical: v.number(),
  gas: v.number(),
  high: v.number(),
  informational: v.number(),
  low: v.number(),
  medium: v.number(),
});

// Define the main schema for Solidity scan report
export const SolidityScanSchema = v.shape({
  scan_report: v.shape({
    contractname: v.string(),
    scan_status: v.string(),
    scan_summary: v.shape({
      score_v2: v.string(),
      issue_severity_distribution: SolidityScanIssueSeverityDistributionSchema,
    }),
    scanner_reference_url: v.string(),
  }),
});

// Define types for the inferred outputs
export type SolidityScanReport = v.InferOutput<typeof SolidityScanSchema>;
export type SolidityScanReportSeverityDistribution = v.InferOutput<typeof SolidityScanIssueSeverityDistributionSchema>;
