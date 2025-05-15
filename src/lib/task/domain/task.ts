export class Task {
  readonly id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;

  protected constructor(
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    //Validaciones intrinsecas
    if (!id) throw new Error("Id is required");
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");
    if (typeof completed !== "boolean")
      throw new Error("Completed must be a boolean");
    if (!createdAt) throw new Error("CreatedAt is required");
    if (!updatedAt) throw new Error("UpdatedAt is required");

    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createTask(id: string, title: string, description: string): Task {
    return new Task(id, title, description, false, new Date(), new Date());
  }

  /* taskCompleted() {
    this.completed = true;
    this.updatedAt = new Date();
  }

  taskUncompleted() {
    this.completed = false;
    this.updatedAt = new Date();
  } */

  update(fields: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (fields.title !== undefined) this.title = fields.title;
    if (fields.description !== undefined) this.description = fields.description;
    if (fields.completed !== undefined) this.completed = fields.completed;
    this.updatedAt = new Date();
  }
}
