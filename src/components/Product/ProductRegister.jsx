'use client';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Loader from '../../components/Loader';

export default function ProductRegister() {
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_ST_API_BASE_URL;
  const FORM_ENDPOINT = process.env.NEXT_PUBLIC_ST_FORM_ENDPOINT;
  const SUBMIT_ENDPOINT = process.env.NEXT_PUBLIC_ST_FORM_SUBMIT;

  console.log('API NAME', API_BASE);

  console.log('API NAME',API_BASE);

  useEffect(() => {
    fetch(`${API_BASE}${FORM_ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => setForm(data.data))
      .then(() => setLoading(false))
      .catch(() => setStatus('Failed to load form'));
  }, []);


  const sanitizeInput = (value) => {
    if (typeof value !== 'string') return value;
    return value
      .replace(/<[^>]*>?/gm, '')
      .replace(/(script|alert|onerror|onload|<|>|{|}|;)/gi, '')
      .replace(/['"`]/g, '')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    let sanitized = sanitizeInput(value);

    if (name.toLowerCase().includes('phone')) {
      sanitized = sanitized.replace(/[^0-9+ ]/g, '');
    }

    setFormData({ ...formData, [name]: sanitized });
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) continue;

      if (typeof value === 'string') {
        if (
          /<|>|script|select|insert|delete|update|drop|union|--/i.test(value)
        ) {
          setStatus(`Suspicious input detected in field: ${key}`);
          return false;
        }
      }
    }

    const phoneField = Object.keys(formData).find((k) =>
      k.toLowerCase().includes('phone')
    );

    if (phoneField && formData[phoneField] && formData[phoneField].length < 7) {
      setStatus('Please enter a valid phone number.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    if (!validateForm()) return;

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const response = await fetch(`${API_BASE}${SUBMIT_ENDPOINT}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formPayload,
      });

      // Statamic returns 200 on success (even if browser blocks body)
      if (response.ok) {
        setStatus('Thank you! Your product has been registered.');
        return;
      }

      // CORS-blocked success (status=0 or opaque)
      if (response.type === 'opaque' || response.status === 0) {
        setStatus('Thank you! Your product has been registered.');
        return;
      }

      // Actual failure
      setStatus('Submission failed. Please try again.');
    } catch (error) {
      console.error(error);
      setStatus('Submission failed. Please try again.');
    }
  };



  if (loading) return <Loader />;

  const evaluateCondition = (conditionObj) => {
    if (!conditionObj) return true;

    return Object.entries(conditionObj).every(([depField, rule]) => {
      if (!rule) return true;

      const [operator, ...expectedParts] = rule.split(' ');
      const expectedValue = expectedParts.join(' ').toLowerCase().trim();
      const actualValue = (formData[depField] || '').toString().toLowerCase();

      switch (operator) {
        case 'equals':
        case 'is':
          return actualValue === expectedValue;
        case 'not':
        case '!=':
          return actualValue !== expectedValue;
        case 'in':
          return expectedValue
            .split(',')
            .map((v) => v.trim())
            .includes(actualValue);
        default:
          return true;
      }
    });
  };

  return (
    <Container className='w-100 py-5 border rounded-xl shadow'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto p-6'
        style={{ width: '90%' }}
      >
        <Row className='pdt-register-form d-flex flex-wrap m-auto w-100 gx-4'>
          {Object.values(form.fields || {}).map((field) => {
            if (!evaluateCondition(field.if)) return null;

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
                      <option
                        key={opt.key || opt.value}
                        value={opt.key || opt.value}
                      >
                        {opt.value || opt.label || opt.key}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'file' || field.type === 'assets' ? (
                  <div
                    className='border border-dashed rounded p-4 text-center'
                    onClick={() =>
                      document.getElementById(field.handle).click()
                    }
                  >
                    <p className='mb-2 p-5'>Drag & Drop a File Here</p>
                    <button type='button' className='btn btn-primary'>
                      Upload File
                    </button>
                    <input
                      id={field.handle}
                      type='file'
                      name={field.handle}
                      accept='.jpg,.jpeg,.png,.pdf'
                      style={{ display: 'none' }}
                      onChange={handleChange}
                      required={field.validate?.includes('required')}
                    />
                    {formData[field.handle] && (
                      <p className='mt-2 text-sm text-success'>
                        Selected: {formData[field.handle].name}
                      </p>
                    )}
                  </div>
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
            className='d-inline-block w-auto bg-transparent border-0 border-bottom border-black mx-auto'
            style={{ fontSize: 26 }}
          >
            REGISTER
          </button>
        </Row>

        {status && <p className='mt-2 text-sm text-gray-700'>{status}</p>}
      </form>
    </Container>
  );
}
