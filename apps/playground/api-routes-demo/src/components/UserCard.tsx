import { useState } from 'react';
import type { User } from '@/lib/api';
import { avatarHue, initials } from '@/lib/avatar';

type Props = {
  user: User;
  index: number;
  onOpen: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  deleting: boolean;
};

export function UserCard({ user, index, onOpen, onDelete, deleting }: Props) {
  const [confirming, setConfirming] = useState(false);
  const hue = avatarHue(user.name);

  // Resets the confirm UI on a failed delete (a 404 in dev mode is
  // expected — see the README — but the card shouldn't stay stuck on
  // "Remove?" either way). On success the card just unmounts.
  const handleConfirmDelete = async () => {
    try {
      await onDelete(user.id);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <li
      className="user-card"
      style={{ animationDelay: `${index * 45}ms` }}
      data-deleting={deleting || undefined}
    >
      <button
        className="user-card__body"
        onClick={() => onOpen(user.id)}
        aria-label={`View ${user.name}`}
      >
        <span
          className="user-card__avatar"
          style={{
            background: `hsl(${hue} 70% 88%)`,
            color: `hsl(${hue} 45% 32%)`,
          }}
        >
          {initials(user.name)}
        </span>
        <span className="user-card__meta">
          <span className="user-card__name">{user.name}</span>
          <span className="user-card__id">shinobi #{user.id}</span>
        </span>
      </button>

      {confirming ? (
        <div className="user-card__confirm">
          <span>Remove?</span>
          <button
            className="user-card__confirm-yes"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            Yes
          </button>
          <button
            className="user-card__confirm-no"
            onClick={() => setConfirming(false)}
          >
            No
          </button>
        </div>
      ) : (
        <button
          className="user-card__delete"
          onClick={() => setConfirming(true)}
          aria-label={`Remove ${user.name}`}
          title="Remove"
        >
          ×
        </button>
      )}
    </li>
  );
}
