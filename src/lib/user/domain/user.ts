export interface UserProps {
  id: string;
  name: string;
}

export class User {
  readonly id: string;
  name: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
  }

  public static create(props: { id?: string; name: string }): User {
    const id = props.id || crypto.randomUUID();

    // validaciones simples
    if (
      typeof props.name !== "string" ||
      props.name.length < 2 ||
      props.name.length > 50
    ) {
      throw new Error("Invalid data provided");
    }

    if (typeof id !== "string") {
      throw new Error("Invalid id provided");
    }

    return new User({ id, name: props.name });
  }

  public updateName(name: string) {
    if (typeof name !== "string" || name.length < 2 || name.length > 50) {
      throw new Error("Invalid name provided");
    }

    this.name = name;
  }

  public toPrimitives(): UserProps {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
