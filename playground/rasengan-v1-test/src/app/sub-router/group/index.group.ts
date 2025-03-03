import { defineRoutesGroup } from 'rasengan';
import { Contact } from './contact.page';
import { Pricing } from './pricing.page';

export default defineRoutesGroup({
  path: '/group',
  children: [Contact, Pricing],
});
