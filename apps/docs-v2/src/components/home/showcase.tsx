import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  ChevronRight,
  Copy,
  FileCode2,
  Folder,
  FolderOpen,
  TerminalSquare,
  X,
} from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
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

function fileIconColor(name: string): string {
  if (name.endsWith('.tsx')) return 'text-sky-500';
  if (name.endsWith('.ts')) return 'text-blue-500';
  if (name.endsWith('.js')) return 'text-yellow-500';
  if (name.endsWith('.json')) return 'text-amber-500';
  return 'text-foreground/60';
}

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
  const paddingLeft = depth * 12 + 8;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          style={{ paddingLeft }}
          className="flex w-full cursor-pointer items-center gap-1.5 py-1 pr-2 text-left text-xs font-medium text-foreground/70 transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        >
          <ChevronRight
            size={12}
            aria-hidden="true"
            className={cn(
              'shrink-0 transition-transform duration-200 ease-out',
              expanded && 'rotate-90'
            )}
          />
          {expanded ? (
            <FolderOpen
              size={14}
              aria-hidden="true"
              className="shrink-0 text-primary/70"
            />
          ) : (
            <Folder
              size={14}
              aria-hidden="true"
              className="shrink-0 text-primary/70"
            />
          )}
          <span className="truncate">{node.name}</span>
        </button>

        {expanded && (
          <div>
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
      style={{ paddingLeft }}
      className={cn(
        'flex w-full cursor-pointer items-center gap-1.5 py-1 pr-2 text-left font-mono text-xs transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground/70 hover:bg-muted hover:text-foreground'
      )}
    >
      <FileCode2
        size={14}
        aria-hidden="true"
        className={cn('shrink-0', fileIconColor(node.name))}
      />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

// ── Window chrome ────────────────────────────────────────────

function TrafficLights() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2">
      <span className="size-3 rounded-full bg-[#FF5F57]" />
      <span className="size-3 rounded-full bg-[#FEBC2E]" />
      <span className="size-3 rounded-full bg-[#28C840]" />
    </div>
  );
}

// ── Framework switcher ───────────────────────────────────────

function FrameworkSwitcher({
  frameworks,
  activeKey,
  onSelect,
}: {
  frameworks: HighlightedFramework[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 p-1 border border-foreground/10 rounded-lg">
      {frameworks.map((framework) => {
        const isActive = framework.key === activeKey;

        return (
          <button
            key={framework.key}
            type="button"
            onClick={() => onSelect(framework.key)}
            aria-pressed={isActive}
            className={cn(
              'cursor-pointer whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/60 hover:bg-muted hover:text-foreground'
            )}
          >
            {framework.title}
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
    <div className="flex items-stretch justify-between border-b border-border bg-muted/20">
      <div className="no-scrollbar flex items-stretch overflow-x-auto">
        {openFiles.map((path) => {
          const isActive = path === activeFile;
          const name = path.split('/').pop() ?? path;

          return (
            <div
              key={path}
              onClick={() => onSelect(path)}
              className={cn(
                'group flex h-9 shrink-0 cursor-pointer items-center gap-2 border-r border-border pl-3 pr-2 text-xs font-mono transition-colors duration-200 ease-out',
                isActive
                  ? 'bg-(--code-block-bg) text-foreground'
                  : 'bg-muted/40 text-foreground/60 hover:text-foreground'
              )}
            >
              <FileCode2
                size={13}
                aria-hidden="true"
                className={cn('shrink-0', fileIconColor(name))}
              />
              <span>{name}</span>
              <button
                type="button"
                aria-label={`Close ${name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(path);
                }}
                className="ml-1 cursor-pointer rounded-sm p-0.5 text-foreground/40 hover:bg-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={12} />
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative min-h-0 flex-1">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code snippet"
        className="absolute right-2 top-2 z-10 cursor-pointer rounded-sm p-1.5 text-foreground/60 transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <div
        className={cn(
          'h-full overflow-auto p-4 text-sm leading-relaxed',
          '[&_pre]:!bg-transparent',
          '[&_code]:font-mono',
          '[&_code]:flex',
          '[&_code]:flex-col',
          '[&_code]:items-start',
          '[&_[data-line-numbers]_span]:!bg-transparent',
          '[&_[data-line-numbers]]:[counter-reset:line]',
          '[&_[data-line-numbers]_span[data-line]::before]:mr-4',
          '[&_[data-line-numbers]_span[data-line]::before]:inline-block',
          '[&_[data-line-numbers]_span[data-line]::before]:w-[2.5ch]',
          '[&_[data-line-numbers]_span[data-line]::before]:select-none',
          '[&_[data-line-numbers]_span[data-line]::before]:text-right',
          '[&_[data-line-numbers]_span[data-line]::before]:text-foreground/30',
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
    <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-foreground/40">
      <FileCode2 size={28} aria-hidden="true" />
      <span>Select a file to open</span>
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
    { text: '✔ Rasengan v1.2.2 is running 🚀', className: 'text-emerald-500' },
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
      text: 'Rasengan Server v1.0.0-beta.3 running',
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

function Terminal({ frameworkKey }: { frameworkKey: string }) {
  const lines = TERMINAL_LOGS[frameworkKey] ?? [];

  return (
    <div className="flex h-full flex-col bg-(--code-block-bg)">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-muted/20 px-3">
        <TerminalSquare
          size={14}
          aria-hidden="true"
          className="text-foreground/50"
        />
        <span className="text-xs font-medium text-foreground/60">Terminal</span>
      </div>

      <div className="flex-1 flex flex-col items-start overflow-auto p-3 font-mono text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={cn('whitespace-pre', line.className)}>
            {line.text || ' '}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Code editor ──────────────────────────────────────────────

const DEFAULT_OPEN_FILE: Record<string, string> = {
  rasengan: 'src/app/_routes/index.page.tsx',
  futon: 'src/index.ts',
  server: 'src/hello.controller.ts',
};

type FileState = { openFiles: string[]; activeFile: string | null };

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

  const activeFramework =
    frameworks.find((f) => f.key === activeFrameworkKey) ?? frameworks[0];

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

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-(--code-block-bg)">
      {/* ── Desktop / tablet ── */}
      <div className="hidden md:block">
        <div className="w-full flex items-center justify-between bg-muted  border-b border-border px-4 pr-1">
          <div className="flex h-10 items-center gap-3">
            <TrafficLights />
            <span className="truncate font-mono text-xs text-foreground/50">
              {activeFile ?? activeFramework.title}
            </span>
          </div>

          <FrameworkSwitcher
            frameworks={frameworks}
            activeKey={activeFramework.key}
            onSelect={setActiveFrameworkKey}
          />
        </div>

        <ResizablePanelGroup
          id="home-code-editor-vertical"
          direction="vertical"
          className="h-[660px]!"
        >
          <ResizablePanel
            id="home-code-editor-main"
            defaultSize={72}
            minSize={40}
          >
            <ResizablePanelGroup
              id="home-code-editor"
              direction="horizontal"
              className="h-full!"
            >
              <ResizablePanel
                id="home-code-editor-tree"
                defaultSize={22}
                minSize={16}
                maxSize={40}
                className="overflow-y-auto bg-muted/50 py-2"
              >
                {tree.map((node) => (
                  <FileTreeNode
                    key={node.path}
                    node={node}
                    depth={0}
                    activeFile={activeFile}
                    onSelectFile={openFile}
                  />
                ))}
              </ResizablePanel>

              <ResizableHandle id="home-code-editor-handle" />

              <ResizablePanel
                id="home-code-editor-content"
                defaultSize={78}
                className="flex min-w-0 flex-col bg-(--code-block-bg)"
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

          <ResizableHandle id="home-code-editor-terminal-handle" />

          <ResizablePanel
            id="home-code-editor-terminal"
            defaultSize={28}
            minSize={15}
            maxSize={60}
          >
            <Terminal frameworkKey={activeFramework.key} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div className="flex h-10 items-center justify-between border-b border-border bg-muted px-3">
          <TrafficLights />

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMobileTreeOpen(true)}
              aria-label="Open file tree"
              className="cursor-pointer rounded-sm p-1.5 text-foreground/60 transition-colors duration-200 ease-out hover:bg-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <FolderOpen size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileTerminalOpen((prev) => !prev)}
              aria-label="Toggle terminal"
              aria-pressed={mobileTerminalOpen}
              className={cn(
                'cursor-pointer rounded-sm p-1.5 transition-colors duration-200 ease-out hover:bg-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                mobileTerminalOpen
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/60'
              )}
            >
              <TerminalSquare size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="no-scrollbar overflow-x-auto border-b border-border bg-muted/20 px-2 py-1.5">
          <FrameworkSwitcher
            frameworks={frameworks}
            activeKey={activeFramework.key}
            onSelect={setActiveFrameworkKey}
          />
        </div>

        <EditorTabBar
          openFiles={openFiles}
          activeFile={activeFile}
          onSelect={setActiveFile}
          onClose={closeFile}
        />

        <div className="relative h-[420px]">
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
                  className="absolute inset-0 z-20 bg-background/80"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 z-30 h-full w-[75%] max-w-[260px] overflow-y-auto border-r border-border bg-muted/95 py-2"
                >
                  {tree.map((node) => (
                    <FileTreeNode
                      key={node.path}
                      node={node}
                      depth={0}
                      activeFile={activeFile}
                      onSelectFile={(path) => {
                        openFile(path);
                        setMobileTreeOpen(false);
                      }}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {mobileTerminalOpen && (
          <div className="h-[180px] border-t border-border">
            <Terminal frameworkKey={activeFramework.key} />
          </div>
        )}
      </div>
    </div>
  );
}
