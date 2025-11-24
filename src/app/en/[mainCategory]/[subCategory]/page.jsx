'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import BuilderLayout from '../../../../components/BuilderLayout';
import Loader from '../../../../components/Loader';

export default function SubCategoryPage({ params }) {

  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const ENTRIES_ENDPOINT = process.env.NEXT_PUBLIC_ST_ENTRIES_ENDPOINT;

  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);

  // Manually include additional series (even if API has none)
  const additionalSeries = [
    'L5 Series',
    'PX1 Series',
    'A9 Series',
    'U8 Series',
    'C1 Series',
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}${ENTRIES_ENDPOINT}`, {
          cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        const items = data?.data || data?.entries || [];

        // Filter products by category params
        const matched = items.filter(
          (item) =>
            item.main_category_taxonomy?.slug?.toLowerCase() ===
              resolvedParams.mainCategory?.toLowerCase() &&
            item.category?.slug?.toLowerCase() ===
              resolvedParams.subCategory?.toLowerCase()
        );

        setProducts(matched);
        setFilteredProducts(matched);

        // Extract all unique series names from API
        const extractedSeries = Array.from(
          new Set(
            matched
              .map((item) => {
                const series =
                  item.series?.label ||
                  item.series?.value ||
                  item.series_name ||
                  item.title?.split(' ')[0];
                return series || null;
              })
              .filter(Boolean)
          )
        );

        // Merge with manually added list and remove duplicates
        const allSeries = Array.from(
          new Set([...extractedSeries, ...additionalSeries])
        );
        setSeriesList(allSeries);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [resolvedParams.mainCategory, resolvedParams.subCategory]);

  // Handle checkbox toggle
  const handleSeriesChange = (series) => {
    let updatedSelection = [...selectedSeries];
    if (updatedSelection.includes(series)) {
      updatedSelection = updatedSelection.filter((s) => s !== series);
    } else {
      updatedSelection.push(series);
    }
    setSelectedSeries(updatedSelection);

    // Apply filtering (if none selected → show all)
    if (updatedSelection.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        const productSeries =
          product.series?.label ||
          product.series?.value ||
          product.series_name ||
          product.title?.split(' ')[0];
        return updatedSelection.includes(productSeries);
      });
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <BuilderLayout>
        <Loader />
      </BuilderLayout>
    );
  }

  if (!products.length) {
    return (
      <BuilderLayout>
        <Container className='py-5'>
          <Row className='py-5'>
            <Col className='py-5 text-center text-gray-600'>
              No products found
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
          {/* Sidebar Filter */}
          <Col xs='12' sm='12' md='3' lg='3'>
            <div className='border rounded p-3 shadow-sm bg-white'>
              <h5 className='mb-3 fw-bold'>FILTER BY SERIES</h5>
              <ul className='list-unstyled m-0'>
                {seriesList.map((series) => (
                  <li key={series} className='mb-2'>
                    <label className='d-flex align-items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={selectedSeries.includes(series)}
                        onChange={() => handleSeriesChange(series)}
                      />
                      <span>{series}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Product Listing */}
          <Col xs='12' sm='12' md='9' lg='9'>
            <Row className='gy-4'>
              {filteredProducts.map((product) => (
                <Col xs='12' sm='6' md='4' lg='4' key={product.slug}>
                  <Card className='shadow-sm h-100'>
                    <CardBody className='text-center'>
                      <img
                        src={product.product_main_image?.permalink}
                        alt={product.title}
                        className='img-fluid'
                      />

                      <h6 className='text-2xl font-bold mb-2'>
                        {product.title}
                      </h6>

                      {/* Safe series rendering */}
                      {product.series && (
                        <p className='text-muted'>
                          {typeof product.series === 'object'
                            ? product.series.label || product.series.value || ''
                            : product.series}
                        </p>
                      )}

                      {/* Optional description */}
                      {product.description && (
                        <div className='mt-3 text-gray-700'>
                          {typeof product.description === 'object'
                            ? JSON.stringify(product.description)
                            : product.description}
                        </div>
                      )}

                      <Link
                        href={`/en/product/${product.slug}`}
                        className='d-inline-block mt-3'
                      >
                        <Button style={{ backgroundColor: '#00CCCC', color:'#fff', border:'none' }}>
                          View Product
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}

              {filteredProducts.length === 0 && (
                <Col xs='12'>
                  <div className='text-center text-muted py-5'>
                    No products found for the selected series.
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </BuilderLayout>
  );
}