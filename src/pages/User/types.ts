interface Purchase {
  id: number;
  item: string;
  price: number;
}

export interface UserData {
  name: string;
  email: string;
  purchases: Purchase[];
}
