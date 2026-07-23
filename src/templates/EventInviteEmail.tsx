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

export const EventInviteEmail: React.FC<Props> = ({ config, mode = 'email' }) => {
  const Container = mode === 'document' ? Body : Email;
  const isDark = config.darkMode;
  const bgColor = isDark ? '#090514' : '#faf5ff';
  const cardBg = isDark ? '#140c2a' : '#ffffff';
  const textColor = isDark ? '#f3e8ff' : config.textColor || '#1e1b4b';
  const textMuted = isDark ? '#a855f7' : '#6b21a8';
  const primaryColor = config.primaryColor || '#8b5cf6';
  const brandName = config.brandName || 'Elements Summit';
  const recipientName = config.recipientName || 'Alex Mercer';

  return (
    <Container backgroundColor={bgColor} contentWidth="600px" mode={mode}>
      {/* Event Banner Card */}
      <Row padding="24px 0 0 0">
        <Column
          backgroundColor={cardBg}
          borderRadius="20px"
          padding="40px 32px"
          border={{
            borderTopWidth: '1px',
            borderTopColor: isDark ? '#3b0764' : '#e9d5ff',
            borderBottomWidth: '1px',
            borderBottomColor: isDark ? '#3b0764' : '#e9d5ff',
          }}
        >
          {/* VIP Badge */}
          <Paragraph
            color={primaryColor}
            fontSize="12px"
            fontWeight="bold"
            letterSpacing="2px"
            textAlign="center"
          >
            ✦ YOU ARE INVITED • EXCLUSIVE VIP ACCESS ✦
          </Paragraph>

          {/* Event Title */}
          <Heading
            level="h1"
            color={textColor}
            fontSize="32px"
            fontWeight="bold"
            textAlign="center"
            lineHeight="1.2"
            containerPadding="12px 0 16px 0"
          >
            {config.eventName || 'Unlayer Elements Global Summit 2026'}
          </Heading>

          <Paragraph
            color={textMuted}
            fontSize="16px"
            textAlign="center"
            lineHeight="1.6"
          >
            Join lead engineers, architects, and product designers for an exclusive deep-dive into code-first email &amp; document architecture.
          </Paragraph>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#3b0764' : '#f3e8ff',
              borderTopStyle: 'solid',
            }}
            containerPadding="24px 0"
          />

          {/* Event Details 2-Column Grid */}
          <Row layout={ColumnLayouts.TwoEqual}>
            <Column>
              <Heading level="h4" color={primaryColor} fontSize="20px" textAlign="center">
                📅 DATE &amp; TIME
              </Heading>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold" textAlign="center">
                {config.eventDate || 'Thursday, July 31, 2026'}
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" textAlign="center">
                10:00 AM - 3:00 PM PST
              </Paragraph>
            </Column>

            <Column>
              <Heading level="h4" color={primaryColor} fontSize="20px" textAlign="center">
                📍 LOCATION
              </Heading>
              <Paragraph color={textColor} fontSize="14px" fontWeight="bold" textAlign="center">
                Moscone Center &amp; Virtual Live
              </Paragraph>
              <Paragraph color={textMuted} fontSize="13px" textAlign="center">
                San Francisco, CA
              </Paragraph>
            </Column>
          </Row>

          <Divider
            border={{
              borderTopWidth: '1px',
              borderTopColor: isDark ? '#3b0764' : '#f3e8ff',
              borderTopStyle: 'solid',
            }}
            containerPadding="24px 0"
          />

          {/* Ticket Pass Placeholder */}
          <Row padding="0">
            <Column
              backgroundColor={isDark ? '#2e1065' : '#f3e8ff'}
              borderRadius="12px"
              padding="20px"
            >
              <Paragraph color={primaryColor} fontSize="12px" fontWeight="bold" textAlign="center">
                PASS RECIPIENT: {recipientName.toUpperCase()}
              </Paragraph>
              <Heading level="h3" color={textColor} fontSize="18px" fontWeight="bold" textAlign="center">
                VIP ALL-ACCESS TICKET
              </Heading>
              <Image
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ELEMENTS-SUMMIT-2026-VIP"
                alt="Ticket QR Code"
                width="110px"
              />
              <Paragraph color={textMuted} fontSize="11px" textAlign="center" containerPadding="8px 0 0 0">
                Ticket Code: #ELM-VIP-99410
              </Paragraph>
            </Column>
          </Row>

          {/* CTA */}
          {config.showCTA && (
            <Row padding="24px 0 0 0">
              <Column>
                <Button
                  href="https://unlayer.com/elements"
                  backgroundColor={primaryColor}
                  color="#ffffff"
                  fontSize="16px"
                  fontWeight="bold"
                  borderRadius="10px"
                  padding="14px 32px"
                >
                  Confirm Your RSVP →
                </Button>
              </Column>
            </Row>
          )}
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
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                ]}
              />
            )}
            <Paragraph color={textMuted} fontSize="12px" textAlign="center" containerPadding="12px 0 0 0">
              Hosted by {brandName} • Powered by Unlayer Elements
            </Paragraph>
          </Column>
        </Row>
      )}
    </Container>
  );
};

export const getEventInviteJsx = (config: TemplateCustomization): string => {
  return `import { Email, Row, Column, Heading, Paragraph, Button, Image, ColumnLayouts } from '@unlayer/react-elements';

export const EventTicketEmail = () => (
  <Email backgroundColor="#faf5ff" contentWidth="600px">
    <Row padding="24px 0">
      <Column backgroundColor="#ffffff" borderRadius="20px" padding="40px 32px">
        <Heading level="h1" color="${config.primaryColor}">${config.eventName || 'Elements Summit 2026'}</Heading>
        <Paragraph>Pass Holder: ${config.recipientName || 'Guest'}</Paragraph>
        <Button href="https://unlayer.com" backgroundColor="${config.primaryColor}">Confirm RSVP →</Button>
      </Column>
    </Row>
  </Email>
);`;
};
