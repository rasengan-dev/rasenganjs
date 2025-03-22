import { defineRoutesGroup } from 'rasengan';
import TypescriptPage from './typescript.page.mdx';
import EnvPage from './env.page.mdx';
import ModuleAliasesPage from './aliases.page.mdx';

export default defineRoutesGroup({
  path: '/configuring',
  children: [TypescriptPage, EnvPage, ModuleAliasesPage],
});
