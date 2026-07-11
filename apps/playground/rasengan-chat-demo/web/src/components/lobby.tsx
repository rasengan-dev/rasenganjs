import { useMemo, useState } from 'react';
import { LIMITS, type RoomSummary } from '@/lib/protocol';

type Props = {
  rooms: RoomSummary[];
  joinError: string | null;
  onJoin: (username: string, room: string) => void;
};

/**
 * The "login" screen: pick a username, pick (or create) a room. Room
 * cards show live member counts pushed by the gateway while you're
 * still sitting here.
 */
export default function Lobby({ rooms, joinError, onJoin }: Props) {
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState('general');
  const [custom, setCustom] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Typing a custom name overrides the card selection.
  const room = custom.trim() !== '' ? custom.trim().toLowerCase() : selected;

  const sorted = useMemo(
    () =>
      [...rooms].sort(
        (a, b) => Number(b.preset) - Number(a.preset) || b.members - a.members
      ),
    [rooms]
  );

  const canJoin =
    username.trim().length >= LIMITS.username.min &&
    room.length >= LIMITS.room.min;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canJoin) return;
    setSubmitted(true);
    onJoin(username.trim(), room);
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-105 animate-rise"
        aria-label="Join the chat"
      >
        {/* Brand */}
        <header className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.35em] text-chakra-soft uppercase">
            rasengan × ws
          </p>
          <h1 className="font-display font-bold text-5xl tracking-wide mt-1">
            CHAKRA<span className="text-chakra">CHAT</span>
          </h1>
          <p className="text-mist text-sm mt-2">
            Real-time rooms over{' '}
            <code className="font-mono">@rasenganjs/ws</code>
          </p>
        </header>

        <div className="bg-panel/80 backdrop-blur border border-edge rounded-2xl p-6 space-y-5">
          {/* Username */}
          <label className="block">
            <span className="font-display font-semibold tracking-wider text-xs uppercase text-mist">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={LIMITS.username.max}
              placeholder="e.g. naruto"
              autoFocus
              className="mt-1.5 w-full bg-panel-2 border border-edge rounded-lg px-3.5 py-2.5 text-paper placeholder:text-mist/50 outline-none transition focus:border-chakra focus:shadow-glow"
            />
          </label>

          {/* Rooms */}
          <div>
            <span className="font-display font-semibold tracking-wider text-xs uppercase text-mist">
              Room
            </span>
            <div className="mt-1.5 grid grid-cols-1 gap-2">
              {sorted.map((r) => {
                const active = custom.trim() === '' && selected === r.name;
                return (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => {
                      setSelected(r.name);
                      setCustom('');
                    }}
                    className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left transition cursor-pointer ${
                      active
                        ? 'border-chakra bg-chakra/10 shadow-glow'
                        : 'border-edge bg-panel-2 hover:border-chakra/50'
                    }`}
                  >
                    <span className="font-mono text-sm">
                      <span className="text-chakra-soft">#</span>
                      {r.name}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-mist">
                      {r.members > 0 && (
                        <span className="size-1.5 rounded-full bg-leaf animate-pulse-dot" />
                      )}
                      {r.members} online
                    </span>
                  </button>
                );
              })}
            </div>

            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              maxLength={LIMITS.room.max}
              placeholder="…or create your own room"
              className={`mt-2 w-full bg-panel-2 border rounded-lg px-3.5 py-2.5 font-mono text-sm text-paper placeholder:text-mist/50 placeholder:font-body outline-none transition focus:shadow-glow ${
                custom.trim() !== ''
                  ? 'border-chakra'
                  : 'border-edge focus:border-chakra'
              }`}
            />
          </div>

          {/* Server-side rejection (e.g. username taken in that room) */}
          {joinError && submitted && (
            <p
              role="alert"
              className="text-ember text-sm bg-ember/10 border border-ember/30 rounded-lg px-3 py-2 animate-rise"
            >
              {joinError}
            </p>
          )}

          <button
            type="submit"
            disabled={!canJoin}
            className="w-full font-display font-bold tracking-widest uppercase rounded-lg py-3 transition cursor-pointer bg-chakra text-white hover:bg-chakra-soft hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enter #{room || '…'}
          </button>
        </div>
      </form>
    </main>
  );
}
