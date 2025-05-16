// A constructor type that works with class constructors
export type Constructor<T> = new (...args: unknown[]) => T;

interface Container {
  register<T>(
    token: string,
    constructorOrInstance: T | Constructor<T>,
    dependencies?: string[]
  ): void;
  resolve<T>(token: string): T;
}

export class SimpleContainer implements Container {
  private instances: Map<string, unknown> = new Map();
  private registrations: Map<
    string,
    { ctor: Constructor<unknown>; dependencies: string[] }
  > = new Map();

  register<T>(
    token: string,
    constructorOrInstance: T | Constructor<T>,
    dependencies?: string[]
  ): void {
    if (typeof constructorOrInstance === "function") {
      this.registrations.set(token, {
        ctor: constructorOrInstance as Constructor<unknown>,
        dependencies: dependencies || [],
      });
    } else {
      this.instances.set(token, constructorOrInstance);
    }
  }

  //Resuelve dependencias de la instancia
  resolve<T>(token: string): T {
    if (this.instances.has(token)) return this.instances.get(token) as T;

    const registration = this.registrations.get(token);
    if (!registration)
      throw new Error(`No registration found for token ${token}`);

    const resolveDependencies = registration.dependencies.map((dependency) =>
      this.resolve(dependency)
    );

    const instance = new registration.ctor(...resolveDependencies);

    this.instances.set(token, instance);

    return instance as T;
  }
}
