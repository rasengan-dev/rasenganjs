import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { ArrowDown, ArrowUp, CornerDownLeft, SearchIcon } from 'lucide-react';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Configure,
  Highlight,
  InstantSearch,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

export interface SearchConfig {
  /** Algolia Application ID (required) */
  applicationId: string;
  /** Algolia API Key (required) */
  apiKey: string;
  /** Algolia Index Name (required) */
  indexName: string;
  /** Placeholder text for search input (optional, defaults to "What are you looking for?") */
  placeholder?: string;
  /** Number of hits per page (optional, defaults to 8) */
  hitsPerPage?: number;
  /** Custom search button text (optional) */
  buttonText?: string;
  /** Custom search button props (optional) */
  buttonProps?: React.ComponentProps<typeof SearchButton>;
  /** Map which hit attributes to render (supports dotted paths) */
  attributes: HitsAttributesMapping;
  /** Additional Algolia search parameters (optional) - e.g., analytics, filters, distinct, etc. */
  searchParameters?: Record<string, unknown>;
  /** Enable Algolia Insights (optional, defaults to true) */
  insights?: boolean;
  /** Open hit URLs in a new tab (optional, defaults to true) */
  openResultsInNewTab?: boolean;
  /** Transform items before rendering (optional) - useful for proxying images or modifying hit data */
  transformItems?: (items: any[]) => any[];
}
// =========================================================================
// Attribute Mapping
// =========================================================================

type HitsAttributesMapping = {
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  url?: string;
  image?: string;
};

function toAttributePath(attribute?: string): string | string[] | undefined {
  if (!attribute) return undefined;
  return attribute.includes('.') ? attribute.split('.') : attribute;
}

function getByPath<T = unknown>(obj: unknown, path?: string): T | undefined {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current as T | undefined;
}

// ============================================================================
// Internal Components
// ============================================================================

interface SearchButtonProps extends React.ComponentProps<typeof Button> {}

export const SearchButton: React.FC<SearchButtonProps> = ({
  className,
  ...buttonProps
}) => {
  const [modifierLabel, setModifierLabel] = useState('⌘');
  const [isModifierPressed, setIsModifierPressed] = useState(false);
  const [isKPressed, setIsKPressed] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    setModifierLabel(isMac ? '⌘' : 'Ctrl');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setIsModifierPressed(true);
      }
      if (event.key.toLowerCase() === 'k') {
        setIsKPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) {
        setIsModifierPressed(false);
      }
      if (event.key.toLowerCase() === 'k') {
        setIsKPressed(false);
      }
    };

    const resetKeys = () => {
      setIsModifierPressed(false);
      setIsKPressed(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', resetKeys);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', resetKeys);
    };
  }, []);

  const baseClassName =
    'md:min-w-[200px] justify-between hover:shadow-md transition-transform duration-400 translate-y-0 py-3 h-auto cursor-pointer hover:bg-transparent hover:translate-y-[-2px] border shadow-none';

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(baseClassName, className)}
      aria-label="Open search"
      {...buttonProps}
    >
      <span className="flex items-center gap-2 text-muted-foreground opacity-80">
        <SearchIcon size={24} color="currentColor" />
        <span className="hidden sm:inline">Search</span>
      </span>
      <div className="hidden md:flex gap-0.5">
        <kbd
          className={`h-5 min-w-5 rounded grid place-items-center bg-muted text-xs text-muted-foreground transition-all duration-200 ${
            isModifierPressed
              ? 'inset-shadow-sm inset-shadow-foreground/30'
              : 'shadow-none'
          }`}
        >
          {modifierLabel}
        </kbd>
        <kbd
          className={`h-5 min-w-5 rounded grid place-items-center bg-muted text-xs text-muted-foreground transition-all duration-200 ${
            isKPressed
              ? 'inset-shadow-sm inset-shadow-foreground/30'
              : 'shadow-none'
          }`}
        >
          K
        </kbd>
      </div>
    </Button>
  );
};

// Logo Component
const AlgoliaLogo = ({ size = 150 }: { size?: number | string }) => (
  <svg
    width="80"
    height="24"
    aria-label="Algolia"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2196.2 500"
    style={{ maxWidth: size }}
  >
    <defs>
      {/* eslint-disable-nextLine @docusaurus/no-untranslated-text */}
      <style>{`.cls-1,.cls-2{fill:#003dff}.cls-2{fillRule:evenodd}`}</style>
    </defs>
    <path
      className="cls-2"
      d="M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
    />
    <rect
      className="cls-1"
      x="1845.88"
      y="104.73"
      width="62.58"
      height="277.9"
      rx="5.9"
      ry="5.9"
    />
    <path
      className="cls-2"
      d="M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z"
    />
    <path
      className="cls-2"
      d="M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
    />
    <path
      className="cls-2"
      d="M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z"
    />
    <path
      className="cls-2"
      d="M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
    />
    <path
      className="cls-2"
      d="M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
    />
    <path
      className="cls-2"
      d="M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z"
    />
    <path
      className="cls-1"
      d="M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z"
    />
  </svg>
);

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center md:pt-[10vh] dark:bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-background md:rounded-xl shadow-2xl w-full md:w-[90%] max-w-full md:max-w-[720px] h-full md:h-auto md:max-h-[80vh] overflow-hidden animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

// HitsList Component
interface HitsListProps {
  hits: any[];
  query: string;
  selectedIndex: number;
  attributes: HitsAttributesMapping;
  onHoverIndex?: (index: number) => void;
  hoverEnabled?: boolean;
  sendEvent?: (eventType: 'click', hit: any, eventName: string) => void;
  openResultsInNewTab?: boolean;
}

const HitsList = memo(function HitsList({
  hits,
  selectedIndex,
  attributes,
  onHoverIndex,
  hoverEnabled,
  sendEvent,
  openResultsInNewTab = true,
}: HitsListProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const mapping = useMemo(
    () => ({
      primaryText: attributes.primaryText,
      secondaryText: attributes.secondaryText,
      tertiaryText: attributes.tertiaryText,
      url: attributes.url,
      image: attributes.image,
    }),
    [attributes]
  );

  if (!attributes || !mapping.primaryText) {
    throw new Error('At least a primaryText is required to display results');
  }

  return (
    <>
      {hits.map((hit: any, idx: number) => {
        const isSel = selectedIndex === idx;
        const imageUrl = getByPath<string>(hit, mapping.image);
        const url = getByPath<string>(hit, mapping.url);
        const hasImage = Boolean(imageUrl);
        const isImageFailed = failedImages[hit.objectID] || !hasImage;
        const primaryVal = getByPath<string>(hit, mapping.primaryText);
        return (
          <a
            key={hit.objectID}
            href={url ?? '#'}
            target={openResultsInNewTab && url ? '_blank' : undefined}
            rel={openResultsInNewTab && url ? 'noopener noreferrer' : undefined}
            className="flex flex-row items-center gap-4 cursor-pointer text-decoration-none text-foreground bg-background rounded-sm p-4 aria-selected:bg-blue-50 dark:aria-selected:bg-slate-900 animate-in fade-in-0 zoom-in-95"
            role="option"
            aria-selected={isSel}
            onClick={() => {
              sendEvent?.('click', hit, 'Hit Clicked');
            }}
            onMouseEnter={() => {
              if (!hoverEnabled) return;
              onHoverIndex?.(idx);
            }}
            onMouseMove={() => {
              if (!hoverEnabled) return;
              onHoverIndex?.(idx);
            }}
          >
            {hasImage ? (
              <div className="w-[100px] h-[100px] self-start flex-[0_0_100px] items-center justify-center overflow-hidden rounded-sm bg-muted">
                {!isImageFailed ? (
                  <img
                    src={imageUrl as string}
                    alt={primaryVal || ''}
                    className="w-full h-full object-contain rounded-sm"
                    onError={() =>
                      setFailedImages((prev) => ({
                        ...prev,
                        [hit.objectID]: true,
                      }))
                    }
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-full text-muted-foreground"
                    aria-hidden="true"
                  >
                    <SearchIcon />
                  </div>
                )}
              </div>
            ) : null}
            <div>
              <p className="font-medium [&_mark]:bg-transparent [&_mark]:text-secondary-foreground [&_mark]:underline [&_mark]:underline-offset-4">
                <Highlight
                  attribute={toAttributePath(mapping.primaryText) as any}
                  hit={hit}
                />
              </p>
              {mapping.secondaryText ? (
                <p className="text-sm mt-2 text-muted-foreground">
                  {getByPath<string | number>(hit, mapping.secondaryText)}
                </p>
              ) : null}
              {mapping.tertiaryText ? (
                <p className="text-sm text-muted-foreground mt-2">
                  {getByPath<string | number>(hit, mapping.tertiaryText)}
                </p>
              ) : null}
            </div>
          </a>
        );
      })}
    </>
  );
});

// SearchInput Component
export interface SearchInputProps {
  placeholder?: string;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
}

const SearchInput = memo(function SearchInput(props: SearchInputProps) {
  const { status } = useInstantSearch();
  const { query, refine } = useSearchBox();

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    refine(newQuery);
  }

  const placeholder = props.placeholder;

  return (
    <search
      className={props.className}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery('');
        if (props.inputRef.current) {
          props.inputRef.current.focus();
        }
      }}
    >
      <div
        role="button"
        tabIndex={-1}
        className="p-2 rounded-full flex items-center justify-center transition-colors text-muted-foreground peer-focus:text-[#003dff]"
        aria-label="Search"
        title="Search"
      >
        <SearchIcon color="currentColor" strokeWidth={1.5} />
      </div>
      <input
        ref={props.inputRef}
        className="peer w-[90%] outline-none bg-transparent border-nonetext-foreground text-xl font-light peer [::-webkit-search-decoration]:appearance-none [::-webkit-search-cancel-button]:appearance-none [::-webkit-search-results-button]:appearance-none[::-webkit-search-results-decoration]:appearance-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={placeholder}
        spellCheck={false}
        inputMode="search"
        id="algolia-search-input"
        name="algolia-search-input"
        maxLength={512}
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            props.onArrowDown?.();
            return;
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            props.onArrowUp?.();
            return;
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            props.onEnter?.();
          }
        }}
        // biome-ignore lint/a11y/noAutofocus: expected
        autoFocus
      />
      <div className="flex items-center gap-2 ml-auto">
        <Button
          type="reset"
          variant="ghost"
          className="px-2 text-muted-foreground"
          hidden={!query || query.length === 0 || isSearchStalled}
          onClick={() => {
            setQuery('');
            if (props.inputRef.current) {
              props.inputRef.current.focus();
            }
          }}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-2 text-muted-foreground"
          onClick={props.onClose}
        >
          esc
        </Button>
      </div>
    </search>
  );
});

// ============================================================================
// Main Search Components
// ============================================================================

interface SearchBoxProps {
  query?: string;
  className?: string;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  refine: (query: string) => void;
  onClose?: () => void;
  onArrowDown?: () => void;
  onArrowUp?: () => void;
  onEnter?: () => void;
}

const SearchBox = memo(function SearchBox(props: SearchBoxProps) {
  return (
    <SearchInput
      className={props.className}
      placeholder={props.placeholder}
      inputRef={props.inputRef}
      onClose={props.onClose || (() => {})}
      onEnter={props.onEnter}
      onArrowDown={props.onArrowDown}
      onArrowUp={props.onArrowUp}
    />
  );
});

interface NoResultsProps {
  query: string;
  onClear: () => void;
}

const NoResults = memo(function NoResults({ query, onClear }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-muted p-4 h-[91vh] md:h-[50vh] text-foreground">
      <div className="flex items-center p-2 justify-center w-10 h-10 rounded-full border-muted-foreground border">
        <SearchIcon />
      </div>
      <p className="text-lg font-medium">No results for &quot;{query}&quot;</p>
      <p className="text-sm text-muted-foreground">
        Try a different query or ask AI to help.
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClear}>
          Clear query
        </Button>
      </div>
    </div>
  );
});

interface ResultsPanelProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  selectedIndex: number;
  refine: (query: string) => void;
  config: SearchConfig;
  onHoverIndex?: (index: number) => void;
  scrollOnSelectionChange?: boolean;
  sendEvent?: (eventType: 'click', hit: any, eventName: string) => void;
}

const ResultsPanel = memo(function ResultsPanel({
  query,
  selectedIndex,
  config,
  onHoverIndex,
  scrollOnSelectionChange = true,
  sendEvent,
}: ResultsPanelProps) {
  const { items } = useHits(
    config.transformItems ? { transformItems: config.transformItems } : {}
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverEnabled, setHoverEnabled] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: expected
  useEffect(() => {
    if (!scrollOnSelectionChange) return;
    const container = containerRef.current;
    if (!container) return;
    const selectedEl = container.querySelector(
      '[aria-selected="true"]'
    ) as HTMLElement | null;
    if (!selectedEl) return;

    const padding = 8;
    const cRect = container.getBoundingClientRect();
    const iRect = selectedEl.getBoundingClientRect();

    if (iRect.top < cRect.top + padding) {
      container.scrollTop -= cRect.top + padding - iRect.top;
    } else if (iRect.bottom > cRect.bottom - padding) {
      container.scrollTop += iRect.bottom - (cRect.bottom - padding);
    }
  }, [selectedIndex, items.length, scrollOnSelectionChange]);

  // Enable hover selection only after the user moves the pointer inside the list
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setHoverEnabled(false);
    const enable = () => setHoverEnabled(true);
    container.addEventListener('pointermove', enable, { once: true } as any);
    return () => {
      container.removeEventListener('pointermove', enable as any);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col h-[91vh] md:h-[50vh] bg-muted gap-4 p-2 overflow-y-auto"
        role="listbox"
      >
        <HitsList
          hits={items as unknown[]}
          query={query}
          selectedIndex={selectedIndex}
          attributes={config.attributes}
          onHoverIndex={onHoverIndex}
          hoverEnabled={hoverEnabled}
          sendEvent={sendEvent}
          openResultsInNewTab={config.openResultsInNewTab}
        />
      </div>
    </>
  );
});

interface SearchModalProps {
  onClose?: () => void;
  config: SearchConfig;
}

export function SearchModal({ onClose, config }: SearchModalProps) {
  const { query, refine } = useSearchBox();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useInstantSearch();
  const { items, sendEvent } = useHits(
    config.transformItems ? { transformItems: config.transformItems } : {}
  );

  const noResults = results.results?.nbHits === 0;
  const {
    selectedIndex,
    moveDown,
    moveUp,
    activateSelection,
    hoverIndex,
    selectionOrigin,
  } = useKeyboardNavigation(items, query, config.openResultsInNewTab ?? true);

  const handleActivateSelection = useCallback((): boolean => {
    // Send click event for keyboard navigation before activating
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      const hit = items[selectedIndex];
      if (hit) {
        sendEvent?.('click', hit, 'Hit Clicked');
      }
    }

    if (activateSelection()) {
      return true;
    }
    return false;
  }, [activateSelection, selectedIndex, items, sendEvent]);

  const showResultsPanel = !noResults && !!query;

  return (
    <>
      <Configure
        hitsPerPage={config.hitsPerPage || 8}
        {...config.searchParameters}
      />
      <div className="flex flex-col">
        <SearchBox
          query={query}
          placeholder={config.placeholder || 'What are you looking for?'}
          className="flex flex-row items-center bg-background border-b border-muted rounded-t-sm p-2 placeholder:text-muted-foreground"
          refine={refine}
          onClose={onClose}
          onArrowDown={moveDown}
          onArrowUp={moveUp}
          inputRef={inputRef}
          onEnter={handleActivateSelection}
        />
        {showResultsPanel && (
          <ResultsPanel
            inputRef={inputRef}
            query={query}
            selectedIndex={selectedIndex}
            refine={refine}
            config={config}
            onHoverIndex={hoverIndex}
            scrollOnSelectionChange={selectionOrigin !== 'pointer'}
            sendEvent={sendEvent}
          />
        )}
        {noResults && query && (
          <NoResults
            query={query}
            onClear={() => {
              refine('');
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

const Footer = memo(function Footer() {
  const basePoweredByUrl =
    'https://www.algolia.com/developers?utm_medium=referral&utm_content=powered_by&utm_campaign=sitesearch';
  const poweredByHref =
    typeof window !== 'undefined'
      ? `${basePoweredByUrl}&utm_source=${encodeURIComponent(window.location.hostname)}`
      : basePoweredByUrl;
  return (
    <div className="flex items-center justify-between bg-background rounded-b-sm p-4">
      <div className="inline-flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <kbd className="bg-muted rounded-sm h-6 flex items-center justify-center p-1 text-muted-foreground">
            <CornerDownLeft size={20} color="currentColor" />
          </kbd>
          <span className="text-muted-foreground">Open</span>
        </div>

        <div className="flex items-center gap-2">
          <kbd className="bg-muted rounded-sm h-6 flex items-center justify-center p-1 text-muted-foreground">
            <ArrowUp size={20} color="currentColor" />
          </kbd>
          <kbd className="bg-muted rounded-sm h-6 flex items-center justify-center p-1 text-muted-foreground">
            <ArrowDown size={20} color="currentColor" />
          </kbd>
          <span className="text-muted-foreground">Navigate</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* 🚧 DO NOT REMOVE the logo if you are on a Free plan
         * https://support.algolia.com/hc/en-us/articles/17226079853073-Is-displaying-the-Algolia-logo-required
         */}
        <a
          className="flex items-center gap-2 text-muted-foreground text-sm no-underline transition-colors hover:text-primary"
          href={poweredByHref}
          target="_blank"
          rel="noopener sitesearch"
        >
          <span className="md:block hidden">Powered by</span>
          <AlgoliaLogo />
        </a>
      </div>
    </div>
  );
});

export default function SearchExperience(config: SearchConfig) {
  const searchClient = algoliasearch(config.applicationId, config.apiKey);
  searchClient.addAlgoliaAgent('algolia-sitesearch');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const buttonProps = {
    ...config.buttonProps,
    onClick: openModal,
  };

  return (
    <>
      <SearchButton {...buttonProps}>{config.buttonText}</SearchButton>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InstantSearch
          searchClient={searchClient}
          indexName={config.indexName}
          future={{ preserveSharedStateOnUnmount: true }}
          insights={config.insights ?? true}
        >
          <SearchModal onClose={closeModal} config={config} />
        </InstantSearch>
      </Modal>
    </>
  );
}
