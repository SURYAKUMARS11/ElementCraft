import React from 'react';
import {
  Email,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Button,
  Social,
  ColumnLayouts,
} from '@unlayer/react-elements';
import type { TemplateCustomization, RenderMode } from '../types/template';

interface Props {
  config: TemplateCustomization;
  mode?: RenderMode;
}

export const TechPulseNewsletter: React.FC<Props> = ({ config, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = Boolean(config.darkMode);

  const bgColor = config.backgroundColor ?? (isDark ? '#090d16' : '#f3f4f6');
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = config.textColor ?? (isDark ? '#f9fafb' : '#111827');
  const textMuted = isDark ? '#9ca3af' : '#4b5563';
  const primaryColor = config.primaryColor || '#ec4899';

  const brandName = config.brandName ?? 'Frontend Pulse';

  return (
    <Container backgroundColor={bgColor} contentWidth="620px" mode={mode}>
      {/* Header Banner */}
      <Row padding="24px 0 12px 0">
        <Column>
          <Paragraph color={primaryColor} fontSize="13px" fontWeight="bold" letterSpacing="2px" textAlign="center">
            {brandName.toUpperCase()} • WEEKLY TECH PULSE
          </Paragraph>
          <Heading level="h1" color={textColor} fontSize="32px" fontWeight="bold" textAlign="center">
            The Frontend Digest
          </Heading>
          <Paragraph color={textMuted} fontSize="14px" textAlign="center">
            Issue #{config.issueNumber || '42'} • July 2026 • 5 min read
          </Paragraph>
        </Column>
      </Row>

      {/* Featured Story Card */}
      <Row padding="12px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="16px"
          padding="32px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Heading level="h2" color={textColor} fontSize="22px" fontWeight="bold" containerPadding="0 0 12px 0">
            🔥 Why Code-First Component Trees are Replacing Drag-and-Drop Builders
          </Heading>
          <Paragraph color={textMuted} fontSize="15px" lineHeight="1.6">
            Building email templates used to mean wrestling with raw table tags or locked visual builders. With <strong>@unlayer/react-elements</strong>, developers write pure React JSX that compiles directly to XHTML tables and responsive web layouts.
          </Paragraph>
          {config.showCTA && (
            <Button
              href="https://github.com/unlayer/elements"
              backgroundColor={primaryColor}
              color="#ffffff"
              borderRadius="8px"
              padding="12px 24px"
              fontSize="14px"
              fontWeight="bold"
            >
              Read Full Article →
            </Button>
          )}
        </Column>
      </Row>

      {/* 2-Column Articles Grid */}
      <Row layout={ColumnLayouts.TwoEqual} padding="12px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="24px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Heading level="h3" color={primaryColor} fontSize="18px" fontWeight="bold">
            ⚡ Zero-Hydration SSR
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            Render templates on Next.js, Remix, or Vite without client JS bundle bloat.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="24px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Heading level="h3" color={primaryColor} fontSize="18px" fontWeight="bold">
            🛡️ 100% ESP Compatibility
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            Verified MSO conditional comments ensure flawless Outlook &amp; Gmail delivery.
          </Paragraph>
        </Column>
      </Row>

      {/* Footer */}
      {config.showFooter && (
        <Row padding="24px 0">
          <Column>
            {config.showSocials && (
              <Social
                iconType="circle"
                iconSize={26}
                spacing={10}
                icons={[
                  { name: 'Twitter', url: 'https://twitter.com' },
                  { name: 'GitHub', url: 'https://github.com' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center">
              Curated weekly by <strong>{brandName}</strong>. Sent via @unlayer/react-elements.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getTechNewsletterJsx = (config: TemplateCustomization): string => {
  return `import { Email, Row, Column, Heading, Paragraph, Button } from '@unlayer/react-elements';

export const Newsletter = () => (
  <Email backgroundColor="${config.backgroundColor || '#f3f4f6'}" contentWidth="620px">
    <Row padding="24px">
      <Column>
        <Heading level="h1">${config.brandName || 'Tech Pulse'}</Heading>
        <Button backgroundColor="${config.primaryColor}">Read Story</Button>
      </Column>
    </Row>
  </Email>
);`;
};
