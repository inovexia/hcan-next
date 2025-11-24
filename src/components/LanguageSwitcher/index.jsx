'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // Extract current locale: /en/products → "en"
  const currentLocale = pathname.split('/')[1];

  // Replace locale in current URL
  const switchLocale = (locale) => {
    const segments = pathname.split('/');
    segments[1] = locale; // replace locale
    return segments.join('/');
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Link
        href='/'
        style={{
          fontWeight: currentLocale === 'en' ? '600' : '400',
          opacity: currentLocale === 'en' ? 1 : 0.6,
        }}
      >
        EN
      </Link>

      <span style={{ fontSize: '10px', color: '#888' }}>•</span>

      <Link
        href="/fr/accueil"
        style={{
          fontWeight: currentLocale === 'fr' ? '600' : '400',
          opacity: currentLocale === 'fr' ? 1 : 0.6,
        }}
      >
        FR
      </Link>
    </div>
  );
}
