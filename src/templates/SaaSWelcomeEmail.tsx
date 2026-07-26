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
  customization: TemplateCustomization;
  mode?: RenderMode;
}

export const SaaSWelcomeEmail: React.FC<Props> = ({ customization, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = Boolean(customization.darkMode);
  
  // Smart dark mode color resolution
  const defaultLightBg = '#f4f6fc';
  const defaultDarkBg = '#0b0f19';
  const defaultLightText = '#0f172a';
  const defaultDarkText = '#f8fafc';

  const bgColor = isDark
    ? (customization.backgroundColor && customization.backgroundColor !== defaultLightBg ? customization.backgroundColor : defaultDarkBg)
    : (customization.backgroundColor || defaultLightBg);

  const cardBg = isDark ? '#161e2e' : '#ffffff';

  const textColor = isDark
    ? (customization.textColor && customization.textColor !== defaultLightText ? customization.textColor : defaultDarkText)
    : (customization.textColor || defaultLightText);

  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const primaryColor = customization.primaryColor || '#6366f1';
  const accentColor = customization.accentColor || '#10b981';

  const brandName = customization.brandName ?? 'Antigravity SaaS';
  const recipientName = customization.recipientName ?? 'Alex Mercer';
  const companyName = customization.companyName ?? 'Antigravity Cloud Inc';

  return (
    <Container backgroundColor={bgColor} contentWidth="600px" mode={mode}>
      {/* 1. Header Brand Row */}
      <Row padding="28px 0 16px 0">
        <Column>
          {customization.logoUrl ? (
            <Image
              src={customization.logoUrl}
              alt={brandName}
              width="150px"
            />
          ) : (
            <Row layout={ColumnLayouts.TwoEqual}>
              <Column>
                <Heading level="h2" color={primaryColor} fontSize="26px" fontWeight="bold">
                  ⚡ {brandName}
                </Heading>
              </Column>
              <Column>
                <Paragraph color={accentColor} fontSize="11px" fontWeight="bold" letterSpacing="1px" textAlign="right">
                  🟢 SYSTEM ONLINE · PRO
                </Paragraph>
              </Column>
            </Row>
          )}
        </Column>
      </Row>

      {/* 2. Main Hero Showcase Card */}
      <Row padding="0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px"
          padding="40px 36px"
          border={{
            borderTopWidth: '3px',
            borderTopColor: primaryColor,
            borderBottomWidth: '1px',
            borderBottomColor: isDark ? '#1e293b' : '#e2e8f0',
          }}
        >
          {/* Status Pill Badge */}
          <Paragraph
            color={primaryColor}
            fontSize="12px"
            fontWeight="bold"
            letterSpacing="2px"
            textAlign="center"
          >
            🚀 WELCOME TO THE FUTURE OF SAAS
          </Paragraph>

          {/* Main Title */}
          <Heading
            level="h1"
            color={textColor}
            fontSize="32px"
            fontWeight="bold"
            textAlign="center"
            lineHeight="1.2"
            containerPadding="16px 0 12px 0"
          >
            Welcome aboard, {recipientName}! 🎉
          </Heading>

          {/* Intro Text */}
          <Paragraph
            color={textMuted}
            fontSize="15px"
            lineHeight="1.6"
            textAlign="center"
          >
            We&apos;re thrilled to have you join <strong style={{ color: textColor }}>{companyName}</strong>.
            Your developer workspace is provisioned with high-speed template compilers, zero hydration overhead, and instant API access.
          </Paragraph>

          {/* Developer Quickstart Key Box */}
          <Row padding="24px 0 0 0">
            <Column
              backgroundColor={isDark ? '#0d1117' : '#f8fafc'}
              borderRadius="14px"
              padding="20px 24px"
              border={{
                borderTopWidth: '2px',
                borderTopColor: accentColor,
              }}
            >
              <Row layout={ColumnLayouts.TwoEqual}>
                <Column>
                  <Paragraph color={accentColor} fontSize="11px" fontWeight="bold" letterSpacing="1.5px">
                    🔑 PRODUCTION API KEY:
                  </Paragraph>
                </Column>
                <Column>
                  <Paragraph color="#f59e0b" fontSize="11px" fontWeight="bold" textAlign="right">
                    ⚡ ACTIVE · US-EAST-1
                  </Paragraph>
                </Column>
              </Row>
              <Heading level="h4" color={textColor} fontSize="14px" fontWeight="bold" containerPadding="4px 0">
                sk_live_994827104958291048_prod
              </Heading>
              <Paragraph color={textMuted} fontSize="12px">
                CLI Command: <code style={{ color: primaryColor, fontWeight: 'bold' }}>npx create-elementcraft-app@latest</code>
              </Paragraph>
            </Column>
          </Row>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#1e293b' : '#f1f5f9',
              borderTopStyle: 'solid',
            }}
            containerPadding="24px 0"
          />

          {/* Features Grid Header */}
          <Heading
            level="h3"
            color={textColor}
            fontSize="18px"
            fontWeight="bold"
            textAlign="center"
          >
            🌟 Built-in Platform Capabilities:
          </Heading>
        </Column>
      </Row>

      {/* 3. Three Feature Cards */}
      <Row layout={ColumnLayouts.ThreeEqual} padding="16px 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="14px"
          padding="22px 18px"
          border={{
            borderTopWidth: '2px',
            borderTopColor: primaryColor,
          }}
        >
          <Heading level="h4" color={primaryColor} fontSize="28px" textAlign="center">
            ⚡
          </Heading>
          <Heading level="h4" color={textColor} fontSize="15px" fontWeight="bold" textAlign="center">
            Instant Setup
          </Heading>
          <Paragraph color={textMuted} fontSize="12px" textAlign="center" lineHeight="1.5">
            Deploy full-stack applications with pre-configured elements in seconds.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="14px"
          padding="22px 18px"
          border={{
            borderTopWidth: '2px',
            borderTopColor: accentColor,
          }}
        >
          <Heading level="h4" color={accentColor} fontSize="28px" textAlign="center">
            🎨
          </Heading>
          <Heading level="h4" color={textColor} fontSize="15px" fontWeight="bold" textAlign="center">
            Clean JSX APIs
          </Heading>
          <Paragraph color={textMuted} fontSize="12px" textAlign="center" lineHeight="1.5">
            Write modular React code that compiles into email-safe HTML &amp; PDF specs.
          </Paragraph>
        </Column>

        <Column
          backgroundColor={cardBg}
          borderRadius="14px"
          padding="22px 18px"
          border={{
            borderTopWidth: '2px',
            borderTopColor: '#f59e0b',
          }}
        >
          <Heading level="h4" color="#f59e0b" fontSize="28px" textAlign="center">
            📊
          </Heading>
          <Heading level="h4" color={textColor} fontSize="15px" fontWeight="bold" textAlign="center">
            Real-Time Sync
          </Heading>
          <Paragraph color={textMuted} fontSize="12px" textAlign="center" lineHeight="1.5">
            Seamlessly import or export JSON schema with Unlayer visual editors.
          </Paragraph>
        </Column>
      </Row>

      {/* 4. CTA Button Block */}
      {customization.showCTA && (
        <Row padding="16px 0">
          <Column
            backgroundColor={cardBg}
            borderRadius="20px"
            padding="36px 28px"
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
            }}
          >
            <Heading level="h3" color={textColor} fontSize="22px" fontWeight="bold" textAlign="center">
              🚀 Ready to launch your first template?
            </Heading>
            <Paragraph color={textMuted} fontSize="14px" textAlign="center" containerPadding="8px 0 20px 0">
              Access your developer dashboard to manage API keys, webhooks, and template themes.
            </Paragraph>
            <Button
              href="https://unlayer.com"
              backgroundColor={primaryColor}
              color="#ffffff"
              fontSize="16px"
              fontWeight="bold"
              borderRadius="10px"
              padding="14px 32px"
            >
              Launch Developer Dashboard →
            </Button>
          </Column>
        </Row>
      )}

      {/* 5. Footer Section */}
      {customization.showFooter && (
        <Row padding="24px 0">
          <Column>
            {customization.showSocials && (
              <Social
                iconType="circle"
                iconSize={28}
                spacing={12}
                icons={[
                  { name: 'Twitter', url: 'https://twitter.com/unlayerapp' },
                  { name: 'LinkedIn', url: 'https://linkedin.com/company/unlayer' },
                  { name: 'GitHub', url: 'https://github.com/unlayer' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center" containerPadding="16px 0 0 0">
              © 2026 {companyName}. All rights reserved.<br />
              Powered by @unlayer/react-elements.<br />
              <a href="#unsubscribe" style={{ color: textMuted, textDecoration: 'underline' }}>
                Unsubscribe
              </a>{' '}
              •{' '}
              <a href="#preferences" style={{ color: textMuted, textDecoration: 'underline' }}>
                Email Preferences
              </a>
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getSaaSWelcomeJsx = (c: TemplateCustomization): string => {
  const isDark = Boolean(c.darkMode);
  const bgColor = isDark ? '#0b0f19' : '#f4f6fc';
  const cardBg = isDark ? '#161e2e' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const primaryColor = c.primaryColor || '#6366f1';

  return `import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Button } from '@unlayer/react-elements';

export const SaaSWelcomeEmail = () => (
  <Email backgroundColor="${bgColor}" contentWidth="600px">
    <Row padding="28px 0 16px 0">
      <Column backgroundColor="${cardBg}" borderRadius="20px" padding="40px 36px">
        <Heading level="h1" color="${textColor}">Welcome aboard, ${c.recipientName || 'Developer'}!</Heading>
        <Button backgroundColor="${primaryColor}">Launch Dashboard →</Button>
      </Column>
    </Row>
  </Email>
);`;
};
