'use client';

import { useState } from 'react';
import { FIELDS, buildWaMessage, waLink } from '@/lib/site';

export default function EnquiryForm({ source }) {
  const [state, setState] = useState({ status: 'idle', error: '', waUrl: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState({ status: 'sending', error: '', waUrl: '' });
    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ fields: data, source }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState({ status: 'idle', error: json.error || 'Something went wrong. Please try again.', waUrl: '' });
        return;
      }
      setState({ status: 'done', error: '', waUrl: waLink(buildWaMessage(data)) });
    } catch {
      setState({ status: 'idle', error: 'Network error. Please try again or call us.', waUrl: '' });
    }
  }

  if (state.status === 'done') {
    return (
      <div className="form-done">
        <h3>Thank you. We have your details.</h3>
        <p>Your counsellor will get back to you within one working day. You can also continue on WhatsApp so your details arrive with the same answers.</p>
        <a className="btn btn-gold" href={state.waUrl} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>
      </div>
    );
  }

  return (
    <form className="enquiry" onSubmit={onSubmit}>
      {FIELDS.map((f) => {
        const id = `f-${f.name}`;
        const common = { id, name: f.name, required: !!f.required };
        return (
          <div className={`field${f.type === 'textarea' ? ' full' : ''}`} key={f.name}>
            <label htmlFor={id}>
              {f.label}{f.required ? ' *' : ''}
            </label>
            {f.type === 'select' ? (
              <select {...common} defaultValue="">
                <option value="" disabled>Select</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea {...common} rows={3} />
            ) : f.prefix ? (
              <div className="prefixed">
                <span>{f.prefix}</span>
                <input {...common} type="tel" inputMode="numeric" pattern="\d{10}" maxLength={10} placeholder="10 digit number" />
              </div>
            ) : (
              <input {...common} type={f.type} placeholder={f.placeholder} min={f.type === 'number' ? 1 : undefined} />
            )}
          </div>
        );
      })}
      {state.error ? <p className="form-error full" role="alert">{state.error}</p> : null}
      <div className="full">
        <button className="btn btn-gold" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending...' : 'Request Free Counselling'}
        </button>
      </div>
    </form>
  );
}
