/**
 * Abstract marker base class for dependency-injectable providers.
 *
 * Classes extending `Provider` can be registered with the `Container`
 * and resolved automatically. The class itself carries no logic — it
 * serves as a type constraint for the DI system.
 */
export abstract class Provider {}
