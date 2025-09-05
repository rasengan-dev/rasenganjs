import {
  isRouteErrorResponse,
  Link,
  LinkProps,
  useLocation,
  useParams,
  useRouteError,
} from 'react-router';
import { useEffect, useRef } from 'react';
import { RasenganPageComponentProps } from '../types.js';

// Extract the environment variables
const extractEnv = () => {
  try {
    const env = import.meta.env;

    // If not env, use process.env on the server only
    if (!env) {
      const serverEnv = process.env;

      return {
        DEV: serverEnv.NODE_ENV === 'development',
        PROD: serverEnv.NODE_ENV === 'production',
        TEST: serverEnv.NODE_ENV === 'test',
      };
    }

    return {
      DEV: env.DEV,
      PROD: env.PROD,
      TEST: env.TEST,
    };
  } catch (error) {
    console.error(error);

    return {
      DEV: false,
      PROD: true,
      TEST: false,
    };
  }
};

/**
 * Error boundary component that will be displayed if an error occurs during a routing
 * @returns
 */
export function ErrorBoundary() {
  const { DEV } = extractEnv();

  console.log({ DEV });

  let error = useRouteError();

  if (!DEV)
    return (
      <section
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          gap: 10,
          backgroundColor: '#fff',
        }}
      >
        <p
          style={{
            fontSize: '18px',
          }}
        >
          Application Error
        </p>
      </section>
    );

  if (isRouteErrorResponse(error)) {
    return (
      <section
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          gap: 10,
          backgroundColor: '#fff',
        }}
      >
        <p
          style={{
            fontSize: '18px',
          }}
        >
          Application Error
        </p>
        <h1
          style={{
            fontSize: '18px',
          }}
        >
          {error.status} {error.statusText}
        </h1>
        <p
          style={{
            fontSize: '18px',
          }}
        >
          {error.data}
        </p>
      </section>
    );
  } else if (error instanceof Error) {
    return (
      <section
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          height: '100vh',
          width: '100vw',
          padding: 20,
          backgroundColor: '#fff',
        }}
      >
        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Application Error
        </h1>
        <p
          style={{
            fontSize: '1rem',
            marginBottom: 10,
          }}
        >
          {error.message}
        </p>

        <div
          style={{
            marginTop: 20,
            overflow: 'auto',
            width: '100%',
            maxHeight: '100vh',
            padding: '10px 20px',
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
          }}
        >
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#000',
            }}
          >
            The stack trace is:
          </p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              fontSize: '1rem',
              color: '#ff0000aa',
            }}
          >
            {error.stack}
          </pre>
        </div>
      </section>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

/**
 * Page component that defines title and description to a page
 */
export const RasenganPageComponent = ({
  page: Page,
  data,
}: RasenganPageComponentProps) => {
  // Get the page props
  const props = data.props ?? {};

  // get params
  const params = useParams();

  const pageProps = {
    ...props,
    params,
  };

  return <Page {...pageProps} />;
};

/**
 * Component that will be displayed when a page is not found
 * @returns React.ReactNode
 */
export const NotFoundPageComponent = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        gap: 10,
      }}
    >
      <h1
        style={{
          fontSize: '18px',
          fontWeight: 'normal',
        }}
      >
        404
      </h1>

      <span
        style={{
          height: '20px',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderRightColor: '#ccc',
        }}
      ></span>

      <p
        style={{
          fontSize: '18px',
        }}
      >
        Page not found
      </p>
    </section>
  );
};

/**
 * Custom Link Component
 * @param props
 * @returns React.ReactNode
 */
export const CustomLink = (props: LinkProps) => {
  const { to, children, ...rest } = props;

  if (typeof to === 'string') {
    const splitted = to.split('#');
    if (splitted.length > 1)
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      );
  }

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

// Store scroll positions globally (per location.key)
const scrollPositions: Record<string, number> = {};

type Props = {
  alwaysToTop?: boolean;
  target?: React.RefObject<HTMLElement | null>;
};

/**
 * Scroll restoration component
 * @param {Props} props
 * @returns
 */
export function ScrollRestoration({ alwaysToTop = false, target }: Props) {
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prevPathname = pathnameRef.current;
    const el = target?.current; // easier to reference

    if (alwaysToTop) {
      if (el) {
        el.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
      pathnameRef.current = location.pathname;
      return;
    }

    // Save scroll position of the previous page
    if (prevPathname) {
      scrollPositions[prevPathname] = el ? el.scrollTop : window.scrollY;
    }

    // Restore scroll position of the new page (default to 0 if not stored)
    const storedY = scrollPositions[location.pathname] ?? 0;
    if (el) {
      el.scrollTo(0, storedY);
    } else {
      window.scrollTo(0, storedY);
    }

    // Update ref
    pathnameRef.current = location.pathname;
  }, [location.pathname, target?.current]); // depend on target.current

  return null;
}
