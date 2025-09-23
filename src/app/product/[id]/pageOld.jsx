'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function ProductPage() {
  const { id } = useParams();
  const [builderContent, setBuilderContent] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const builderData = await builder
        .get('product-details', {
          userAttributes: {
            urlPath: `/product/${id}`,
          },
        })
        .toPromise();

      const productData = await fetch(
        `https://dummyjson.com/products/${id}`
      ).then((res) => res.json());

      setBuilderContent(builderData);
      setProduct(productData);
    }

    fetchData();
  }, [id]);

  if (!builderContent || !product) return <div>Loading...</div>;

  return (
    <BuilderComponent
      model='product-details'
      content={builderContent}
      data={{ product }}
    />
  );
}
