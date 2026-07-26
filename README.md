# ⚡ ElementCraft Studio — Code-First Email & Document Engine

**ElementCraft Studio** is a modern, web-based application and live template workspace powered by **[@unlayer/react-elements](https://github.com/unlayer/elements)**. It allows developers and designers to author, customize, and export production-ready email HTML, responsive web layouts, and printable PDF documents directly using modular React components.

---

## 📸 Application Screenshots & Visual Showcase

### 1. 🚀 Interactive Landing Showcase & Live Sandbox
![ElementCraft Studio Landing Page](./public/Screenshot%202026-07-26%20093215.png)

### 2. 🎨 Live Studio Builder & Parameter Inspector
![Live Studio Builder & Parameter Customizer](./public/Screenshot%202026-07-26%20093226.png)

### 3. ⚡ Multi-Renderer Comparison & Template Export Center
![Multi-Renderer Comparison & Code Exporter](./public/Screenshot%202026-07-26%20093318.png)

---

## 🌟 Key Application Features

- **🚀 Interactive Showcase Landing Page**:
  - Live interactive preview sandbox with instant parameter adjustments.
  - Multi-theme color picker and live render mode switchers (Web, Email, PDF).
  - Feature highlights and technical architecture breakdown.
  - Real-time React JSX code playground with copy-to-clipboard functionality.

- **🎨 Live Studio Builder**:
  - Full-screen IDE workspace layout with collapsible parameter inspector.
  - Real-time customization of primary brand colors, dark mode frames, typography, recipient data, and layout toggle blocks.
  - Desktop (820px) and Mobile (390px) device frame viewport switchers.
  - Dark and Light mode interface themes.

- **⚡ Multi-Renderer Side-by-Side Comparison**:
  - View **Web Page**, **Email HTML**, and **PDF Document** renderers simultaneously in 3 parallel live columns using the exact same component state.

- **📦 5 Original Production-Ready Templates**:
  1. 🚀 **SaaS Launch & Onboarding Email**: Modern SaaS welcome template with hero card, 3-column feature grid, CTA button, and social links.
  2. 🧾 **E-Commerce Order Receipt & Invoice Document**: Print-ready PDF specs with company header, itemized pricing table, tax breakdown, and status badges.
  3. 📰 **Tech Pulse Weekly Newsletter**: High-engagement developer newsletter with issue header, story hero, and 2-column article grid.
  4. 📊 **Executive Performance Report Document**: Formal corporate briefing report with 4-KPI metric grid and strategic sign-offs.
  5. 🎟️ **VIP Summit Ticket & Invitation Email**: Exclusive event invitation email complete with date/venue grid, QR ticket pass, and RSVP button.

- **💻 Template Export Center**:
  - **Compiled HTML Output**: Production-grade HTML table & flexbox code.
  - **React JSX Source**: Type-safe component tree source code.
  - **Unlayer JSON Schema**: Bi-directional design JSON format for Unlayer visual editors (`renderToJson()`).
  - **Plain Text MIME**: Clean text fallbacks for email delivery.

---

## 🛠️ Technology Stack

- **[@unlayer/react-elements](https://github.com/unlayer/elements)**: Core component library (`<Email>`, `<Document>`, `<Body>`, `<Row>`, `<Column>`, `<Heading>`, `<Paragraph>`, `<Button>`, `<Image>`, `<Table>`, `<Divider>`, `<Social>`, `renderToHtml`, `renderToJson`, `renderToPlainText`).
- **React 19 & TypeScript**: Typed component architecture with zero-hydration SSR support.
- **Vite 8**: Ultra-fast dev server and bundle optimizer.
- **Lucide React**: Iconography suite.

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Installation
```bash
git clone https://github.com/SURYAKUMARS11/ElementCraft.git
cd ElementCraft
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT License. Created with ❤️ using `@unlayer/react-elements`.
