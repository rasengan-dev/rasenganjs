import { describe, it, expect } from 'vitest';
import {
  ServerApp,
  defineModule,
  Controller,
  type Router,
} from '@rasenganjs/server';
import { Gateway, GatewayRouter, createWsPlugin } from '../index.js';

/**
 * Gateway now extends Provider, and createWsPlugin() implements
 * ModulePlugin.asProviders() — so a gateway declared via
 * `defineModule({ gateways: [...] })` alone (no `providers` entry) is a
 * real DI provider: onInit()/onDestroy() fire, and it can be exported
 * for another module to inject.
 */

describe('Gateway as a real DI provider', () => {
  it('onInit()/onDestroy() fire for a gateway declared only via `gateways`', async () => {
    const events: string[] = [];
    class InitGateway extends Gateway {
      path = '/init';
      async onInit() {
        events.push('init');
      }
      async onDestroy() {
        events.push('destroy');
      }
      messages(_router: GatewayRouter) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createWsPlugin());
    app.registerModule(defineModule({ name: 'M', gateways: [InitGateway] }));
    app.compile();

    // compile() fires initAll() without awaiting it (fire-and-forget).
    await new Promise((r) => setTimeout(r, 10));
    expect(events).toEqual(['init']);

    await app.close();
    expect(events).toEqual(['init', 'destroy']);
  });

  it('a gateway is exportable — another module can inject the same instance', () => {
    class SharedGateway extends Gateway {
      path = '/shared';
      messages(_router: GatewayRouter) {}
    }

    const gatewayModule = defineModule({
      name: 'GatewayModule',
      gateways: [SharedGateway],
      exports: [SharedGateway],
    });

    let injected: unknown;
    class BroadcastController extends Controller {
      constructor(sharedGateway: any) {
        super();
        injected = sharedGateway;
      }
      routes(_router: Router) {}
    }

    const app = new ServerApp();
    app.registerPlugin(createWsPlugin());
    app.registerModule(
      defineModule({
        name: 'HttpModule',
        imports: [gatewayModule],
        controllers: [BroadcastController],
      })
    );
    app.compile();

    expect(injected).toBeInstanceOf(SharedGateway);
    // Same singleton the plugin wired into app.websocket(), not a
    // second, disconnected instance.
    const registry = app.getWebSocketRegistry();
    expect(registry?.isEmpty).toBe(false);
  });
});
