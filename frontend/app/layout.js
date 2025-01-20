import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Navbar from "@/components/Navbar/Navbar"; 

export const metadata = {
  title: "HackYourFuture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
