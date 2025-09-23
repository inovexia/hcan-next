import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import React from 'react';

export default function TabSection({ rating, review }) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalfStar = decimal >= 0.25; // show half star if decimal is 0.25 or more
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill('full'),
    ...(hasHalfStar ? ['half'] : []),
    ...Array(emptyStars).fill('empty'),
  ];

  return (
    <div className='d-flex align-items-center'>
      {stars.map((type, i) => (
        <span
          key={i}
          style={{ color: '#00bcd4', fontSize: '1.5rem', marginRight: '2px' }}
        >
          {type === 'full' && <i className='bi bi-star-fill'></i>}
          {type === 'half' && <i className='bi bi-star-half'></i>}
          {type === 'empty' && <i className='bi bi-star'></i>}
        </span>
      ))}
      <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
        {rating.toFixed(1)} ({reviews})
      </span>
      <a
        href='#write-review'
        style={{
          marginLeft: '12px',
          color: '#007bff',
          textDecoration: 'underline',
        }}
      >
        Write a review
      </a>
    </div>
  );
}
