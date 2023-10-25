export interface MenuItem {
  name: string;
  icon: string | null;
  link: string;
  image: string | null;
  children: MenuItem[] | null;
  role?: string[];
}
