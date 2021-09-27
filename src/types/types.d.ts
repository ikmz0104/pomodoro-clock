type Category = {
  id?: string;
  name: string;
  time: number;
  userId: string;
};

type voidFunc = () => void;

type IRecord = {
  x: number;
  y: number;
};

type Series = {
  name: string;
  data: Record[];
};
