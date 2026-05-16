'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { WebsiteScoreReport } from '@/types/scoring';
import type { SEOIntelligenceReport } from '@/types/seo';
import type { ConversionAcquisitionReport } from '@/types/acquisition';
import type { RetentionReferralReport } from '@/types/retention';

export interface AIExportData {
  scoring?: WebsiteScoreReport;
  seoIntelligence?: SEOIntelligenceReport;
  acquisition?: ConversionAcquisitionReport;
  retention?: RetentionReferralReport;
}

interface ExportContextValue {
  aiData: AIExportData;
  registerAIData: <K extends keyof AIExportData>(key: K, data: NonNullable<AIExportData[K]>) => void;
}

const ExportContext = createContext<ExportContextValue>({
  aiData: {},
  registerAIData: () => {},
});

export function ExportProvider({ children }: { children: ReactNode }) {
  const [aiData, setAIData] = useState<AIExportData>({});

  const registerAIData = <K extends keyof AIExportData>(
    key: K,
    data: NonNullable<AIExportData[K]>,
  ) => {
    setAIData(prev => ({ ...prev, [key]: data }));
  };

  return (
    <ExportContext.Provider value={{ aiData, registerAIData }}>
      {children}
    </ExportContext.Provider>
  );
}

export function useExport() {
  return useContext(ExportContext);
}
