import { useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  Blocks,
  Check,
  ChevronRight,
  ChevronsUpDown,
  CircleCheck,
  Copy,
  FileCode2,
  FileJson,
  Files,
  Folder,
  FolderOpen,
  GitBranch,
  Minus,
  Search as SearchIcon,
  TerminalSquare,
  X,
} from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { useCopy } from '@/hooks/use-copy';
import type {
  HighlightedFile,
  HighlightedFramework,
} from '@/data/home/highlight';

// ── File tree ────────────────────────────────────────────────

type TreeFile = { type: 'file'; name: string; path: string };
type TreeFolder = {
  type: 'folder';
  name: string;
  path: string;
  children: TreeNode[];
};
type TreeNode = TreeFile | TreeFolder;

function buildTree(files: HighlightedFile[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const file of files) {
    const parts = file.filename.split('/');
    let level = root;
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = index === parts.length - 1;

      if (isFile) {
        level.push({ type: 'file', name: part, path: currentPath });
        return;
      }

      let folder = level.find(
        (node): node is TreeFolder =>
          node.type === 'folder' && node.name === part
      );

      if (!folder) {
        folder = {
          type: 'folder',
          name: part,
          path: currentPath,
          children: [],
        };
        level.push(folder);
      }

      level = folder.children;
    });
  }

  return root;
}

// ── Look & feel ──────────────────────────────────────────────

/**
 * Accent color per project, matching the layer tokens. The editor root has
 * the `dark` class, so these resolve to their dark-theme values.
 */
const LAYER_COLOR: Record<string, string> = {
  rasengan: 'var(--layer-rasengan)',
  futon: 'var(--layer-futon)',
  server: 'var(--layer-server)',
};

/** Language label shown in the status bar, from the file extension. */
function languageOf(name: string | null): string {
  if (!name) return 'Plain Text';
  if (name.endsWith('.tsx')) return 'TypeScript JSX';
  if (name.endsWith('.ts')) return 'TypeScript';
  if (name.endsWith('.json')) return 'JSON';
  if (name.endsWith('.js')) return 'JavaScript';
  return 'Plain Text';
}

/** Icon + color for a file in the tree and the tab bar. */
function FileIcon({ name, size = 14 }: { name: string; size?: number }) {
  if (name.endsWith('.json')) {
    return (
      <FileJson
        size={size}
        aria-hidden="true"
        className="shrink-0 text-amber-400"
      />
    );
  }
  const color = name.endsWith('.tsx')
    ? 'text-sky-400'
    : name.endsWith('.ts')
      ? 'text-blue-400'
      : name.endsWith('.js')
        ? 'text-yellow-300'
        : 'text-foreground/60';
  return (
    <FileCode2
      size={size}
      aria-hidden="true"
      className={cn('shrink-0', color)}
    />
  );
}

// ── File tree ────────────────────────────────────────────────

function FileTreeNode({
  node,
  depth,
  activeFile,
  onSelectFile,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string | null;
  onSelectFile: (path: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const paddingLeft = depth * 12 + 12;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          style={{ paddingLeft }}
          className="flex w-full cursor-pointer items-center gap-1.5 py-[5px] pr-2 text-left text-[12.5px] text-foreground/70 transition-colors duration-150 hover:bg-white/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--accent-c)]"
        >
          <ChevronRight
            size={12}
            aria-hidden="true"
            className={cn(
              'shrink-0 text-foreground/40 transition-transform duration-200 ease-out',
              expanded && 'rotate-90'
            )}
          />
          {expanded ? (
            <FolderOpen
              size={14}
              aria-hidden="true"
              className="shrink-0 text-[var(--accent-c)]"
            />
          ) : (
            <Folder
              size={14}
              aria-hidden="true"
              className="shrink-0 text-[var(--accent-c)]"
            />
          )}
          <span className="truncate">{node.name}</span>
        </button>

        {expanded && (
          <div className="relative">
            {/* indent guide */}
            <span
              aria-hidden="true"
              style={{ left: paddingLeft + 5 }}
              className="absolute inset-y-0 w-px bg-white/[0.06]"
            />
            {node.children.map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isActive = node.path === activeFile;

  return (
    <button
      type="button"
      onClick={() => onSelectFile(node.path)}
      aria-current={isActive}
      style={{ paddingLeft: paddingLeft + 14 }}
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-1.5 py-[5px] pr-2 text-left font-mono text-[12px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--accent-c)]',
        isActive
          ? 'bg-[color-mix(in_oklab,var(--accent-c)_14%,transparent)] text-white'
          : 'text-foreground/65 hover:bg-white/[0.04] hover:text-foreground'
      )}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent-c)]"
        />
      )}
      <FileIcon name={node.name} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

// ── Window chrome ────────────────────────────────────────────

/**
 * macOS-style window controls. Yellow restores, green maximizes the editor
 * to the full viewport; red is decorative.
 */
function TrafficLights({
  isMaximized,
  onMaximize,
  onRestore,
}: {
  isMaximized: boolean;
  onMaximize: () => void;
  onRestore: () => void;
}) {
  return (
    <div className="group/lights flex items-center gap-2">
      <span aria-hidden="true" className="size-3 rounded-full bg-[#FF5F57]" />
      <button
        type="button"
        onClick={onRestore}
        disabled={!isMaximized}
        aria-label="Restore editor size"
        className="flex size-3 cursor-pointer items-center justify-center rounded-full bg-[#FEBC2E] text-transparent group-hover/lights:text-black/70 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Minus size={8} strokeWidth={3} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onMaximize}
        disabled={isMaximized}
        aria-label="Maximize editor"
        className="flex size-3 cursor-pointer items-center justify-center rounded-full bg-[#28C840] text-transparent group-hover/lights:text-black/70 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ChevronsUpDown
          size={8}
          strokeWidth={3}
          className="rotate-45"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

/** "my-app › src › app › index.page.tsx" path shown in the title bar. */
function Breadcrumb({
  project,
  path,
}: {
  project: string;
  path: string | null;
}) {
  const parts = [project, ...(path ? path.split('/') : [])];

  return (
    <nav
      aria-label="Current file"
      className="flex min-w-0 items-center gap-1 font-mono text-[11.5px] text-foreground/45"
    >
      {parts.map((part, i) => {
        const last = i === parts.length - 1;
        return (
          <span
            key={`${part}-${i}`}
            className={cn(
              'flex min-w-0 items-center gap-1',
              !last && 'max-lg:hidden'
            )}
          >
            {i > 0 && (
              <ChevronRight
                size={11}
                aria-hidden="true"
                className="shrink-0 text-foreground/25"
              />
            )}
            <span className={cn('truncate', last && 'text-foreground/80')}>
              {part}
            </span>
          </span>
        );
      })}
    </nav>
  );
}

// ── Project (layer) switcher ─────────────────────────────────

/**
 * Segmented control to switch between the three starter projects. The
 * active pill slides between options (shared `layoutId`), tinted with the
 * project's layer color.
 */
function FrameworkSwitcher({
  frameworks,
  activeKey,
  onSelect,
  idPrefix,
}: {
  frameworks: HighlightedFramework[];
  activeKey: string;
  onSelect: (key: string) => void;
  /** Keeps the desktop and mobile switchers' animations independent. */
  idPrefix: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Starter project"
      className="flex shrink-0 items-center gap-0.5 rounded-lg border border-white/[0.06] bg-black/30 p-0.5"
    >
      {frameworks.map((framework) => {
        const isActive = framework.key === activeKey;
        const color = LAYER_COLOR[framework.key] ?? 'var(--primary)';

        return (
          <button
            key={framework.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(framework.key)}
            className={cn(
              'relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60',
              isActive
                ? 'text-white'
                : 'text-foreground/55 hover:text-foreground'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${idPrefix}-project-pill`}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                style={{
                  backgroundColor: `color-mix(in oklab, ${color} 22%, transparent)`,
                  borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
                }}
                className="absolute inset-0 rounded-md border"
              />
            )}
            <span
              aria-hidden="true"
              style={{ backgroundColor: color }}
              className="relative size-1.5 rounded-full"
            />
            <span className="relative">{framework.title}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────

function EditorTabBar({
  openFiles,
  activeFile,
  onSelect,
  onClose,
}: {
  openFiles: string[];
  activeFile: string | null;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
}) {
  return (
    <div className="flex h-9 shrink-0 items-stretch border-b border-white/[0.06] bg-[#0a0e1b]">
      <div className="no-scrollbar flex items-stretch overflow-x-auto">
        {openFiles.map((path) => {
          const isActive = path === activeFile;
          const name = path.split('/').pop() ?? path;

          return (
            <div
              key={path}
              className={cn(
                'group relative flex shrink-0 items-center gap-2 border-r border-white/[0.06] pl-3 pr-1.5 font-mono text-[12px] transition-colors duration-150',
                isActive
                  ? 'bg-[#0d1324] text-white'
                  : 'text-foreground/50 hover:bg-white/[0.03] hover:text-foreground/80'
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent-c)]"
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(path)}
                className="flex cursor-pointer items-center gap-2 focus-visible:outline-none focus-visible:underline"
              >
                <FileIcon name={name} size={13} />
                <span>{name}</span>
              </button>
              <button
                type="button"
                aria-label={`Close ${name}`}
                onClick={() => onClose(path)}
                className={cn(
                  'cursor-pointer rounded p-0.5 text-foreground/40 transition-opacity hover:bg-white/10 hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Code pane ────────────────────────────────────────────────

function CodePane({ file }: { file: HighlightedFile }) {
  const { copied, copy } = useCopy();

  return (
    <div className="relative min-h-0 flex-1 bg-[#0d1324]">
      <button
        type="button"
        onClick={() => copy(file.code)}
        aria-label="Copy code snippet"
        className="absolute bottom-3 right-3 z-10 flex cursor-pointer md:bottom-auto md:top-3 items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[11px] text-foreground/60 backdrop-blur transition-colors duration-150 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
      >
        {copied ? (
          <Check size={12} aria-hidden="true" />
        ) : (
          <Copy size={12} aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy'}
      </button>

      {/* Re-keyed per file so switching files fades the new content in. */}
      <motion.div
        key={file.filename}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={cn(
          'h-full overflow-auto py-4 pr-4 text-[13px] leading-[1.7]',
          // Shiki's own backgrounds off: the pane provides the surface.
          '[&_.shiki]:!bg-transparent [&_.shiki_span]:!bg-transparent [&_pre]:!bg-transparent',
          '[&_code]:font-mono [&_code]:flex [&_code]:flex-col [&_code]:items-start',
          // Line numbers via CSS counters on the `data-line` spans.
          '[&_[data-line-numbers]]:[counter-reset:line]',
          '[&_[data-line-numbers]_span[data-line]]:w-full [&_[data-line-numbers]_span[data-line]]:pl-0',
          '[&_[data-line-numbers]_span[data-line]:hover]:!bg-white/[0.03]',
          '[&_[data-line-numbers]_span[data-line]::before]:mr-5',
          '[&_[data-line-numbers]_span[data-line]::before]:inline-block',
          '[&_[data-line-numbers]_span[data-line]::before]:w-[4ch]',
          '[&_[data-line-numbers]_span[data-line]::before]:select-none',
          '[&_[data-line-numbers]_span[data-line]::before]:text-right',
          '[&_[data-line-numbers]_span[data-line]::before]:!text-foreground/25',
          '[&_[data-line-numbers]_span[data-line]::before]:[counter-increment:line]',
          '[&_[data-line-numbers]_span[data-line]::before]:content-[counter(line)]'
        )}
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  );
}

function EmptyEditorState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-[#0d1324] text-sm text-foreground/40">
      <FileCode2 size={30} aria-hidden="true" />
      <span>Select a file in the explorer</span>
    </div>
  );
}

// ── Terminal ─────────────────────────────────────────────────

type TerminalLine = { text: string; className?: string };

const TERMINAL_LOGS: Record<string, TerminalLine[]> = {
  rasengan: [
    { text: '$ npm run dev', className: 'text-foreground/40' },
    { text: '' },
    { text: '> my-rasengan-app@1.0.0 dev' },
    { text: '> rasengan dev' },
    { text: '' },
    { text: '- Starting server in development mode...' },
    { text: 'Rasengan v2.0.0-beta running', className: 'text-emerald-500' },
    { text: '' },
    { text: '→ Local:   http://localhost:5320', className: 'text-blue-400' },
    { text: '→ Network: http://192.168.1.42:5320', className: 'text-blue-400' },
    { text: '→ Press c to clear', className: 'text-foreground/40' },
    {
      text: '→ Press ctrl + c to close the server',
      className: 'text-foreground/40',
    },
  ],
  futon: [
    {
      text: '$ node --import tsx --watch src/index.ts',
      className: 'text-foreground/40',
    },
    { text: '' },
    {
      text: '✔ Futon app listening on http://0.0.0.0:3000',
      className: 'text-emerald-500',
    },
    { text: '' },
    { text: '[12:04:21] GET    / 200 2ms 42B' },
    { text: '[12:04:23] GET    /health 200 1ms 15B' },
  ],
  server: [
    { text: '$ npm run dev', className: 'text-foreground/40' },
    { text: '' },
    {
      text: 'Rasengan Server v1.0.0-beta.6 running',
      className: 'text-emerald-500',
    },
    { text: '' },
    { text: '→ Local:   http://localhost:3000', className: 'text-blue-400' },
    { text: '→ Network: http://192.168.1.42:3000', className: 'text-blue-400' },
    { text: '→ Runtime: Node.js' },
    { text: '' },
    { text: '→ Press c to clear the console', className: 'text-foreground/40' },
    {
      text: '→ Press ctrl+c to stop the server',
      className: 'text-foreground/40',
    },
  ],
};

/**
 * Bottom panel: a tab strip (only Terminal is live) and the dev output of
 * the active project, ending on a prompt with a blinking cursor.
 */
function Terminal({ frameworkKey }: { frameworkKey: string }) {
  const lines = TERMINAL_LOGS[frameworkKey] ?? [];

  return (
    <div className="flex h-full flex-col bg-[#0a0e1b]">
      <div className="flex h-9 shrink-0 items-stretch gap-4 border-b border-white/[0.06] px-4 text-[11px] font-medium uppercase tracking-[0.06em]">
        <span className="relative flex items-center gap-1.5 text-foreground/85">
          <TerminalSquare size={13} aria-hidden="true" />
          Terminal
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--accent-c)]"
          />
        </span>
        <span
          aria-hidden="true"
          className="flex items-center text-foreground/35"
        >
          Output
        </span>
        <span
          aria-hidden="true"
          className="flex items-center text-foreground/35"
        >
          Problems
        </span>
        <span className="ml-auto flex items-center font-mono normal-case tracking-normal text-foreground/35">
          zsh
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start overflow-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-foreground/80">
        {lines.map((line, i) => (
          <div key={i} className={cn('whitespace-pre', line.className)}>
            {line.text || ' '}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[var(--accent-c)]">❯</span>
          <span
            aria-hidden="true"
            className="inline-block h-[14px] w-[7px] bg-foreground/70 motion-safe:animate-[editor-caret_1.1s_steps(1)_infinite]"
          />
        </div>
      </div>
    </div>
  );
}

// ── Side rails ───────────────────────────────────────────────

/** Decorative IDE activity bar (desktop only). */
function ActivityBar() {
  return (
    <div
      aria-hidden="true"
      className="flex w-11 shrink-0 flex-col items-center gap-4 border-r border-white/[0.06] bg-[#080b16] pt-3 text-foreground/35"
    >
      <span className="relative text-foreground/85">
        <Files size={18} />
        <span className="absolute -left-[13px] top-0 h-full w-[2px] bg-[var(--accent-c)]" />
      </span>
      <SearchIcon size={18} />
      <GitBranch size={18} />
      <Blocks size={18} />
    </div>
  );
}

/** VS Code-style status bar in the active layer color. */
function StatusBar({
  project,
  file,
}: {
  project: string;
  file: string | null;
}) {
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 bg-[color-mix(in_oklab,var(--accent-c)_85%,black)] px-3 font-mono text-[11px] text-white">
      <span className="flex items-center gap-1">
        <GitBranch size={12} aria-hidden="true" />
        main
      </span>
      <span className="flex items-center gap-1 max-sm:hidden">
        <CircleCheck size={12} aria-hidden="true" />0 problems
      </span>
      <span className="max-sm:hidden">{project}</span>
      <span className="ml-auto max-md:hidden">Ln 1, Col 1</span>
      <span className="max-md:hidden">Spaces: 2</span>
      <span className="max-md:hidden">UTF-8</span>
      <span>{languageOf(file)}</span>
    </div>
  );
}

// ── Code editor ──────────────────────────────────────────────

const DEFAULT_OPEN_FILE: Record<string, string> = {
  rasengan: 'src/app/_routes/index.page.tsx',
  futon: 'src/index.ts',
  server: 'src/hello.controller.ts',
};

/** Project folder name shown in the explorer and breadcrumb. */
const PROJECT_NAME: Record<string, string> = {
  rasengan: 'my-rasengan-app',
  futon: 'my-futon-app',
  server: 'my-server-app',
};

type FileState = { openFiles: string[]; activeFile: string | null };

/**
 * Landing page code editor: an always-dark mini IDE showing a real starter
 * project for each layer (files highlighted by Shiki in the page loader).
 *
 * The root carries the `dark` class so theme tokens and Shiki's dark colors
 * apply even when the site is in light mode, and `--accent-c` is set to the
 * active layer's color, which tints the glow, tabs, tree and status bar.
 */
export default function CodeEditor({
  frameworks,
}: {
  frameworks: HighlightedFramework[];
}) {
  const [activeFrameworkKey, setActiveFrameworkKey] = useState(
    frameworks[0]?.key
  );

  const [fileStateByFramework, setFileStateByFramework] = useState<
    Record<string, FileState>
  >(() => {
    const initial: Record<string, FileState> = {};
    for (const framework of frameworks) {
      const defaultFile = DEFAULT_OPEN_FILE[framework.key];
      initial[framework.key] = {
        openFiles: defaultFile ? [defaultFile] : [],
        activeFile: defaultFile ?? null,
      };
    }
    return initial;
  });

  const [isMaximized, setIsMaximized] = useState(false);

  const activeFramework =
    frameworks.find((f) => f.key === activeFrameworkKey) ?? frameworks[0];
  const accent = LAYER_COLOR[activeFramework.key] ?? 'var(--primary)';
  const projectName = PROJECT_NAME[activeFramework.key] ?? activeFramework.key;

  const tree = useMemo(
    () => buildTree(activeFramework.files),
    [activeFramework]
  );
  const filesByPath = useMemo(() => {
    const map = new Map<string, HighlightedFile>();
    activeFramework.files.forEach((file) => map.set(file.filename, file));
    return map;
  }, [activeFramework]);

  const { openFiles, activeFile } = fileStateByFramework[
    activeFramework.key
  ] ?? { openFiles: [], activeFile: null };

  const openFile = (path: string) => {
    setFileStateByFramework((prev) => {
      const current = prev[activeFramework.key];
      const nextOpenFiles = current.openFiles.includes(path)
        ? current.openFiles
        : [...current.openFiles, path];

      return {
        ...prev,
        [activeFramework.key]: { openFiles: nextOpenFiles, activeFile: path },
      };
    });
  };

  const setActiveFile = (path: string) => {
    setFileStateByFramework((prev) => ({
      ...prev,
      [activeFramework.key]: { ...prev[activeFramework.key], activeFile: path },
    }));
  };

  const closeFile = (path: string) => {
    setFileStateByFramework((prev) => {
      const current = prev[activeFramework.key];
      const index = current.openFiles.indexOf(path);
      const nextOpenFiles = current.openFiles.filter((p) => p !== path);

      let nextActiveFile = current.activeFile;
      if (current.activeFile === path) {
        nextActiveFile =
          nextOpenFiles.length === 0
            ? null
            : nextOpenFiles[Math.max(0, index - 1)];
      }

      return {
        ...prev,
        [activeFramework.key]: {
          openFiles: nextOpenFiles,
          activeFile: nextActiveFile,
        },
      };
    });
  };

  const activeContent = activeFile ? filesByPath.get(activeFile) : undefined;

  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);
  const [mobileTerminalOpen, setMobileTerminalOpen] = useState(false);

  /** Explorer contents, shared by the desktop panel and the mobile drawer. */
  const explorer = (onSelect: (path: string) => void) => (
    <>
      <div className="px-3 pb-2 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-foreground/40">
        Explorer
      </div>
      <div className="flex items-center gap-1.5 px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-foreground/75">
        <ChevronRight
          size={12}
          aria-hidden="true"
          className="rotate-90 text-foreground/40"
        />
        {projectName}
      </div>
      {tree.map((node) => (
        <FileTreeNode
          key={node.path}
          node={node}
          depth={0}
          activeFile={activeFile}
          onSelectFile={onSelect}
        />
      ))}
    </>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        style={{ '--accent-c': accent } as React.CSSProperties}
        className={cn('dark relative', isMaximized && 'fixed inset-0 z-50')}
      >
        {/* Ambient glow in the active layer color, behind the window. */}
        {!isMaximized && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -top-8 bottom-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--accent-c)_35%,transparent),transparent_70%)] opacity-70 blur-2xl transition-[background] duration-500"
          />
        )}

        {/* Gradient hairline border: a 1px padded wrapper with a gradient fill. */}
        <div
          className={cn(
            'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent-c)_55%,transparent),rgba(255,255,255,0.06)_35%,rgba(255,255,255,0.04))] p-px shadow-[0_30px_60px_-40px_rgba(15,26,51,0.45)]',
            isMaximized ? 'h-full' : 'rounded-2xl'
          )}
        >
          <div
            className={cn(
              'flex flex-col overflow-hidden bg-[#0b1020] text-foreground',
              isMaximized ? 'h-full' : 'rounded-[15px]'
            )}
          >
            {/* ── Title bar ── */}
            <div className="flex h-11 shrink-0 items-center gap-4 border-b border-white/[0.06] bg-[#080b16] px-4 pr-2">
              <TrafficLights
                isMaximized={isMaximized}
                onMaximize={() => setIsMaximized(true)}
                onRestore={() => setIsMaximized(false)}
              />
              <div className="hidden min-w-0 flex-1 md:flex">
                <Breadcrumb project={projectName} path={activeFile} />
              </div>
              <div className="ml-auto hidden md:block">
                <FrameworkSwitcher
                  frameworks={frameworks}
                  activeKey={activeFramework.key}
                  onSelect={setActiveFrameworkKey}
                  idPrefix="desktop"
                />
              </div>

              {/* mobile actions */}
              <div className="ml-auto flex items-center gap-1 md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTreeOpen(true)}
                  aria-label="Open file explorer"
                  className="cursor-pointer rounded-md p-1.5 text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                >
                  <Files size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTerminalOpen((prev) => !prev)}
                  aria-label="Toggle terminal"
                  aria-pressed={mobileTerminalOpen}
                  className={cn(
                    'cursor-pointer rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60',
                    mobileTerminalOpen
                      ? 'text-[var(--accent-c)]'
                      : 'text-foreground/60'
                  )}
                >
                  <TerminalSquare size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* ── Desktop / tablet ── */}
            <div
              className={cn('hidden min-h-0 md:flex', isMaximized && 'flex-1')}
            >
              <ActivityBar />
              <ResizablePanelGroup
                id="home-code-editor-vertical"
                direction="vertical"
                className={cn(isMaximized ? 'h-full!' : 'h-[620px]!')}
              >
                <ResizablePanel
                  id="home-code-editor-main"
                  defaultSize={70}
                  minSize={40}
                >
                  <ResizablePanelGroup
                    id="home-code-editor"
                    direction="horizontal"
                    className="h-full!"
                  >
                    <ResizablePanel
                      id="home-code-editor-tree"
                      defaultSize={23}
                      minSize={16}
                      maxSize={40}
                      className="overflow-y-auto bg-[#0a0e1b] py-2"
                    >
                      {explorer(openFile)}
                    </ResizablePanel>

                    <ResizableHandle
                      id="home-code-editor-handle"
                      className="bg-white/[0.06]"
                    />

                    <ResizablePanel
                      id="home-code-editor-content"
                      defaultSize={77}
                      className="flex min-w-0 flex-col"
                    >
                      <EditorTabBar
                        openFiles={openFiles}
                        activeFile={activeFile}
                        onSelect={setActiveFile}
                        onClose={closeFile}
                      />
                      {activeContent ? (
                        <CodePane file={activeContent} />
                      ) : (
                        <EmptyEditorState />
                      )}
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle
                  id="home-code-editor-terminal-handle"
                  className="bg-white/[0.06]"
                />

                <ResizablePanel
                  id="home-code-editor-terminal"
                  defaultSize={30}
                  minSize={15}
                  maxSize={60}
                >
                  <Terminal frameworkKey={activeFramework.key} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>

            {/* ── Mobile ── */}
            <div className="md:hidden">
              <div className="no-scrollbar overflow-x-auto border-b border-white/[0.06] bg-[#080b16] px-2 py-1.5">
                <FrameworkSwitcher
                  frameworks={frameworks}
                  activeKey={activeFramework.key}
                  onSelect={setActiveFrameworkKey}
                  idPrefix="mobile"
                />
              </div>

              <EditorTabBar
                openFiles={openFiles}
                activeFile={activeFile}
                onSelect={setActiveFile}
                onClose={closeFile}
              />

              <div className="relative flex h-[420px] flex-col">
                {activeContent ? (
                  <CodePane file={activeContent} />
                ) : (
                  <EmptyEditorState />
                )}

                <AnimatePresence>
                  {mobileTreeOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setMobileTreeOpen(false)}
                        className="absolute inset-0 z-20 bg-black/60"
                      />
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-0 z-30 h-full w-[78%] max-w-[270px] overflow-y-auto border-r border-white/[0.06] bg-[#0a0e1b] py-2"
                      >
                        {explorer((path) => {
                          openFile(path);
                          setMobileTreeOpen(false);
                        })}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {mobileTerminalOpen && (
                <div className="h-[200px] border-t border-white/[0.06]">
                  <Terminal frameworkKey={activeFramework.key} />
                </div>
              )}
            </div>

            <StatusBar project={activeFramework.title} file={activeFile} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
