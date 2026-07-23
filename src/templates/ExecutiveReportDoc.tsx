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
  config: TemplateCustomization;
  mode?: RenderMode;
}

export const ExecutiveReportDoc: React.FC<Props> = ({ config, mode = 'document' }) => {
  const Container = mode === 'email' ? Body : Document;
  const isDark = config.darkMode;
  const bgColor = isDark ? '#0b0f19' : '#f8fafc';
  const cardBg = isDark ? '#161e2e' : '#ffffff';
  const textColor = isDark ? '#f1f5f9' : config.textColor || '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = config.primaryColor || '#2563eb';
  const brandName = config.brandName || 'Acme Enterprise';

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
              borderTopWidth: '2px',
              borderTopColor: primaryColor,
              borderTopStyle: 'solid',
            }}
            containerPadding="20px 0"
          />

          {/* Key Metrics / KPI Grid */}
          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold">
            Executive Summary KPI Snapshot
          </Heading>
        </Column>
      </Row>

      {/* 4 Metric Cards */}
      <Row layout={ColumnLayouts.FourEqual} padding="0">
        <Column
          backgroundColor={cardBg}
          padding="16px"
          border={{
            borderRightWidth: '1px',
            borderRightColor: isDark ? '#1e293b' : '#f1f5f9',
          }}
        >
          <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
            ANNUAL RECURRING REVENUE
          </Paragraph>
          <Heading level="h2" color={primaryColor} fontSize="24px" fontWeight="bold">
            $12.4M
          </Heading>
          <Paragraph color="#10b981" fontSize="12px" fontWeight="bold">
            ↑ +34% YoY
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          padding="16px"
          border={{
            borderRightWidth: '1px',
            borderRightColor: isDark ? '#1e293b' : '#f1f5f9',
          }}
        >
          <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
            ACTIVE TEMPLATE BUILDS
          </Paragraph>
          <Heading level="h2" color={textColor} fontSize="24px" fontWeight="bold">
            184,200
          </Heading>
          <Paragraph color="#10b981" fontSize="12px" fontWeight="bold">
            ↑ +82% QoQ
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          padding="16px"
          border={{
            borderRightWidth: '1px',
            borderRightColor: isDark ? '#1e293b' : '#f1f5f9',
          }}
        >
          <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
            NET PROMOTER SCORE
          </Paragraph>
          <Heading level="h2" color={textColor} fontSize="24px" fontWeight="bold">
            +74
          </Heading>
          <Paragraph color="#10b981" fontSize="12px" fontWeight="bold">
            World-class
          </Paragraph>
        </Column>

        <Column backgroundColor={cardBg} padding="16px">
          <Paragraph color={textMuted} fontSize="11px" fontWeight="bold">
            BUILDER RETENTION
          </Paragraph>
          <Heading level="h2" color={textColor} fontSize="24px" fontWeight="bold">
            96.8%
          </Heading>
          <Paragraph color="#10b981" fontSize="12px" fontWeight="bold">
            Top Decile
          </Paragraph>
        </Column>
      </Row>

      {/* Narrative Section */}
      <Row padding="0 0 24px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="0 0 16px 16px"
          padding="24px 48px 40px 48px"
        >
          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
              borderTopStyle: 'solid',
            }}
            containerPadding="16px 0"
          />

          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold">
            Strategic Highlights &amp; Elements Ecosystem Growth
          </Heading>

          <Paragraph color={textMuted} fontSize="14px" lineHeight="1.7" containerPadding="8px 0 16px 0">
            During Q2 2026, engineering adoption of the <strong>@unlayer/react-elements</strong> package accelerated across enterprise customers. By transitioning legacy email markup pipelines to React components, development cycles were reduced by <strong>65%</strong>.
          </Paragraph>

          <Paragraph color={textMuted} fontSize="14px" lineHeight="1.7">
            Key milestones included launching full TypeScript schema validation, instant HTML-to-PDF rendering, and bi-directional synchronization with visual builder JSON definitions.
          </Paragraph>

          <Row layout={ColumnLayouts.TwoEqual} padding="24px 0 0 0">
            <Column>
              <Paragraph color={textColor} fontSize="13px" fontWeight="bold">
                Prepared By:
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px">
                {config.recipientName || 'Sarah Jenkins'}<br />
                Head of Product Engineering
              </Paragraph>
            </Column>
            <Column>
              <Paragraph color={textColor} fontSize="13px" fontWeight="bold" textAlign="right">
                Approved By:
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" textAlign="right">
                {config.companyName || 'Executive Leadership Committee'}
              </Paragraph>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
  );
};

export const getExecutiveReportJsx = (config: TemplateCustomization): string => {
  return `import { Document, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';

export const ExecutiveReport = () => (
  <Document backgroundColor="#f8fafc" contentWidth="700px">
    <Row padding="24px 0">
      <Column backgroundColor="#ffffff" borderRadius="16px" padding="40px 48px">
        <Heading level="h1" color="${config.primaryColor}">${config.brandName || 'Acme Enterprise'} Q2 Report</Heading>
        <Paragraph>Confidential Performance Summary</Paragraph>
      </Column>
    </Row>
  </Document>
);`;
};
