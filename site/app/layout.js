import './globals.css';

export const metadata = {
  title: 'National Global Academy | Cruise, Merchant Navy, Aviation and Hospitality Training',
  description: 'Training and career guidance for cruise, Merchant Navy, aviation and hospitality pathways after Class 10 and Class 12. Noida.',
  icons: { icon: '/assets/brand/nga-logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
