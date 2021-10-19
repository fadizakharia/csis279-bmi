declare namespace Express {
  export interface Request {
    session: {
      userId?: string;
      destroy: any;
    };
  }
}
interface user {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
interface bmi {
  id: string;
  weight: number;
  height: number;
  [...user];
}
