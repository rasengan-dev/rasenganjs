import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { errorStore } from './error-store.js';
import { parseStackFrame, fetchSourceSnippet } from './stack-utils.js';
import './error-overlay.css';

export function ErrorOverlay() {
  const errors = useSyncExternalStore(
    errorStore.subscribe.bind(errorStore),
    () => errorStore.getErrors(),
    () => errorStore.getErrors()
  );

  const minimized = useSyncExternalStore(
    errorStore.subscribe.bind(errorStore),
    () => errorStore.isMinimized(),
    () => errorStore.isMinimized()
  );

  const [activeTab, setActiveTab] = useState(0);
  const [codePreview, setCodePreview] = useState<{
    snippet: string;
    errorLineIndex: number;
    file: string;
    line: number;
  } | null>(null);

  useEffect(() => {
    if (errors.length > 0 && activeTab >= errors.length) {
      setActiveTab(errors.length - 1);
    }
  }, [errors.length, activeTab]);

  useEffect(() => {
    const error = errors[activeTab];
    if (!error || !error.error.stack) {
      setCodePreview(null);
      return;
    }

    const frame = parseStackFrame(error.error.stack);
    if (!frame) {
      setCodePreview(null);
      return;
    }

    fetchSourceSnippet(frame.file, frame.line).then((result) => {
      if (result) {
        setCodePreview({
          snippet: result.snippet,
          errorLineIndex: result.errorLineIndex,
          file: frame.file,
          line: frame.line,
        });
      } else {
        setCodePreview(null);
      }
    });
  }, [activeTab, errors]);

  if (errors.length === 0) return null;

  if (minimized)
    return createPortal(
      <button
        className="rasengan-error-fab"
        onClick={() => errorStore.toggleMinimize()}
        title={`${errors.length} error${errors.length > 1 ? 's' : ''} — click to view`}
      >
        <svg
          className="rasengan-error-fab-icon"
          viewBox="0 0 16 16"
          width="18"
          height="18"
          fill="currentColor"
        >
          <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l5.782 10.832c.659 1.234-.165 2.771-1.543 2.771H2.218c-1.378 0-2.202-1.537-1.543-2.771L6.457 1.047zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 7a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        <span className="rasengan-error-fab-count">{errors.length}</span>
      </button>,
      document.body
    );

  const activeError = errors[activeTab];
  if (!activeError) return null;

  const totalErrors = errors.length;
  const isFirst = activeTab === 0;
  const isLast = activeTab === totalErrors - 1;

  const snippetLines = codePreview ? codePreview.snippet.split('\n') : [];
  const relativeLineStart = codePreview
    ? codePreview.line - codePreview.errorLineIndex
    : 0;

  return createPortal(
    <>
      <div className="rasengan-error-backdrop" />
      <div className="rasengan-error-overlay">
        <div className="rasengan-error-overlay-header">
          <div className="rasengan-error-pagination">
            <button
              className="rasengan-error-pagination-btn"
              disabled={isFirst}
              onClick={() => setActiveTab(activeTab - 1)}
              title="Previous error"
            >
              &lsaquo;
            </button>
            <span className="rasengan-error-pagination-text">
              {activeTab + 1} of {totalErrors}
            </span>
            <button
              className="rasengan-error-pagination-btn"
              disabled={isLast}
              onClick={() => setActiveTab(activeTab + 1)}
              title="Next error"
            >
              &rsaquo;
            </button>
          </div>
          <div className="rasengan-error-overlay-actions">
            {/* <span className="rasengan-error-version-label">
              <span className="rasengan-error-version-dot" />
              {getFrameworkVersion()}
            </span> */}
            <button
              className="rasengan-error-overlay-close"
              onClick={() => errorStore.toggleMinimize()}
              title="Minimize"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="rasengan-error-overlay-body">
          <div className="rasengan-error-overlay-source">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ marginRight: 4, verticalAlign: -2 }}
            >
              <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l5.782 10.832c.659 1.234-.165 2.771-1.543 2.771H2.218c-1.378 0-2.202-1.537-1.543-2.771L6.457 1.047zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 7a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <p>{activeError.source}</p>
          </div>
          <div className="rasengan-error-overlay-message">
            {activeError.error.message || 'Unknown error'}
          </div>

          {codePreview && (
            <div className="rasengan-error-code-preview">
              <div className="rasengan-error-code-preview-header">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{ marginRight: 4, flexShrink: 0 }}
                >
                  <path d="M2 1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0112.25 16h-8.5A1.75 1.75 0 012 14.25V1.75zM3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V5.5h-2.75A1.75 1.75 0 018 3.75V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06z" />
                </svg>
                <span className="rasengan-error-code-preview-file">
                  {codePreview.file}
                </span>
                <span className="rasengan-error-code-preview-line">
                  line {codePreview.line}
                </span>
              </div>
              <div className="rasengan-error-code-preview-content">
                {snippetLines.map((lineContent, idx) => {
                  const isErrorLine = idx === codePreview.errorLineIndex;
                  return (
                    <div
                      key={idx}
                      className={`rasengan-error-code-line${isErrorLine ? ' error' : ''}`}
                    >
                      <span className="rasengan-error-code-line-number">
                        {relativeLineStart + idx}
                      </span>
                      {isErrorLine && (
                        <span className="rasengan-error-code-line-arrow">
                          ▸
                        </span>
                      )}
                      {!isErrorLine && (
                        <span className="rasengan-error-code-line-arrow" />
                      )}
                      <span className="rasengan-error-code-line-content">
                        {lineContent}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeError.componentStack && (
            <details className="rasengan-error-overlay-section" open>
              <summary className="rasengan-error-overlay-section-title">
                Component Stack
              </summary>
              <pre className="rasengan-error-overlay-stack">
                {activeError.componentStack}
              </pre>
            </details>
          )}
          {activeError.error.stack && (
            <details className="rasengan-error-overlay-section" open>
              <summary className="rasengan-error-overlay-section-title">
                Stack Trace
              </summary>
              <pre className="rasengan-error-overlay-stack">
                {activeError.error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
