'use client';
import React, { useEffect, useState } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BuilderLayout({ children }) {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const header = symbols.find((s) => s.name === 'Header');
  const footer = symbols.find((s) => s.name === 'footer');

  return (
    <>
      {header && <BuilderComponent model='symbol' content={header} />}
      <main>{children}</main>
      {footer && <BuilderComponent model='symbol' content={footer} />}
    </>
  );
}
