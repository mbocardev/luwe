// luwe/app/layout.tsx
import "../styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}