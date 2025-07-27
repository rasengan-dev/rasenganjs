import {
  isRouteErrorResponse,
  Link,
  LinkProps,
  useParams,
  useRouteError,
} from 'react-router';
import { RasenganPageComponentProps } from '../types.js';

/**
 * Error boundary component that will be displayed if an error occurs during a routing
 * @returns
 */
export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <p>Hello Error</p>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          height: '100vh',
          width: 'calc(100vw - 40px)',
          padding: 20,
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
            width: 'calc(100% - 80px)',
            maxHeight: 'calc(100vh - 100px)',
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
              color: '#ff000055',
            }}
          >
            {error.stack}
          </pre>
        </div>
      </div>
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
