export interface OrderItem {
  id: string;
  date: string;
  customer: string;
  rut: string;
  total: number;
  formattedTotal: string;
  status: 'Completada' | 'Cancelada' | 'Pendiente';
}

export const initialOrders: OrderItem[] = [
  {
    id: "ORD-10045",
    date: "21-09-2026",
    customer: "Juan Pérez",
    rut: "19011022-2",
    total: 43990,
    formattedTotal: "$43.990",
    status: "Completada"
  },
  {
    id: "ORD-10046",
    date: "20-09-2026",
    customer: "María López",
    rut: "18567234-4",
    total: 111980,
    formattedTotal: "$111.980",
    status: "Cancelada"
  },
  {
    id: "ORD-10047",
    date: "19-09-2026",
    customer: "Carlos Ruiz",
    rut: "15342111-0",
    total: 8990,
    formattedTotal: "$8.990",
    status: "Completada"
  },
  {
    id: "ORD-10048",
    date: "18-09-2026",
    customer: "Taller Mecánico El Rápido",
    rut: "76543210-3",
    total: 350000,
    formattedTotal: "$350.000",
    status: "Cancelada"
  }
];
