export interface UserItem {
  id: string;
  name: string;
  rut: string;
  email: string;
  password?: string;
  role: 'Administrador' | 'Vendedor' | 'Cliente';
  status: 'Activo' | 'Inactivo';
}

export const initialUsers: UserItem[] = [
  {
    id: "USR-001",
    name: "Carlos Ruiz",
    rut: "15342111-0",
    email: "carlos@profesor.duoc.cl",
    password: "1",
    role: "Administrador",
    status: "Activo"
  },
  {
    id: "USR-002",
    name: "Juan Pérez",
    rut: "19011022-2",
    email: "juan.perez@duoc.cl",
    password: "1",
    role: "Vendedor",
    status: "Activo"
  },
  {
    id: "USR-003",
    name: "María López",
    rut: "18567234-4",
    email: "maria.lopez@gmail.com",
    password: "1",
    role: "Cliente",
    status: "Activo"
  },
  {
    id: "USR-004",
    name: "Taller Mecánico El Rápido",
    rut: "76543210-3",
    email: "taller.elrapido@gmail.com",
    password: "1",
    role: "Cliente",
    status: "Inactivo"
  }
];
