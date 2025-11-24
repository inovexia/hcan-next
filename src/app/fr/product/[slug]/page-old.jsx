'use client';
import { builder, BuilderComponent } from '@builder.io/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Loader from '../../../components/Loader';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const path = '/product/' + slug;
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const result = await builder
          .get('products', {
            userAttributes: {
              urlPath: path, 
            },
          })
          .toPromise();
        setContent(result);
      // Fetch Builder symbols (header/footer)
      const allSymbols = await builder.getAll('symbol', {
        fields: 'id,name,data',
        options: { noTargeting: true },
      });
      setSymbols(allSymbols);
      } catch (err) {
        console.error('Builder fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    if (path) fetchContent();
  }, [path]);

  console.log(path);
  console.log(content);

  if (loading) {
    return <Loader />;
  }

   // If product not found
    if (!content) {
      return (
        <>
          {symbols
            .filter((s) => s.name === 'Header')
            .map((symbol) => (
              <BuilderComponent
                key={symbol.id}
                model='symbol'
                content={symbol}
              />
            ))}
          <Container className='py-5 text-center'>
            <h2>Product not found</h2>
            <p>No product exists with slug: {slug}</p>
          </Container>
          {symbols
            .filter((s) => s.name === 'footer')
            .map((symbol) => (
              <BuilderComponent
                key={symbol.id}
                model='symbol'
                content={symbol}
              />
            ))}
        </>
      );
    }

  return (
    <>
      {/* Header Symbol */}
      {symbols
        .filter((s) => s.name === 'Header')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}

        
      <BuilderComponent model='products' content={content} />;


       {/* Footer Symbol */}
      {symbols
        .filter((s) => s.name === 'footer')
        .map((symbol) => (
          <BuilderComponent key={symbol.id} model='symbol' content={symbol} />
        ))}
    </>
  );
  
}
