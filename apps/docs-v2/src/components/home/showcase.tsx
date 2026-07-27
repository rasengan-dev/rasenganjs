import { useMemo, useState } from 'react';
import {
  Check,
  ChevronRight,
  Copy,
  FileCode2,
  Folder,
  FolderOpen,
  X,
} from 'lucide-react';
import { Tabs } from '@/components/common/molecules/tab';
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
    <div className="no-scrollbar flex items-stretch overflow-x-auto border-b border-border bg-muted/20">
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

// ── Framework editor ─────────────────────────────────────────

function FrameworkEditor({ framework }: { framework: HighlightedFramework }) {
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const tree = useMemo(() => buildTree(framework.files), [framework]);
  const filesByPath = useMemo(() => {
    const map = new Map<string, HighlightedFile>();
    framework.files.forEach((file) => map.set(file.filename, file));
    return map;
  }, [framework]);

  const openFile = (path: string) => {
    setOpenFiles((prev) => (prev.includes(path) ? prev : [...prev, path]));
    setActiveFile(path);
  };

  const closeFile = (path: string) => {
    setOpenFiles((prev) => {
      const index = prev.indexOf(path);
      const next = prev.filter((p) => p !== path);

      if (activeFile === path) {
        setActiveFile(next.length === 0 ? null : next[Math.max(0, index - 1)]);
      }

      return next;
    });
  };

  const activeContent = activeFile ? filesByPath.get(activeFile) : undefined;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-(--code-block-bg)">
      <div className="flex h-10 items-center gap-3 border-b border-border bg-muted px-4">
        <TrafficLights />
        <span className="truncate font-mono text-xs text-foreground/50">
          {activeFile ?? framework.title}
        </span>
      </div>

      <ResizablePanelGroup
        id={`showcase-${framework.key}`}
        direction="horizontal"
        className="h-[460px]!"
      >
        <ResizablePanel
          id={`showcase-${framework.key}-tree`}
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

        <ResizableHandle id={`showcase-${framework.key}-handle`} />

        <ResizablePanel
          id={`showcase-${framework.key}-editor`}
          defaultSize={78}
          className="flex min-w-0 flex-col bg-(--code-block-bg)"
        >
          {openFiles.length > 0 && (
            <EditorTabBar
              openFiles={openFiles}
              activeFile={activeFile}
              onSelect={setActiveFile}
              onClose={closeFile}
            />
          )}

          {activeContent ? (
            <CodePane file={activeContent} />
          ) : (
            <EmptyEditorState />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────

export default function Showcase({
  frameworks,
}: {
  frameworks: HighlightedFramework[];
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          One API, Every Layer
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">
          The same conventions, whether you're rendering a page, handling a
          request, or wiring a controller.
        </p>
      </div>

      <div className="mt-12 w-full max-w-[1200px] mx-auto">
        <Tabs tabs={frameworks.map((f) => ({ title: f.title }))}>
          {frameworks.map((framework) => (
            <Tabs.Item key={framework.key}>
              <FrameworkEditor framework={framework} />
            </Tabs.Item>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
