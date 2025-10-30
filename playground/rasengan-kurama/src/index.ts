import { renderApp } from 'rasengan/client';
import App from './main';
import AppRouter from '@/app/app.router';

renderApp(App, AppRouter, { reactStrictMode: true });
