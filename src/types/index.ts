export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  email: string;
  phone: string;
  town: string;
}

export interface NewsItem {
  title: string,
}

export interface CategoryItem {
  id: number,
  url: string,
  title: string
}