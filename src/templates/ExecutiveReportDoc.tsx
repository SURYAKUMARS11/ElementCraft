import React from 'react';
import {
  Document,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Divider,
  ColumnLayouts,
} from '@unlayer/react-elements';
import type { TemplateCustomization, RenderMode } from '../types/template';

interface Props {
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const ExecutiveReportDoc: React.FC<Props> = ({ customization, mode = 'document' }) => {
  const Container = mode === 'email' ? Body : Document;
  const isDark = Boolean(customization.darkMode);

  const bgColor = customization.backgroundColor ?? (isDark ? '#0b0f19' : '#f8fafc');
  const cardBg = isDark ? '#161e2e' : '#ffffff';
  const textColor = customization.textColor ?? (isDark ? '#f1f5f9' : '#0f172a');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#2563eb';

  const brandName = customization.brandName ?? 'Acme Enterprise';

  return (
    <Container backgroundColor={bgColor} contentWidth="700px" mode={mode}>
      {/* Cover / Header Section */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="16px 16px 0 0"
          padding="40px 48px 24px 48px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
          }}
        >
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Paragraph color={primaryColor} fontSize="13px" fontWeight="bold" letterSpacing="1.5px">
                {brandName.toUpperCase()} BRIEFING
              </Paragraph>
              <Heading level="h1" color={textColor} fontSize="28px" fontWeight="bold">
                Q2 2026 Performance &amp; Ecosystem Growth
              </Heading>
            </Column>
            <Column>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right">
                CONFIDENTIAL • FOR INTERNAL USE ONLY
              </Paragraph>
              <Paragraph color={textColor} fontSize="13px" fontWeight="bold" textAlign="right">
                Date: July 2026
              </Paragraph>
            </Column>
          </Row>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
            }}
            containerPadding="24px 0"
          />

          {/* 4-KPI Metric Grid */}
          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" containerPadding="0 0 16px 0">
            Key Performance Metrics:
          </Heading>

          <Row layout={ColumnLayouts.FourEqual}>
            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="8px" padding="16px">
              <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
                $4.2M
              </Heading>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
                ARR GROWING 48%
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="8px" padding="16px">
              <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
                99.98%
              </Heading>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
                SYSTEM UPTIME
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="8px" padding="16px">
              <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
                14.2K
              </Heading>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
                ACTIVE DEV LICENSES
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="8px" padding="16px">
              <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
                4.9/5
              </Heading>
              <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
                CSAT RATING
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* Report Summary Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          borderRadius="0 0 16px 16px"
          padding="24px 48px 40px 48px"
        >
          <Heading level="h3" color={textColor} fontSize="20px" fontWeight="bold" containerPadding="0 0 12px 0">
            Executive Summary
          </Heading>
          <Paragraph color={textMuted} fontSize="14px" lineHeight="1.6">
            In Q2 2026, <strong>{brandName}</strong> expanded its developer platform adoption by 48% year-over-year. The transition to <code>@unlayer/react-elements</code> for programmatic document and email template generation resulted in a 65% reduction in customer support tickets related to rendering glitches on legacy email clients.
          </Paragraph>
        </Column>
      </Row>

      {/* Footer */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            <Paragraph color={textMuted} fontSize="12px" textAlign="center">
              © 2026 {brandName}. Executive Briefing Document.<br />
              Generated with @unlayer/react-elements Document Engine.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getExecutiveReportJsx = (config: TemplateCustomization): string => {
  return `import { Document, Row, Column, Heading, Paragraph } from '@unlayer/react-elements';

export const ExecutiveReport = () => (
  <Document backgroundColor="${config.backgroundColor || '#f8fafc'}" contentWidth="700px">
    <Row padding="40px">
      <Column>
        <Heading level="h1" color="${config.primaryColor}">${config.brandName || 'Acme'} Performance Report</Heading>
        <Paragraph color="#64748b">Q2 2026 Executive Briefing Document</Paragraph>
      </Column>
    </Row>
  </Document>
);`;
};
