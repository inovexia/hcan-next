'use client';
import React, { use, useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import BuilderLayout from '../../../components/BuilderLayout';
import Loader from '../../../components/Loader';

export default function SubCategoryPage({ params }) {
  const resolvedParams = use(params); // ✅ unwrap the Promise
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
        console.error('❌ Error fetching category:', error);
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
        <div className='p-10 text-center text-gray-600'>Page not found</div>
      </BuilderLayout>
    );
  }

  return (
    <BuilderLayout>
      <Container className='py-5'>
        <h1 className='text-2xl font-bold'>{current.title}</h1>
        <p>Main Category: {current.main_category_taxonomy?.title}</p>
        <p>Sub Category: {current.category?.title}</p>
        {current.description && (
          <div className='mt-4 text-gray-700'>{current.description}</div>
        )}
      </Container>
    </BuilderLayout>
  );
}
