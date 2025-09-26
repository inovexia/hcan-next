'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';

export default function Header() {
  const [symbols, setSymbols] = useState([]);


   useEffect(() => {
     async function fetchSymbols() {
       const allSymbols = await builder.getAll('symbol', {
         fields: 'id,name,data',
         options: { noTargeting: true },
       });
       setSymbols(allSymbols);
     }
     fetchSymbols();
   }, []);

  return (
    symbols
        .filter((s) => s.name === 'Header')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))
  );
}
