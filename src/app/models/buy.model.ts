export interface Buy {
  client: { _id?: string; username: string; email: string };
  list: any[];
  total: number;
}
