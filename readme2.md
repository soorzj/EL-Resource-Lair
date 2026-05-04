# ⚜ EL Resource Lair — Academic Archive ⚜

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An independent, community-driven digital archive designed for Electrical & Electronics (EL) students. This application serves as a centralized hub for academic resources, including reference texts, lecture notes, and previous year question papers.

---

## 🏛 Motive & Background
Established as a student initiative with roots tracing back to 1987, the **EL Resource Lair** aims to bridge the gap between official administrative channels and the practical academic needs of students. In an environment where academic materials can often be scattered or difficult to locate, this "Lair" provides a structured, friction-less sanctuary for knowledge preservation and pursuit of excellence.

## 🚀 Key Features

- **Semester-Wise Navigation**: Organized accordion-style interface for Semesters 1 through 4, allowing students to focus on their current curriculum.
- **Advanced Resource Search**: Real-time filtering system that allows users to instantly find subjects or semesters as they type.
- **Communications Center**: Integrated feedback and bug reporting system for community vigilance and resource suggestions.
- **Standalone Mirror**: Includes an `index.html` build that serves as an exact standalone replica of the React application for offline or zero-dependency viewing.
- **Retro-Technical Aesthetic**: A custom-designed UI that blends "parchment and ink" academia with modern engineering motifs.
- **Mobile Responsive**: Fully adaptive layout ensuring that academic resources are accessible on the go.

## 🛠 Technical Details

### Frontend Stack
- **Framework**: [React 18+](https://reactjs.org/) (Functional Components & Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed for reliability)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling with custom theme extending variables)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (For smooth route transitions, accordion physics, and modal entrances)
- **Icons**: [Lucide React](https://lucide.dev/) (Consistent, clean stroke icons)
- **Build Tool**: [Vite](https://vitejs.dev/) (Optimized development server and production builds)

### Architecture Highlights
- **State-Driven UI**: Uses React `useState` and `useMemo` for high-performance filtering and search logic.
- **Standalone Compatibility**: Designed specifically to be exportable into a single-file HTML structure for portability.
- **Design System**: Implements a unique "Retro Lair" theme using CSS variables for consistent handling of the #f5efe0 (Cream) and #c8922a (Gold) color palette.

## 📖 Usage

### For Students
1. **Search**: Use the central search bar to find a specific subject (e.g., "Digital Electronics").
2. **Explore**: Navigate semsters using the sidebar or the main accordion.
3. **Download**: Click on "Notes", "Reference", or "QP Bank" to access external resource links (Google Drive mirrors).
4. **Contribute**: Use the "Submit Resource" button to send new materials to the archive team.

### For Developers
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

> *"The Archive survives on community vigilance. Knowledge is the only wealth that grows when shared."*

© 2026 The EL Resource Lair Project. Independent Academic Initiative.
