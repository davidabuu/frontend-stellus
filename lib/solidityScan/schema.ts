import * as v from 'valibot';

// Define the schema for issue severity distribution using v.object() in the correct way.
export const SolidityScanIssueSeverityDistributionSchema = v.object();

// Define the properties on the schema directly if needed
SolidityScanIssueSeverityDistributionSchema.shape = {
  critical: v.number(),
  gas: v.number(),
  high: v.number(),
  informational: v.number(),
  low: v.number(),
  medium: v.number(),
};

// Now you can also define a schema for the complete report
export const SolidityScanSchema = v.object({
  scan_report: v.object({
    contractname: v.string(),
    scan_status: v.string(),
    scan_summary: v.object({
      score_v2: v.string(),
      issue_severity_distribution: SolidityScanIssueSeverityDistributionSchema,
    }),
    scanner_reference_url: v.string(),
  }),
});

// Define types for the inferred outputs
export type SolidityScanReport = v.InferOutput<typeof SolidityScanSchema>;
export type SolidityScanReportSeverityDistribution = v.InferOutput<typeof SolidityScanIssueSeverityDistributionSchema>;
