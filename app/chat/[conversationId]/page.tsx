'use client';
// import { waitForLocalStorage } from '@/util/getToken';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import React, { Suspense } from 'react';

const page = async () => {
  const ctrl = new AbortController();
  const clickHandler = () => {
    fetchEventSource('http://localhost:3000/mocksse', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'test',
        body: 'abc',
      }),
      method: 'POST',
      signal: ctrl.signal,
      onmessage: (event) => {
        console.log('event', event);
        console.log('event', event.data);
      },
    });
  };
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        page
        <div>
          <button className="btn-primary" onClick={clickHandler}>
            sse
          </button>
        </div>
      </Suspense>
    </div>
  );
};

export default page;
