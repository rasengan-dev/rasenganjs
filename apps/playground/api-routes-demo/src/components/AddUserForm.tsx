import { useState, type FormEvent } from 'react';

type Props = {
  onSubmit: (name: string) => Promise<void>;
};

export function AddUserForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || busy) return;

    setBusy(true);
    try {
      await onSubmit(name.trim());
      setName('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="enlist-card" onSubmit={handleSubmit}>
      <p className="enlist-card__eyebrow">POST /api/users</p>
      <h2 className="enlist-card__title">Enlist a shinobi</h2>
      <p className="enlist-card__hint">
        Registered names appear in the roster instantly.
      </p>

      <label className="field">
        <span className="field__label">Name</span>
        <input
          className="field__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hinata Hyūga"
          maxLength={40}
          disabled={busy}
        />
      </label>

      <button className="btn btn--primary" type="submit" disabled={busy}>
        {busy ? 'Enlisting…' : 'Enlist'}
      </button>
    </form>
  );
}
