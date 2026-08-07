import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Status = 'checking' | 'up' | 'down';

export function HealthBadge() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let cancelled = false;

    api
      .health()
      .then(() => !cancelled && setStatus('up'))
      .catch(() => !cancelled && setStatus('down'));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`health-badge health-badge--${status}`}>
      <span className="health-badge__dot" />
      {status === 'checking' && 'checking api…'}
      {status === 'up' && 'api online'}
      {status === 'down' && 'api offline'}
    </div>
  );
}
