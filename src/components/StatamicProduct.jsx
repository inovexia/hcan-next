'use client';
import React, { useEffect, useState } from 'react';

export default function StatamicProduct({ slug }) {
  const [product, setProduct] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const ENTRIES_ENDPOINT = process.env.NEXT_PUBLIC_ST_ENTRIES_ENDPOINT;

  useEffect(() => {
    if (!slug) return;

    fetch(
      `${API_BASE}${ENTRIES_ENDPOINT}${slug}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [slug]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className='product-details'>
      <h1>{product.title}</h1>
      {product.image && (
        <img src={product.image} alt={product.title} width='400' />
      )}
      <p>{product.description}</p>
      {product.price && <strong>${product.price}</strong>}
    </div>
  );
}
