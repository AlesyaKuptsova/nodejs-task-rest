export class ColumnDto {
  title: string;

  order: number;

  constructor({ title = 'title', order = 1 } = {}) {
    this.title = title;
    this.order = order;
  }
}
