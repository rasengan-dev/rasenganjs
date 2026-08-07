import { useEffect, useState } from 'react';
import { api, RequestError, type User } from '@/lib/api';
import { avatarHue, initials } from '@/lib/avatar';

type Props = {
  id: string;
  onClose: () => void;
};

type State =
  | { status: 'loading' }
  | { status: 'ok'; user: User }
  | { status: 'error'; message: string };

export function UserDetailModal({ id, onClose }: Props) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    api
      .getUser(id)
      .then((user) => !cancelled && setState({ status: 'ok', user }))
      .catch(
        (err) =>
          !cancelled &&
          setState({
            status: 'error',
            message:
              err instanceof RequestError ? err.message : 'Something broke',
          })
      );

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <p className="modal__eyebrow">GET /api/users/{id}</p>

        {state.status === 'loading' && (
          <div className="modal__loading">
            <span className="spinner" />
          </div>
        )}

        {state.status === 'ok' && (
          <div className="modal__profile">
            <span
              className="modal__avatar"
              style={{
                background: `hsl(${avatarHue(state.user.name)} 70% 88%)`,
                color: `hsl(${avatarHue(state.user.name)} 45% 32%)`,
              }}
            >
              {initials(state.user.name)}
            </span>
            <h3>{state.user.name}</h3>
            <p className="modal__id">shinobi #{state.user.id}</p>
          </div>
        )}

        {state.status === 'error' && (
          <div className="modal__error">
            <p>{state.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
