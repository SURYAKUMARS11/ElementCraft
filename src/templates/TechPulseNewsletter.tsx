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
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const TechPulseNewsletter: React.FC<Props> = ({ customization, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = Boolean(customization.darkMode);

  const bgColor = customization.backgroundColor ?? (isDark ? '#090d16' : '#f3f4f6');
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = customization.textColor ?? (isDark ? '#f9fafb' : '#111827');
  const textMuted = isDark ? '#9ca3af' : '#4b5563';
  const primaryColor = customization.primaryColor || '#ec4899';

  const brandName = customization.brandName ?? 'Frontend Pulse';

  return (
    <Container backgroundColor={bgColor} contentWidth="620px" mode={mode}>
      {/* 1. Header Banner */}
      <Row padding="28px 0 12px 0">
        <Column>
          <Paragraph color={primaryColor} fontSize="12px" fontWeight="bold" letterSpacing="3px" textAlign="center">
            🔥 {brandName.toUpperCase()} · WEEKLY DEVELOPER DIGEST
          </Paragraph>
          <Heading level="h1" color={textColor} fontSize="34px" fontWeight="bold" textAlign="center" lineHeight="1.15">
            The Frontend Architect
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" textAlign="center">
            Issue #{customization.issueNumber || '42'} · July 2026 · ⏱️ 5 min read
          </Paragraph>
        </Column>
      </Row>

      {/* 2. Featured Story Hero Card */}
      <Row padding="12px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px"
          padding="36px 32px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          {/* Category Tag */}
          <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1.5px">
            ⚡ ARCHITECTURE &amp; COMPILERS
          </Paragraph>

          <Heading level="h2" color={textColor} fontSize="24px" fontWeight="bold" containerPadding="8px 0 12px 0">
            Why Code-First Component Trees are Replacing Drag-and-Drop Builders
          </Heading>

          <Paragraph color={textMuted} fontSize="15px" lineHeight="1.6">
            Building email templates used to mean wrestling with raw table tags or locked visual drag-and-drop editors. With <strong>@unlayer/react-elements</strong>, engineers author modular React JSX components that compile directly to XHTML tables and print-ready PDF specs.
          </Paragraph>

          {/* Author Byline */}
          <Row padding="16px 0 20px 0">
            <Column backgroundColor={isDark ? '#1f2937' : '#f9fafb'} borderRadius="10px" padding="12px 16px">
              <Paragraph color={textColor} fontSize="13px" fontWeight="bold">
                ✍️ Written by Alex Mercer · Senior Template Architect
              </Paragraph>
              <Paragraph color={textMuted} fontSize="12px">
                Published in Frontend Pulse Digest · 14.2k subscribers
              </Paragraph>
            </Column>
          </Row>

          {customization.showCTA && (
            <Button
              href="https://github.com/unlayer/elements"
              backgroundColor={primaryColor}
              color="#ffffff"
              borderRadius="10px"
              padding="14px 28px"
              fontSize="15px"
              fontWeight="bold"
            >
              Read Full Article →
            </Button>
          )}
        </Column>
      </Row>

      {/* 3. 2-Column Articles Grid */}
      <Row layout={ColumnLayouts.TwoEqual} padding="12px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="16px"
          padding="24px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
            PERFORMANCE
          </Paragraph>
          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" containerPadding="4px 0 8px 0">
            ⚡ Zero-Hydration SSR
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            Render templates on Next.js, Remix, or Vite with zero client-side JS bundle bloat.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="16px"
          padding="24px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Paragraph color={primaryColor} fontSize="11px" fontWeight="bold" letterSpacing="1px">
            COMPLIANCE
          </Paragraph>
          <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" containerPadding="4px 0 8px 0">
            🛡️ 100% ESP Compatibility
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            Verified MSO conditional comments ensure flawless Outlook &amp; Gmail rendering.
          </Paragraph>
        </Column>
      </Row>

      {/* 4. Footer */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            {customization.showSocials && (
              <Social
                iconType="circle"
                iconSize={28}
                spacing={12}
                icons={[
                  { name: 'Twitter', url: 'https://twitter.com' },
                  { name: 'GitHub', url: 'https://github.com' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center" containerPadding="12px 0 0 0">
              Curated weekly by <strong>{brandName}</strong>. Sent via @unlayer/react-elements.
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getTechNewsletterJsx = (c: TemplateCustomization): string => {
  const isDark = Boolean(c.darkMode);
  const bgColor = c.backgroundColor || (isDark ? '#090d16' : '#f3f4f6');
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = c.textColor || (isDark ? '#f9fafb' : '#111827');
  const textMuted = isDark ? '#9ca3af' : '#4b5563';
  const primaryColor = c.primaryColor || '#ec4899';

  return `import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Button } from '@unlayer/react-elements';

export const Newsletter = () => (
  <Email backgroundColor="${bgColor}" contentWidth="620px">
    <Row padding="28px 0 12px 0">
      <Column backgroundColor="${cardBg}" borderRadius="20px" padding="36px">
        <Heading level="h1" color="${textColor}">🔥 ${c.brandName || 'Frontend Pulse'}</Heading>
        <Heading level="h2" color="${primaryColor}">Why Code-First Component Trees are Replacing Drag-and-Drop</Heading>
        <Paragraph color="${textMuted}">Written by Alex Mercer · 5 min read</Paragraph>
        <Button backgroundColor="${primaryColor}">Read Story</Button>
      </Column>
    </Row>
  </Email>
);`;
};
