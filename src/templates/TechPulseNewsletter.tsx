import React from 'react';
import {
  Email,
  Body,
  Row,
  Column,
  Heading,
  Paragraph,
  Button,
  Image,
  Divider,
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
  const isDark = config.darkMode;
  const bgColor = isDark ? '#090d16' : '#f3f4f6';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : config.textColor || '#111827';
  const textMuted = isDark ? '#9ca3af' : '#4b5563';
  const primaryColor = config.primaryColor || '#ec4899';

  return (
    <Container backgroundColor={bgColor} contentWidth="620px" mode={mode}>
      {/* Header Banner */}
      <Row padding="24px 0 12px 0">
        <Column>
          <Paragraph color={primaryColor} fontSize="13px" fontWeight="bold" letterSpacing="2px" textAlign="center">
            {config.brandName.toUpperCase()} • WEEKLY TECH PULSE
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
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
            alt="Code on screen"
            width="100%"
          />

          <Paragraph color={primaryColor} fontSize="12px" fontWeight="bold" containerPadding="16px 0 4px 0">
            FEATURED DISPATCH
          </Paragraph>

          <Heading level="h2" color={textColor} fontSize="24px" fontWeight="bold" lineHeight="1.3">
            Why Code-First Template Engines Are Replacing Legacy Drag-and-Drop Editors
          </Heading>

          <Paragraph color={textMuted} fontSize="15px" lineHeight="1.6" containerPadding="8px 0 16px 0">
            With tools like <strong>@unlayer/react-elements</strong>, developers can maintain email templates inside Git repositories, use TypeScript autocomplete, and compile to clean HTML tables automatically.
          </Paragraph>

          <Button
            href="https://github.com/unlayer/elements"
            backgroundColor={primaryColor}
            color="#ffffff"
            fontSize="14px"
            fontWeight="bold"
            borderRadius="8px"
            padding="10px 20px"
          >
            Read Full Article →
          </Button>
        </Column>
      </Row>

      {/* 2-Column Grid Article Highlights */}
      <Row layout={ColumnLayouts.TwoEqual} padding="8px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="20px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="12px" fontWeight="bold">
            TOOL SPOTLIGHT
          </Heading>
          <Heading level="h3" color={textColor} fontSize="17px" fontWeight="bold">
            Vite 8 &amp; React 19 Performance Insights
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            Discover how zero-bundle SSR techniques improve template compilation times by 4x.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="12px"
          padding="20px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="12px" fontWeight="bold">
            DESIGN SYSTEMS
          </Heading>
          <Heading level="h3" color={textColor} fontSize="17px" fontWeight="bold">
            Building Bulletproof Dark Mode Emails
          </Heading>
          <Paragraph color={textMuted} fontSize="13px" lineHeight="1.5">
            How target media queries ensure your emails look stunning on iOS, Outlook, and Gmail.
          </Paragraph>
        </Column>
      </Row>

      {/* Footer / Social */}
      {config.showFooter && (
        <Row padding="24px 0">
          <Column>
            <Divider
              border={{
                borderTopWidth: '1px',
                borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
                borderTopStyle: 'solid',
              }}
              containerPadding="0 0 20px 0"
            />
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
            <Paragraph color={textMuted} fontSize="12px" textAlign="center" containerPadding="12px 0 0 0">
              Curated with ⚡ by {config.brandName} • Built with Unlayer Elements
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getTechNewsletterJsx = (config: TemplateCustomization): string => {
  return `import { Email, Row, Column, Heading, Paragraph, Button, Image, ColumnLayouts } from '@unlayer/react-elements';

export const Newsletter = () => (
  <Email backgroundColor="${config.backgroundColor || '#f3f4f6'}" contentWidth="620px">
    <Row padding="24px 0">
      <Column textAlign="center">
        <Heading level="h1">${config.brandName} Tech Digest</Heading>
        <Paragraph>Issue #${config.issueNumber || '42'}</Paragraph>
      </Column>
    </Row>
    <Row>
      <Column backgroundColor="#ffffff" borderRadius="16px" padding="32px">
        <Heading level="h2">Code-First Template Engines</Heading>
        <Button href="https://github.com/unlayer/elements" backgroundColor="${config.primaryColor}">Read Story →</Button>
      </Column>
    </Row>
  </Email>
);`;
};
