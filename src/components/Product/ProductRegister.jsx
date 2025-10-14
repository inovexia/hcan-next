'use client';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

export default function ProductRegister() {
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState(null);

  // Load form fields from Statamic API
  useEffect(() => {
    fetch('https://hcan.dev.developer1.website/api/forms/product_registration')
      .then((res) => res.json())
      .then((data) => setForm(data.data))
      .catch(() => setStatus('Failed to load form'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const response = await fetch(
      'https://hcan.dev.developer1.website!/forms/product_registration/submit',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setStatus('Thank you! Your product has been registered.');
      setFormData({});
    } else {
      setStatus('Submission failed, please try again.');
    }
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <Container className='w-100 py-5 border rounded-xl shadow'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto p-6'
        style={{ width: '90%' }}
      >
        <Row className='pdt-register-form d-flex flex-wrap m-auto w-100 gx-4'>
          {Object.values(form.fields || {}).map((field) => {
        
            if (field.if) {
              const [depField, condition] = Object.entries(field.if)[0]; 
              const [operator, expectedValue] = condition.split(' ');
              const actualValue = formData[depField];

              if (operator === 'equals' && actualValue !== expectedValue) {
                return null;
              }
            }
            let style = {};
            const colSize = field.width === 50 ? 6 : 12;

            return (
              <Col md={colSize} key={field.handle} className='mb-4'>
                <label className='block mb-1 font-medium'>
                  {field.display}
                  {field.validate?.includes('required') && (
                    <span style={{ color: 'red' }}> *</span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    name={field.handle}
                    onChange={handleChange}
                    value={formData[field.handle] || ''}
                    className='w-100 border rounded p-2'
                    required={field.validate?.includes('required')}
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.handle}
                    onChange={handleChange}
                    value={formData[field.handle] || ''}
                    className='w-100 border rounded p-2'
                    required={field.validate?.includes('required')}
                  >
                    <option value=''>
                      {field.placeholder || 'Select an option'}
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt.key || opt.value} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <input
                    type='file'
                    name={field.handle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.handle]: e.target.files[0],
                      })
                    }
                    className='w-100 border rounded p-2'
                    required={field.validate?.includes('required')}
                  />
                ) : field.type === 'checkbox' ? (
                  <label className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      name={field.handle}
                      checked={formData[field.handle] || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.handle]: e.target.checked,
                        })
                      }
                    />
                    <span>{field.display}</span>
                  </label>
                ) : field.type === 'assets' ? (
                  <Col md={12} className='mb-4'>
                    <div
                      className='border border-dashed rounded p-4 text-center'
                      style={{
                        borderColor: '#ccc',
                        backgroundColor: '#f9f9f9',
                      }}
                      onClick={() =>
                        document.getElementById('receipt-upload').click()
                      }
                    >
                      <p className='mb-2 p-5'>Drag & Drop a File Here</p>
                      <button type='button' className='btn btn-primary'>
                        Upload Receipt
                      </button>
                      <input
                        id='receipt-upload'
                        type='file'
                        name='receipt'
                        accept='.jpg,.jpeg,.png,.pdf'
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            receipt: e.target.files[0],
                          })
                        }
                      />
                    </div>
                  </Col>
                ) : (
                  <input
                    type={field.input_type || field.type || 'text'}
                    name={field.handle}
                    onChange={handleChange}
                    value={formData[field.handle] || ''}
                    className='w-100 border rounded p-2'
                    required={field.validate?.includes('required')}
                  />
                )}
              </Col>
            );
          })}
          <button
            type='submit'
            className='d-inline-block w-auto bg-transparent border-0 border-bottom border-black mx-auto' style={{fontSize:26}}> 
            REGISTER
          </button>
        </Row>

        {status && <p className='mt-2 text-sm text-gray-700'>{status}</p>}
      </form>
    </Container>
  );
}
