import * as v from 'valibot';

// Define the issue severity distribution schema
export const SolidityScanIssueSeverityDistributionSchema = v.object({
  critical: v.pipe(
    v.number('Critical severity must be a number.'),
    v.min(0, 'Critical severity must be 0 or more.')
  ).optional(),
  gas: v.pipe(
    v.number('Gas severity must be a number.'),
    v.min(0, 'Gas severity must be 0 or more.')
  ).optional(),
  high: v.pipe(
    v.number('High severity must be a number.'),
    v.min(0, 'High severity must be 0 or more.')
  ).optional(),
  informational: v.pipe(
    v.number('Informational severity must be a number.'),
    v.min(0, 'Informational severity must be 0 or more.')
  ).optional(),
  low: v.pipe(
    v.number('Low severity must be a number.'),
    v.min(0, 'Low severity must be 0 or more.')
  ).optional(),
  medium: v.pipe(
    v.number('Medium severity must be a number.'),
    v.min(0, 'Medium severity must be 0 or more.')
  ).optional(),
});

// Define the complete scan schema
export const SolidityScanSchema = v.object({
  scan_report: v.object({
    contractname: v.pipe(
      v.string('Contract name must be a string.'),
      v.nonEmpty('Please enter the contract name.')
    ).optional(),
    scan_status: v.pipe(
      v.string('Scan status must be a string.'),
      v.nonEmpty('Please enter the scan status.')
    ).optional(),
    scan_summary: v.object({
      score_v2: v.pipe(
        v.string('Score must be a string.'),
        v.nonEmpty('Please enter the score.')
      ).optional(),
      issue_severity_distribution: SolidityScanIssueSeverityDistributionSchema,
    }),
    scanner_reference_url: v.pipe(
      v.string('Scanner reference URL must be a string.'),
      v.nonEmpty('Please enter the scanner reference URL.'),
      v.url('The scanner reference URL is badly formatted.')
    ).optional(),
  }),
});

// Export types inferred from the schemas
export type SolidityScanReport = v.InferOutput<typeof SolidityScanSchema>;
export type SolidityScanReportSeverityDistribution = v.InferOutput<typeof SolidityScanIssueSeverityDistributionSchema>;
