export interface TaskProps {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
type InTaskProps = Partial<
  Pick<TaskProps, "id" | "createdAt" | "updatedAt" | "completed">
> &
  Omit<TaskProps, "id" | "createdAt" | "updatedAt" | "completed">;

type UpdateTaskProps = Partial<
  Omit<TaskProps, "id" | "createdAt" | "updatedAt" | "userId" | "completed">
>;

export class Task {
  readonly id: string;
  readonly userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;

  protected constructor(props: TaskProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static createTask(props: InTaskProps): Task {
    const id = props.id || crypto.randomUUID();
    const createdAt = props.createdAt || new Date();
    const updatedAt = props.updatedAt || new Date();
    const completed = props.completed === undefined ? false : props.completed;

    // Create a custom error and then consume it from the infrastructure and send a status code.
    if (!props.userId) throw new Error("User id is required");
    if (!props.title) throw new Error("Title is required");
    if (!props.description) throw new Error("Description is required");
    if (!(createdAt instanceof Date)) throw new Error("Created at is required");
    if (!(updatedAt instanceof Date)) throw new Error("Updated at is required");

    return new Task({
      id,
      userId: props.userId,
      title: props.title,
      description: props.description,
      completed,
      createdAt,
      updatedAt,
    });
  }

  markAsCompleted() {
    this.completed = true;
    this.updatedAt = new Date();
  }

  markAsUncompleted() {
    this.completed = false;
    this.updatedAt = new Date();
  }

  update(fields: UpdateTaskProps): void {
    let update = false;

    if (fields.title !== undefined && fields.title !== this.title) {
      this.title = fields.title;
      update = true;
    }

    if (
      fields.description !== undefined &&
      fields.description !== this.description
    ) {
      this.description = fields.description;
      update = true;
    }

    if (update) this.updatedAt = new Date();
  }

  toPrimitive(): TaskProps {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
