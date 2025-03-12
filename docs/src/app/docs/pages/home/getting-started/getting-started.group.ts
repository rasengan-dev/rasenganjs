import { defineRoutesGroup } from 'rasengan';
import IntroductionPage from './introduction.page.mdx';
import InstallationPage from './installation.page.mdx';
import ProjectStructurePage from './project-structure.page.mdx';

export default defineRoutesGroup({
  path: '/getting-started',
  children: [IntroductionPage, InstallationPage, ProjectStructurePage],
});
