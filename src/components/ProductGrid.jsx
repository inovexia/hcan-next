'use client';

import { useEffect, useState } from 'react';

export default function ProductGrid({ heading = 'All Products' }) {
  const [products, setProducts] = useState([]);
  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const ENTRIES_ENDPOINT = process.env.NEXT_PUBLIC_ST_ENTRIES_ENDPOINT;

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `${API_BASE}${ENTRIES_ENDPOINT}`
      );
      const data = await res.json();
      setProducts(data.data);
    }

    fetchProducts();
  }, []);

  return (
    <section style={{ padding: '2rem' }}>
      <h2>{heading}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: '1px solid #ccc', padding: '1rem' }}
          >
            {product.featured_image && (
              <img
                src={product.featured_image}
                alt={product.title}
                style={{ width: '100%' }}
              />
            )}
            <h3>{product.title}</h3>
            {product.price && <p>${product.price}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
