'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { useParams } from 'next/navigation';
import ProductSlider from '../../../components/Product/ProductSlider';
import TabSection from '../../../components/Product/TabSection';
import StarRating from '../../../components/Product/StarRating';


const products = [
  {
    id: 1,
    title: 'Hisense L9Q Ultra-short Throw 4K Projector',
    aboutProduct:
      'Experience the Hisense L9Q Laser Projector—where stunning picture, advanced technology, and world-class sound come together. It features a massive 80"–200" projection size, 4K display with ultra-bright 5000 ANSI Lumens and 5000:1 native contrast, delivering vibrant colours and deep blacks. Powered with Dolby Vision and IMAX Enhanced, the L9Q brings a truly cinematic experience into your home. Audio is elevated through a collaboration with Devialet and the Opéra National de Paris, featuring operatic-grade tuning and a powerful 6.2.2 surround sound system for immersive, theatre-quality sound.',
    brand: 'Hisense',
    model: 'L9Q',
    category: 'Projectors',
    price: 349999,
    rating: 5.0,
    review: 3,
    productLargeImage: '/images/pdt-large-image.jpg',
    thumbnail: '/images/img1.jpg',
    images: ['/images/img2.jpg', '/images/img3.jpg', '/images/img4.jpg'],
    description: 'Projects 80" to 200" with ultra-short throw lens.',
    status: 'Coming Soon',
  },
  {
    id: 2,
    title: 'Samsung Premiere LSP9T 4K Laser Projector',
    brand: 'Samsung',
    aboutProduct: '',
    model: 'L9Q',
    category: 'Projectors',
    price: 299999,
    rating: 4.8,
    review: 3,
    productLargeImage: '/images/banner-EN-1.jpg',
    thumbnail: '/images/img3.jpg',
    images: ['/images/img2.jpg', '/images/img1.jpg', '/images/img5.jpg'],
    description: 'Triple laser, 130" max screen, ultra-short throw.',
    status: 'Available',
  },
  {
    id: 3,
    title: 'LG HU85LA CineBeam 4K Projector',
    aboutProduct: '',
    brand: 'LG',
    model: 'L9Q',
    category: 'Projectors',
    price: 279999,
    rating: 4.7,
    review: 5,
    productLargeImage: '/images/pdt-large-image.jpg',
    thumbnail: '/images/img2.jpg',
    images: ['/images/img3.jpg', '/images/img5.jpg', '/images/img6.jpg'],
    description: '4K UHD, smart TV features, 120" projection.',
    status: 'Available',
  },
  {
    id: 4,
    title: 'BenQ V7050i 4K Laser Projector',
    aboutProduct: '',
    brand: 'BenQ',
    model: 'L9Q',
    category: 'Projectors',
    price: 249999,
    rating: 4.6,
    review: 6,
    productLargeImage: '/images/banner-EN-1.jpg',
    thumbnail: '/images/img4.jpg',
    images: ['/images/img5.jpg', '/images/img6.jpg', '/images/img3.jpg'],
    description: 'HDR-PRO, Android TV, 120" screen.',
    status: 'Available',
  },
  {
    id: 5,
    title: 'Epson LS500 4K PRO-UHD Projector',
    aboutProduct: '',
    brand: 'Epson',
    model: 'L9Q',
    category: 'Projectors',
    price: 229999,
    rating: 4.5,
    review: 3,
    productLargeImage: '/images/pdt-large-image.jpg',
    thumbnail: '/images/img5.jpg',
    images: ['/images/img2.jpg', '/images/img1.jpg', '/images/img6.jpg'],
    description: 'Ultra-short throw, 4K enhancement, 130" screen.',
    status: 'Available',
  },
  {
    id: 6,
    title: 'ViewSonic X2000B-4K Laser Projector',
    aboutProduct: '',
    brand: 'ViewSonic',
    model: 'L9Q',
    category: 'Projectors',
    price: 199999,
    rating: 4.4,
    review: 1,
    productLargeImage: '/images/banner-EN-1.jpg',
    thumbnail: '/images/img6.jpg',
    images: ['/images/img3.jpg', '/images/img1.jpg', '/images/img2.jpg'],
    description: '4K UHD, Dolby Audio, 150" screen.',
    status: 'Available',
  },
  {
    id: 7,
    title: 'Optoma CinemaX P2 4K Laser Projector',
    aboutProduct: '',
    brand: 'Optoma',
    model: 'L9Q',
    category: 'Projectors',
    price: 189999,
    rating: 4.3,
    review: 9,
    productLargeImage: '/images/pdt-large-image.jpg',
    thumbnail: '/images/img1.jpg',
    images: ['/images/img2.jpg', '/images/img3.jpg', '/images/img5.jpg'],
    description: 'Ultra-short throw, 120" screen, voice control.',
    status: 'Available',
  },
  {
    id: 8,
    title: 'XGIMI Aura 4K UST Laser Projector',
    aboutProduct: '',
    brand: 'XGIMI',
    model: 'L9Q',
    category: 'Projectors',
    price: 179999,
    rating: 4.2,
    review: 10,
    productLargeImage: '/images/banner-EN-1.jpg',
    thumbnail: '/images/img2.jpg',
    images: ['/images/img3.jpg', '/images/img1.jpg', '/images/img5.jpg'],
    description: '4K UHD, 2400 ANSI lumens, 150" screen.',
    status: 'Available',
  },
  {
    id: 9,
    title: 'JMGO U2 4K Tri-Color Laser Projector',
    aboutProduct: '',
    brand: 'JMGO',
    model: 'L9Q',
    category: 'Projectors',
    price: 169999,
    rating: 4.1,
    review: 13,
    productLargeImage: '/images/pdt-large-image.jpg',
    thumbnail: '/images/img1.jpg',
    images: ['/images/img2.jpg', '/images/img3.jpg', '/images/img4.jpg'],
    description: 'Tri-color laser, 4K UHD, 100" screen.',
    status: 'Available',
  },
  {
    id: 10,
    title: 'VAVA Chroma 4K Laser Projector',
    aboutProduct: '',
    brand: 'VAVA',
    model: 'L9Q',
    category: 'Projectors',
    price: 159999,
    rating: 4.0,
    review: 30,
    productLargeImage: '/images/banner-EN-1.jpg',
    thumbnail: '/images/img5.jpg',
    images: ['/images/img2.jpg', '/images/img1.jpg', '/images/img3.jpg'],
    description: 'Triple laser, 2500 lumens, 150" screen.',
    status: 'Available',
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);
  const [headerMain, setHeaderMain] = useState(null);
  const [footerMain, setFooterMain] = useState(null);
useEffect(() => {
  builder.get('symbol', { name: 'my-header' }).toPromise().then(setHeaderMain);
}, []);
useEffect(() => {
  builder.get('symbol', { name: 'footer' }).toPromise().then(setFooterMain);
}, []);


  if (!product) {
    return (
      <>
        {headerMain && <BuilderComponent model='symbol' content={headerMain} />}
        <Container className='py-5'>
          <h2>Product not found</h2>
          <p>No product exists with ID: {params.id}</p>
        </Container>
  
      </>
    );
  }

  return (
    <>
      {headerMain && <BuilderComponent model='symbol' content={headerMain} />}
      <Container fluid className='pdt-container'>
        <Row>
          <Col md={6}>
            <ProductSlider
              thumbnail={product.thumbnail}
              images={product.images}
            />
          </Col>
          <Col md={6} className='pdt-details'>
            <Card className='border-0'>
              <CardBody>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
                <p className='model'>Model: {product.model}</p>
                <p className='model-btn'>{product.model}</p>
                <StarRating rating={product.rating} reviews={product.review} />
                <p className={`status`}>{product.status}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <TabSection product={product} />

    </>
  );
}
