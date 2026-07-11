/** Deterministic hue per username so avatars are stable across clients. */
function hueOf(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 360;
}

export function avatarColor(name: string): string {
  return `hsl(${hueOf(name)} 70% 62%)`;
}

type Props = {
  name: string;
  size?: 'sm' | 'md';
};

export default function Avatar({ name, size = 'md' }: Props) {
  const dimension = size === 'sm' ? 'size-6 text-[10px]' : 'size-9 text-sm';
  return (
    <div
      className={`${dimension} shrink-0 rounded-full grid place-items-center font-display font-bold uppercase text-ink`}
      style={{ backgroundColor: avatarColor(name) }}
      aria-hidden
    >
      {name.slice(0, 1)}
    </div>
  );
}
