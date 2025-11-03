'use client';

import React, { useState, useEffect } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function ProductsPage() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function fetchBuilderPage() {
      // ✅ Make sure to include the URL for targeting
      const res = await builder.get('products-page', {
        url: '/products',
        cachebust: true,
      });
      console.log('Builder response:', res); 
      setPage(res);
    }

    fetchBuilderPage();
  }, []);

  // ✅ Show fallback if Builder returns no data
  if (!page) return <div>Loading...</div>;

  return <BuilderComponent model="products-page" content={page} />;
}
