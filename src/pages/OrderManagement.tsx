import React, { useState } from 'react';
import { initialOrders, OrderItem } from '../data/orders';
import { ManagementHeader } from '../components/ManagementHeader';

export const OrderManagement: React.FC = () => {
  const [orders] = useState<OrderItem[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  return (
    <div className="flex-grow-1 mb-5">
      <ManagementHeader activeTab="ordenes" />

      <div className="container">
        <h2 className="mb-4 custom-title" id="titulo-ordenes">
          Órdenes de Compra Generadas
        </h2>

        {selectedOrder && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <h5 className="alert-heading">
              <i className="bi bi-info-circle-fill me-2"></i>Detalle de Orden: {selectedOrder.id}
            </h5>
            <p className="mb-1">
              <strong>Cliente:</strong> {selectedOrder.customer} ({selectedOrder.rut})
            </p>
            <p className="mb-1">
              <strong>Fecha:</strong> {selectedOrder.date} | <strong>Total:</strong> {selectedOrder.formattedTotal}
            </p>
            <p className="mb-0">
              <strong>Estado actual:</strong>{' '}
              <span
                className={`badge rounded-pill ${
                  selectedOrder.status === 'Completada' ? 'bg-secondary' : 'bg-dark'
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <button
              type="button"
              className="btn-close"
              onClick={() => setSelectedOrder(null)}
              aria-label="Cerrar"
            ></button>
          </div>
        )}

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>N° Orden</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>RUT Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-bold">{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{order.rut}</td>
                      <td className="fw-bold text-dark">{order.formattedTotal}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            order.status === 'Completada' ? 'bg-secondary' : 'bg-dark'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <i className="bi bi-file-text me-1"></i> Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
