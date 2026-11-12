import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialUsers, UserItem } from '../data/users';
import { productsData, Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  // Autenticación y Usuarios
  users: UserItem[];
  currentUser: UserItem | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  registerUser: (newUser: UserItem) => void;
  updateUser: (updatedUser: UserItem) => void;
  deleteUser: (id: string) => void;

  // Productos y Stock en vivo
  products: Product[];
  getProductById: (id: string) => Product | undefined;

  // Carrito de compras con ID por usuario
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => { success: boolean; message?: string };
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => { success: boolean; message?: string };
  cartCount: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);

  // Productos con stock reactivo en tiempo real
  const [products, setProducts] = useState<Product[]>(productsData);

  // Carritos independientes separados por ID de usuario: { 'USR-001': [...], 'USR-003': [...], 'guest': [...] }
  const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // ID del usuario activo para aislar su carrito (o 'guest' si no está logueado)
  const activeUserId = currentUser ? currentUser.id : 'guest';
  const cart = userCarts[activeUserId] || [];

  const getProductById = (id: string): Product | undefined => {
    return products.find(
      (p) => p.id === id || p.code.toLowerCase() === id.toLowerCase()
    );
  };

  // Iniciar sesión reactivo en memoria
  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find((u) => u.email.trim().toLowerCase() === cleanEmail);

    if (!foundUser) {
      return {
        success: false,
        error: 'El correo electrónico no se encuentra registrado en el sistema.',
      };
    }

    if (foundUser.status === 'Inactivo') {
      return {
        success: false,
        error: 'Esta cuenta se encuentra desactivada. Comunícate con administración.',
      };
    }

    if (foundUser.password !== pass) {
      return {
        success: false,
        error: 'La contraseña ingresada es incorrecta. Inténtalo nuevamente.',
      };
    }

    setCurrentUser(foundUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (newUser: UserItem) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (updatedUser: UserItem) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
    }
  };

  // Carrito de compras con control estricto de Stock
  const addToCart = (product: Product, quantity: number = 1): { success: boolean; message?: string } => {
    // Buscar la versión más actualizada del producto para chequear stock real
    const liveProduct = products.find((p) => p.id === product.id) || product;

    if (liveProduct.stock <= 0) {
      return { success: false, message: `El producto "${liveProduct.name}" se encuentra agotado.` };
    }

    const currentCart = userCarts[activeUserId] || [];
    const existingItem = currentCart.find((item) => item.product.id === product.id);
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;

    if (currentQtyInCart >= liveProduct.stock) {
      return {
        success: false,
        message: `Ya tienes en tu carrito el stock máximo disponible (${liveProduct.stock} unid.) de este producto.`,
      };
    }

    const newQty = Math.min(currentQtyInCart + quantity, liveProduct.stock);

    setUserCarts((prev) => {
      const userList = prev[activeUserId] || [];
      const exists = userList.find((item) => item.product.id === product.id);

      const updatedList = exists
        ? userList.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: newQty, product: liveProduct }
              : item
          )
        : [...userList, { product: liveProduct, quantity: Math.min(quantity, liveProduct.stock) }];

      return {
        ...prev,
        [activeUserId]: updatedList,
      };
    });

    setIsCartOpen(true);
    return { success: true };
  };

  const removeFromCart = (productId: string) => {
    setUserCarts((prev) => ({
      ...prev,
      [activeUserId]: (prev[activeUserId] || []).filter((item) => item.product.id !== productId),
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const liveProduct = products.find((p) => p.id === productId);
    const maxStock = liveProduct ? liveProduct.stock : 1;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const safeQty = Math.min(quantity, maxStock);

    setUserCarts((prev) => ({
      ...prev,
      [activeUserId]: (prev[activeUserId] || []).map((item) =>
        item.product.id === productId
          ? { ...item, quantity: safeQty, product: liveProduct || item.product }
          : item
      ),
    }));
  };

  const clearCart = () => {
    setUserCarts((prev) => ({
      ...prev,
      [activeUserId]: [],
    }));
  };

  // Confirmar compra: descuenta el stock de forma reactiva y vacía el carrito del usuario
  const checkout = (): { success: boolean; message?: string } => {
    if (!currentUser) {
      return {
        success: false,
        message: 'Debes iniciar sesión con una cuenta para procesar tu compra.',
      };
    }

    const currentCart = userCarts[activeUserId] || [];
    if (currentCart.length === 0) {
      return { success: false, message: 'Tu carrito está vacío.' };
    }

    // Validar si algún producto ya no tiene stock suficiente
    for (const item of currentCart) {
      const live = products.find((p) => p.id === item.product.id);
      if (!live || live.stock < item.quantity) {
        return {
          success: false,
          message: `No hay suficiente stock para "${item.product.name}" (Stock actual: ${
            live ? live.stock : 0
          }). Por favor ajusta la cantidad.`,
        };
      }
    }

    // Descontar stock de los productos comprados
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const boughtItem = currentCart.find((ci) => ci.product.id === p.id);
        if (boughtItem) {
          const newStock = Math.max(0, p.stock - boughtItem.quantity);
          return {
            ...p,
            stock: newStock,
          };
        }
        return p;
      })
    );

    // Vaciar solo el carrito de este usuario
    clearCart();

    return {
      success: true,
      message: `¡Compra realizada con éxito! Se ha descontado el stock de los productos.`,
    };
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        login,
        logout,
        registerUser,
        updateUser,
        deleteUser,
        products,
        getProductById,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkout,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser utilizado dentro de un AppProvider');
  }
  return context;
};
