// app/layout.js
import AuthProvider from "../components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Smart Food Admin",
  description: "Admin panel for Smart Food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}