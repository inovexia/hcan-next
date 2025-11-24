'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { builder, BuilderComponent } from '@builder.io/react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Loader from '../../../../components/Loader';
import ProductSlider from '../../../../components/Product/ProductSlider';
import TabSection from '../../../../components/Product/TabSection';
import StarRating from '../../../../components/Product/StarRating';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const ENTRIES_ENDPOINT = process.env.NEXT_PUBLIC_ST_ENTRIES_ENDPOINT;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE}${ENTRIES_ENDPOINT}`
        );

        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        const products = data?.data || data?.entries || [];

        // Find product by slug
        const found = products.find(
          (item) => item?.slug?.toLowerCase() === slug?.toLowerCase()
        );

        setProduct(found || null);

        // Fetch Builder symbols (header/footer)
        const allSymbols = await builder.getAll('symbol', {
          fields: 'id,name,data',
          options: { noTargeting: true },
        });
        setSymbols(allSymbols);
      } catch (err) {
        console.error('Error loading product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchData();
  }, [slug]);

  // Loader while fetching data
  if (loading) {
    return <Loader />;
  }

  // If product not found
  if (!product) {
    return (
      <>
        {symbols
          .filter((s) => s.name === 'Header')
          .map((symbol) => (
            <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
          ))}
        <Container className='py-5 text-center'>
          <h2>Product not found</h2>
          <p>No product exists with slug: {slug}</p>
        </Container>
        {symbols
          .filter((s) => s.name === 'footer')
          .map((symbol) => (
            <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
          ))}
      </>
    );
  }
  const sanitizedProduct = Object.fromEntries(
    Object.entries(product || {}).map(([key, val]) => {
      if (val && typeof val === 'object' && 'value' in val) {
        return [key, val.value];
      }
      return [key, val];
    })
  );
console.log('Sanitized product data passed to Builder:', sanitizedProduct);

  return (
    <>
      {/* Header Symbol */}
      {symbols
        .filter((s) => s.name === 'Header-fr')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}

      {/* Product Details */}
      <Container fluid className='pdt-container py-5'>
        <Row>
          <Col md={6}>
            <ProductSlider
              thumbnail={sanitizedProduct?.product_main_image.permalink}
              images={
                sanitizedProduct?.product_images
                  ?.slice(1)
                  .map((img) => img.permalink) || []
              }
            />
          </Col>

          <Col md={6} className='pdt-details'>
            <Card className='border-0 shadow-sm'>
              <CardBody>
                <h1 className='text-2xl font-bold mb-3'>
                  {sanitizedProduct.title}
                </h1>

                <p className='text-lg mb-3'>
                  {sanitizedProduct.description || ''}
                </p>

                {sanitizedProduct.model && (
                  <p className='text-muted mb-1'>
                    Model: {sanitizedProduct.model}
                  </p>
                )}

                <StarRating
                  rating={sanitizedProduct.rating || 0}
                  reviews={sanitizedProduct.review || 0}
                />

                {sanitizedProduct.status && (
                  <p className='mt-2 font-semibold text-green-600'>
                    {sanitizedProduct.status}
                  </p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Tabs Section */}
      <TabSection product={sanitizedProduct} />

      {/* Footer Symbol */}
      {symbols
        .filter((s) => s.name === 'footer')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}
    </>
  );
}
