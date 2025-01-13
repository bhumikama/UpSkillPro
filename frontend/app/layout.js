import "./globals.css";
import Navbar from '../components/navbar/Navbar.jsx';

export const metadata = {
  title: "HackYourFuture"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
