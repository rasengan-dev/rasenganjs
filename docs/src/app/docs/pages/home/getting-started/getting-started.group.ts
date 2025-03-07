import { defineRoutesGroup } from 'rasengan';
import IntroductionPage from './introduction.mdx';
import InstallationPage from './installation.mdx';

export default defineRoutesGroup({
  path: '/',
  children: [IntroductionPage, InstallationPage],
});
