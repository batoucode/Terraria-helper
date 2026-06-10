import type { Metadata } from 'next';
import { Kalam, Caveat, Patrick_Hand } from 'next/font/google';
import './globals.css';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-patrick',
});

export const metadata: Metadata = {
  title: 'Terraria Craft Helper',
  description: 'Assistant de craft pour Terraria — objets, recettes, favoris',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${kalam.variable} ${caveat.variable} ${patrickHand.variable}`}>
      <body className="font-caveat">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
