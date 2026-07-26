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
  const Container = mode === 'document' ? Body : Document;
  const isDark = Boolean(customization.darkMode);

  const bgColor = customization.backgroundColor ?? (isDark ? '#0b0f19' : '#f8fafc');
  const cardBg = isDark ? '#161e2e' : '#ffffff';
  const textColor = customization.textColor ?? (isDark ? '#f1f5f9' : '#0f172a');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#2563eb';

  const brandName = customization.brandName ?? 'Acme Enterprise';

  return (
    <Container backgroundColor={bgColor} contentWidth="700px" mode={mode}>
      {/* 1. Cover Header Section */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px 20px 0 0"
          padding="40px 48px 24px 48px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
          }}
        >
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Paragraph color={primaryColor} fontSize="12px" fontWeight="bold" letterSpacing="2px">
                📊 {brandName.toUpperCase()} BRIEFING
              </Paragraph>
              <Heading level="h1" color={textColor} fontSize="28px" fontWeight="bold" containerPadding="4px 0 0 0">
                Q2 2026 Performance &amp; Ecosystem Growth
              </Heading>
            </Column>
            <Column>
              <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px" textAlign="right">
                🔒 CONFIDENTIAL · BOARD MEMBERS ONLY
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right" containerPadding="4px 0 0 0">
                Date: July 2026 · Auth: Executive Board
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

          {/* 2. Four KPI Metric Cards Grid */}
          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" containerPadding="0 0 16px 0">
            Key Metric Accomplishments (Q2 2026):
          </Heading>

          <Row layout={ColumnLayouts.FourEqual}>
            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="12px" padding="18px 14px">
              <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                $4.2M
              </Heading>
              <Paragraph color={textColor} fontSize="11px" fontWeight="bold" letterSpacing="0.5px">
                ARR GROWING +48%
              </Paragraph>
              <Paragraph color={textMuted} fontSize="10px">
                Net expansion vs Q1
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="12px" padding="18px 14px">
              <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                99.98%
              </Heading>
              <Paragraph color={textColor} fontSize="11px" fontWeight="bold" letterSpacing="0.5px">
                SYSTEM UPTIME
              </Paragraph>
              <Paragraph color={textMuted} fontSize="10px">
                Global SLA target met
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="12px" padding="18px 14px">
              <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                14.2K
              </Heading>
              <Paragraph color={textColor} fontSize="11px" fontWeight="bold" letterSpacing="0.5px">
                ACTIVE DEV SEATS
              </Paragraph>
              <Paragraph color={textMuted} fontSize="10px">
                Enterprise teams
              </Paragraph>
            </Column>

            <Column backgroundColor={isDark ? '#1e293b' : '#f1f5f9'} borderRadius="12px" padding="18px 14px">
              <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                4.9/5
              </Heading>
              <Paragraph color={textColor} fontSize="11px" fontWeight="bold" letterSpacing="0.5px">
                CSAT RATING
              </Paragraph>
              <Paragraph color={textMuted} fontSize="10px">
                Post-launch survey
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* 3. Report Narrative Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          borderRadius="0 0 20px 20px"
          padding="24px 48px 40px 48px"
        >
          <Heading level="h3" color={textColor} fontSize="20px" fontWeight="bold" containerPadding="0 0 12px 0">
            Executive Summary &amp; Strategic Outlook
          </Heading>
          <Paragraph color={textMuted} fontSize="14px" lineHeight="1.7">
            In Q2 2026, <strong>{brandName}</strong> expanded its developer platform adoption by 48% year-over-year. The transition to <code>@unlayer/react-elements</code> for programmatic document and email template generation resulted in a <strong>65% reduction</strong> in customer support tickets related to rendering glitches on legacy email clients.
          </Paragraph>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
            }}
            containerPadding="24px 0 16px 0"
          />

          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Paragraph color={textColor} fontSize="13px" fontWeight="bold">
                Approved by Executive Committee
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px">
                Chief Technology Officer · {brandName}
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={primaryColor} fontSize="13px" fontWeight="bold" textAlign="right">
                ✓ VERIFIED DOCUMENT SPEC
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px" textAlign="right">
                Unlayer Document Engine v2.0
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>

      {/* 4. Footer */}
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

export const getExecutiveReportJsx = (c: TemplateCustomization): string => {
  const isDark = Boolean(c.darkMode);
  const bgColor = c.backgroundColor || (isDark ? '#0b0f19' : '#f8fafc');
  const cardBg = isDark ? '#161e2e' : '#ffffff';
  const textColor = c.textColor || (isDark ? '#f1f5f9' : '#0f172a');
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = c.primaryColor || '#2563eb';

  return `import React from 'react';
import { Document, Row, Column, Heading, Paragraph } from '@unlayer/react-elements';

export const ExecutiveReport = () => (
  <Document backgroundColor="${bgColor}" contentWidth="700px">
    <Row padding="40px">
      <Column backgroundColor="${cardBg}" borderRadius="20px" padding="48px">
        <Heading level="h1" color="${primaryColor}">📊 ${c.brandName || 'Acme'} Executive Report</Heading>
        <Heading level="h3" color="${textColor}">Q2 Performance Summary</Heading>
        <Paragraph color="${textMuted}">Q2 2026 Executive Briefing Document</Paragraph>
      </Column>
    </Row>
  </Document>
);`;
};
