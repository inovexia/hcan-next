'use client';
import { builder, BuilderComponent } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container } from 'reactstrap';
import Loader from '../../../../components/Loader';
import ProductSlider from '../../../../components/Product/ProductSlider';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function ProductPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [product, setProduct] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const ENTRIES_ENDPOINT = process.env.NEXT_PUBLIC_ST_ENTRIES_ENDPOINT;

  const path = `/fr/product/${slug}`;

  useEffect(() => {
    async function loadProductPage() {
      setLoading(true);
      try {
        const allSymbols = await builder.getAll('symbol', {
          fields: 'id,name,data',
          options: { noTargeting: true },
        });
        setSymbols(allSymbols);

        // Then try fetching Builder page content
        const builderContent = await builder
          .get('products-french', {
            userAttributes: { urlPath: path },
          })
          .toPromise();

        setContent(builderContent);

        //Fetch product data from Statamic API if Builder entry exists
        const productId = builderContent?.data?.id;

        if (productId) {
          const res = await fetch(
            `${API_BASE}${ENTRIES_ENDPOINT}/${productId}`
          );
          const json = await res.json();
          setProduct(json.data);
        }
      } catch (err) {
        console.error('Error loading Builder page:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) loadProductPage();
  }, [path]);

  if (loading) return <Loader />;

  // If no Builder product content or product data
  if (!product) {
    return (
      <>
        {/* Header Symbol */}
        {symbols
          .filter((s) => s.name.toLowerCase() === 'header-fr')
          .map((symbol) => (
            <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
          ))}

        <Container className='py-5 text-center'>
          <h2>Product not found</h2>
          <p>No product exists with slug: {slug}</p>
        </Container>

        {/* Footer Symbol */}
        {symbols
          .filter((s) => s.name.toLowerCase() === 'footer')
          .map((symbol) => (
            <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
          ))}
      </>
    );
  }

  //Product found case

  const sanitizedProduct = Object.fromEntries(
    Object.entries(product || {}).map(([key, val]) => {
      if (val && typeof val === 'object' && 'value' in val) {
        return [key, val.value];
      }
      return [key, val];
    })
  );

  return (
    <>
      {/* Header Symbol */}
      {symbols
        .filter((s) => s.name.toLowerCase() === 'header-fr')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}
      {content && (
        <BuilderComponent
          model='products-french'
          content={content}
          data={{ product: sanitizedProduct }}
        />
      )}

      {/* Footer Symbol */}
      {symbols
        .filter((s) => s.name.toLowerCase() === 'footer')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}
    </>
  );
}
