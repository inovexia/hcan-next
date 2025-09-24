import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

export default function TabSection({product}) {

  return (
    <Container fluid className='pdt-tab-section p-0'>
      <Row className='tab-header'>
        <Col className='tab-data'>
          <p className='m-0'>{product.model}</p>
        </Col>
        <Col className='tab-data'>
          <p className='m-0'>L9Q</p>
        </Col>
        <Col className='tab-data'>
          <p className='m-0'>L9Q</p>
        </Col>
        <Col className='tab-data'>
          <p className='m-0'>L9Q</p>
        </Col>
        <Col className='tab-data'>
          <p className='m-0'>Coming Soon</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src={product.productLargeImage}
            alt='Banner'
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6} className='about-product mx-auto py-5'>
          <p
            className='text-center'
            style={{ lineHeight: '1.6', fontWeight: 500, fontSize: 20 }}
          >
            {product.aboutProduct != ''
              ? product.aboutProduct
              : `Experience the Hisense L9Q Laser Projector—where stunning picture, advanced technology, and world-class sound come together. It features a massive 80"–200" projection size, 4K display with ultra-bright 5000 ANSI Lumens and 5000:1 native contrast, delivering vibrant colours and deep blacks. Powered with Dolby Vision and IMAX Enhanced, the L9Q brings a truly cinematic experience into your home. Audio is elevated through a collaboration with Devialet and the Opéra National de Paris, featuring operatic-grade tuning and a powerful 6.2.2 surround sound system for immersive, theatre-quality sound.`}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src='/images/Ultra-short-throw.jpg'
            alt='Banner'
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
      <Row className='my-5 px-md-3'>
        <Col md={6}>
          <img
            src='/images/LPU-EN__Scale.jpg'
            alt='Banner'
            style={{ width: '100%', height: 'auto' }}
          />
          <p
            className='text-center mx-auto py-5'
            style={{
              lineHeight: '1.6',
              fontWeight: 500,
              fontSize: 20,
              maxWidth: '70%',
            }}
          >
            Hisense's award-winning LPU™ (Laser Processing Unit) Digital Laser
            Engine uses pure RGB triple-laser tech for lifelike colour without
            filters. Real-time, Pro AI Algorithms optimize brightness, contrast
            & noise for perfect calibration.{' '}
          </p>
        </Col>
        <Col md={6}>
          <img
            src='/images/imax-en-fr.jpg'
            alt='Banner'
            style={{ width: '100%', height: 'auto' }}
          />
          <p
            className='text-center mx-auto py-5'
            style={{
              lineHeight: '1.6',
              fontWeight: 500,
              fontSize: 20,
              maxWidth: '70%',
            }}
          >
            Experience IMAX-quality cinema right at home with the Hisense L9Q.
            Certified by IMAX Corporation and Hollywood's top technical experts,
            this projector brings you the signature IMAX picture quality and
            DTS®-powered audio immersion. Enjoy an immersive audiovisual
            experience without leaving your living room.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
