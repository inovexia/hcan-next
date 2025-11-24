'use client';
import React, { useEffect, useState } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { usePathname } from 'next/navigation';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BuilderLayout({ children }) {
  const pathname = usePathname();
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  // Detect language from pathname
  const lang = pathname?.startsWith('/fr') ? 'fr' : 'en';

  useEffect(() => {
    async function loadSymbols() {
      const allSymbols = await builder.getAll('symbol', {
        fields: 'id,name,data',
        options: { noTargeting: true },
      });

      setSymbols(allSymbols);
      setLoading(false);
    }

    loadSymbols();
  }, []);

  if (loading) return null;

  // Pick correct header + footer based on language
  const header = symbols.find((s) =>
    lang === 'fr'
      ? s.name.toLowerCase() === 'header-fr'
      : s.name.toLowerCase() === 'header-en'
  );

  const footer = symbols.find((s) =>
    lang === 'fr'
      ? s.name.toLowerCase() === 'footer-french'
      : s.name.toLowerCase() === 'footer'
  );

  return (
    <>
      {header && <BuilderComponent model='symbol' content={header} />}

      <main>{children}</main>

      {footer && <BuilderComponent model='symbol' content={footer} />}
    </>
  );
}
