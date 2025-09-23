'use client';

import { useEffect, useState } from 'react';

export default function ProductGrid({ heading = 'All Products' }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
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
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100%' }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
