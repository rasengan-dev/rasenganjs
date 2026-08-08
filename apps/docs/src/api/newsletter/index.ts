import { instance } from '..';

const env = import.meta.env;

export const newsletterProvider = {
  subscribe: async (email: string) => {
    try {
      const payload = {
        email,
        project_id: env.RASENGAN_SMAD_PROJECT_ID,
        private_key: env.RASENGAN_SMAD_PRIVATE_KEY,
      };
      const response = await instance.post('/email/save', payload);

      if (response.status === 201) {
        return {
          data: 'Your subscrition has been done',
        };
      }

      return {
        error: 'Error while subscribing to the newsletter',
      };
    } catch (error) {
      return {
        error: 'Error while subscribing to the newsletter',
      };
    }
  },
};
