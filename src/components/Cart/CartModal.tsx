import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatCLP } from '../../utils/validations';

export const CartModal: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    currentUser,
    checkout,
    products,
  } = useApp();

  const [checkoutMessage, setCheckoutMessage] = useState<{
    type: 'success' | 'danger';
    text: string;
  } | null>(null);

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      navigate('/login');
      return;
    }

    const res = checkout();
    if (!res.success) {
      setCheckoutMessage({ type: 'danger', text: res.message || 'No se pudo procesar la compra.' });
      return;
    }

    setCheckoutMessage({
      type: 'success',
      text: `¡Compra realizada con éxito! Se ha descontado el stock de los productos. Gracias por tu compra, ${currentUser.name}.`,
    });

    setTimeout(() => {
      setCheckoutMessage(null);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content shadow-lg border-0">
          {/* Header */}
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-cart3 text-warning me-2"></i>Carrito de Compras
              <span className="badge bg-secondary ms-2 small fw-normal">
                {currentUser ? `Usuario: ${currentUser.name.split(' ')[0]}` : 'Invitado'}
              </span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => {
                setCheckoutMessage(null);
                setIsCartOpen(false);
              }}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {checkoutMessage && (
              <div
                className={`alert alert-${checkoutMessage.type} text-center py-4 my-2`}
                role="alert"
              >
                <i
                  className={`bi ${
                    checkoutMessage.type === 'success'
                      ? 'bi-check-circle-fill text-success'
                      : 'bi-exclamation-triangle-fill text-danger'
                  } fs-1 d-block mb-3`}
                ></i>
                <h4 className="fw-bold">
                  {checkoutMessage.type === 'success' ? '¡Orden Confirmada!' : 'Atención con el Stock'}
                </h4>
                <p className="mb-0">{checkoutMessage.text}</p>
              </div>
            )}

            {!checkoutMessage && cart.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: '3.5rem' }}></i>
                <h5 className="fw-bold mt-3 text-secondary">Tu carrito está vacío</h5>
                <p className="text-muted small">Agrega repuestos desde nuestro catálogo para comenzar.</p>
                <button
                  className="btn btn-warning fw-bold mt-2 px-4"
                  onClick={() => setIsCartOpen(false)}
                >
                  Ver Catálogo
                </button>
              </div>
            )}

            {!checkoutMessage && cart.length > 0 && (
              <div>
                {!currentUser && (
                  <div className="alert alert-warning py-2 small d-flex align-items-center mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                    <div>
                      Para completar tu compra debes{' '}
                      <strong
                        className="text-decoration-underline"
                        role="button"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/login');
                        }}
                      >
                        Iniciar Sesión
                      </strong>{' '}
                      con tu cuenta.
                    </div>
                  </div>
                )}

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Repuesto</th>
                        <th scope="col" className="text-center">Precio</th>
                        <th scope="col" className="text-center">Stock Disp.</th>
                        <th scope="col" className="text-center">Cantidad</th>
                        <th scope="col" className="text-end">Subtotal</th>
                        <th scope="col" className="text-center">Quitar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const liveProd = products.find((p) => p.id === item.product.id) || item.product;
                        const subtotal = item.product.price * item.quantity;
                        const isAtMaxStock = item.quantity >= liveProd.stock;

                        return (
                          <tr key={item.product.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                                  className="me-2 rounded bg-light p-1"
                                />
                                <div>
                                  <div className="fw-bold small">{item.product.name}</div>
                                  <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                                    {item.product.code}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-center small fw-semibold">
                              {formatCLP(item.product.price)}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${
                                  liveProd.stock <= 2
                                    ? 'bg-danger'
                                    : liveProd.stock <= 5
                                    ? 'bg-warning text-dark'
                                    : 'bg-light text-dark border'
                                }`}
                              >
                                {liveProd.stock} unid.
                              </span>
                            </td>
                            <td className="text-center">
                              <div className="d-inline-flex align-items-center border rounded">
                                <button
                                  className="btn btn-sm btn-light py-0 px-2"
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  title="Disminuir"
                                >
                                  -
                                </button>
                                <span className="px-2 small fw-bold">{item.quantity}</span>
                                <button
                                  className="btn btn-sm btn-light py-0 px-2"
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                  disabled={isAtMaxStock}
                                  title={isAtMaxStock ? 'Límite de stock alcanzado' : 'Aumentar'}
                                >
                                  +
                                </button>
                              </div>
                              {isAtMaxStock && (
                                <div className="text-danger small mt-1" style={{ fontSize: '0.7rem' }}>
                                  Máx. alcanzado
                                </div>
                              )}
                            </td>
                            <td className="text-end fw-bold text-dark">
                              {formatCLP(subtotal)}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-outline-danger border-0"
                                onClick={() => removeFromCart(item.product.id)}
                                title="Eliminar producto"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">
                  <div>
                    <span className="text-muted small">Total estimado a pagar:</span>
                    <h3 className="fw-bold text-dark mb-0">{formatCLP(cartTotal)}</h3>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => clearCart()}
                    >
                      Vaciar Carrito
                    </button>
                    <button
                      className="btn btn-warning fw-bold px-4"
                      onClick={handleCheckout}
                    >
                      {currentUser ? 'Confirmar Compra' : 'Iniciar Sesión y Comprar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
