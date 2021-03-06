interface Category {
  id?: string;
  name: string;
  time: number;
  userId: string;
}

interface Record {
  categoryId: string;
  time: number;
  date: number;
}
