import { defineRoutesGroup } from 'rasengan';
import BaseConceptsPage from './base-concepts.page.mdx';
import RoutesPage from './routes.page.mdx';
import RouterConfigurationPage from './router.page.mdx';
import LayoutsPage from './layouts.page.mdx';
import LinkingAndNavigatingPage from './linking.page.mdx';
import DynamicRoutesPage from './dynamic-routes.page.mdx';
import ErrorHandlingPage from './error-handling.page.mdx';
import RedirectingPage from './redirecting.page.mdx';

export default defineRoutesGroup({
  path: '/routing',
  children: [
    BaseConceptsPage,
    RouterConfigurationPage,
    RoutesPage,
    LayoutsPage,
    LinkingAndNavigatingPage,
    DynamicRoutesPage,
    ErrorHandlingPage,
    RedirectingPage,
  ],
});
