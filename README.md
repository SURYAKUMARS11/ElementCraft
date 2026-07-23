# 🚀 ElementCraft Studio — Built with Unlayer Elements

> **Official Submission for the Unlayer Elements Challenge ($600 Prize Pool)**  
> *Deadline: July 31, 2026*

**ElementCraft Studio** is an interactive, code-first email and document template builder studio powered by **[@unlayer/react-elements](https://github.com/unlayer/elements)**. It allows developers and designers to explore, customize, and export 5 original, production-ready email and document templates built entirely in React.

---

## 🌟 Features & Highlights

- **5 Original Built-With-Elements Templates**:
  1. 🚀 **SaaS Launch & Onboarding Email**: Hero section, 3-column feature cards, CTA, and social footer.
  2. 🧾 **E-Commerce Order Receipt & Invoice Document**: Print-ready PDF specs, itemized pricing table, tax calculations, and status badges.
  3. 📰 **Tech Pulse Weekly Newsletter**: Issue header, featured story hero, and 2-column article showcase grid.
  4. 📊 **Executive Performance Report Document**: Formal corporate briefing report with 4-KPI metric grid and strategic sign-offs.
  5. 🎟️ **VIP Summit Ticket & Invitation Email**: Glassmorphism event layout, QR ticket pass, date/venue grid, and RSVP button.

- **Live Multi-Mode Rendering Engine**:
  - 📧 **Email HTML Spec**: Email-safe XHTML table markup tested for Gmail, Outlook, Apple Mail, and SendGrid.
  - 🌐 **Responsive Web Spec**: HTML5 Flexbox/Div layouts for landing pages.
  - 📄 **Document / PDF Spec**: Print-optimized layouts for invoice & report generation.

- **Real-Time Interactive Customizer**:
  - Live theme editing (Primary Color, Background, Text Color, Dark/Light Mode Frame).
  - Recipient & company metadata customization.
  - Layout block toggles (CTA Buttons, Social Icons, Footer Bars).

- **Multi-Format Code Exporter**:
  - 1-Click Copy & Download for **Compiled HTML**, **Pure React JSX**, **Unlayer Visual Builder JSON**, and **Plain Text MIME Parts**.

---

## 🛠️ Built With

- **[@unlayer/react-elements](https://github.com/unlayer/elements)**: Core component library (`<Email>`, `<Document>`, `<Row>`, `<Column>`, `<Heading>`, `<Paragraph>`, `<Button>`, `<Image>`, `<Table>`, `<Divider>`, `<Social>`, `renderToHtml`, `renderToJson`, `renderToPlainText`).
- **React 19 & TypeScript**: Typed component architecture with zero-hydration SSR support.
- **Vite 8**: Lightning-fast developer server and optimized build pipeline.
- **Lucide React**: Modern iconography.

---

## 🚀 Quick Start & How to Run

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/unlayer-elements-craft-studio.git
cd unlayer-elements-craft-studio
npm install
```

### 3. Run Development Server
Start the local live studio:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
To generate static production assets:
```bash
npm run build
```

---

## 📐 How @unlayer/react-elements is Used

Every template in ElementCraft Studio is constructed natively using `@unlayer/react-elements` components:

```tsx
import { Email, Row, Column, Heading, Paragraph, Button, renderToHtml } from '@unlayer/react-elements';

export const WelcomeEmail = () => (
  <Email backgroundColor="#f8fafc" contentWidth="600px">
    <Row padding="24px 0">
      <Column backgroundColor="#ffffff" borderRadius="16px" padding="40px 32px">
        <Heading level="h1" color="#1e293b">Welcome aboard!</Heading>
        <Paragraph color="#64748b">Your workspace is fully configured and ready to build.</Paragraph>
        <Button href="https://unlayer.com" backgroundColor="#6366f1" color="#ffffff" borderRadius="8px" padding="14px 28px">
          Get Started →
        </Button>
      </Column>
    </Row>
  </Email>
);

// Compile to email-safe XHTML table output
const html = renderToHtml(<WelcomeEmail />, { mode: 'email' });
```

---

## 📸 Screenshots & Demo

| Template Studio Overview | Code & HTML Exporter |
| :---: | :---: |
| *(Add your screenshot here)* | *(Add your exporter modal screenshot here)* |

| Desktop Email Frame | Mobile Device Viewport |
| :---: | :---: |
| *(Add desktop preview screenshot)* | *(Add mobile preview screenshot)* |

---

## 🏷️ Contest Submission Details

- **Submission Form**: [Unlayer Challenge Submission](https://lnkd.in/e4RzksMV)
- **Hashtag**: `#BuiltWithElements`
- **Tag**: `@Unlayer (YC W22)`
- **License**: MIT
