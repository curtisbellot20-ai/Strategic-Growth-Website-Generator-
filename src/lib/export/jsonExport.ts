import type { WebsiteBlueprint } from '@/types';
import type { AIExportData } from './ExportContext';

export interface StrategyExportPayload {
  exportedAt: string;
  version: '1.0';
  blueprint: WebsiteBlueprint;
  aiReports?: AIExportData;
}

export function strategyToJSON(
  bp: WebsiteBlueprint,
  aiData?: AIExportData,
): string {
  const payload: StrategyExportPayload = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    blueprint: bp,
    ...(aiData && Object.keys(aiData).length > 0 ? { aiReports: aiData } : {}),
  };
  return JSON.stringify(payload, null, 2);
}
