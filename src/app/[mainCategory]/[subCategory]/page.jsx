'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import BuilderLayout from '../../../components/BuilderLayout';
import Loader from '../../../components/Loader';

export default function SubCategoryPage({ params }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          'https://hcan.dev.developer1.website/api/collections/products/entries',
          { cache: 'no-store' }
        );

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        const items = data?.data || data?.entries || [];
        const matched = items.find(
          (item) =>
            item.main_category_taxonomy?.slug?.toLowerCase() ===
              resolvedParams.mainCategory?.toLowerCase() &&
            item.category?.slug?.toLowerCase() ===
              resolvedParams.subCategory?.toLowerCase()
        );

        setCurrent(matched);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [resolvedParams.mainCategory, resolvedParams.subCategory]);

  if (loading) {
    return (
      <BuilderLayout>
        <Loader />
      </BuilderLayout>
    );
  }

  if (!current) {
    return (
      <BuilderLayout>
        <Container className='py-5'>
          <Row className='py-5'>
            <Col className='py-5 text-center text-gray-600'>
              404 Page not found
            </Col>
          </Row>
        </Container>
      </BuilderLayout>
    );
  }

  return (
    <BuilderLayout>
      <Container className='py-5'>
        <Row className='gy-4'>
          <Col xs='12' sm='6' md='4' lg='3'>
            <Card className='shadow-sm h-100'>
              <CardBody className='text-center'>
                <img
                  src={current.product_main_image?.permalink}
                  alt={current.title}
                  className='img-fluid'
                />
                <h6 className='text-2xl font-bold mb-2'>{current.title}</h6>
                <p>Main Category: {current.main_category_taxonomy?.title}</p>
                <p>Sub Category: {current.category?.title}</p>

                {/* ✅ Description */}
                {current.description && (
                  <div className='mt-3 text-gray-700'>
                    {current.description}
                  </div>
                )}

                {/* ✅ Button */}
                <Link
                  href={`/product/${current.slug}`}
                  className='d-inline-block mt-3'
                >
                  <Button color='secondary'>View Product</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </BuilderLayout>
  );
}
