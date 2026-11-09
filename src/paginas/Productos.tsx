/* 
   donde los productos retienen el molde que llenaron 
  Muestra el catalogo conectando la lista de datos productos con el 
  componente reutilizable ProductosCard mediante .map()

   */
//imporatmos componentes y los datos
import ProdcutosCard from "../componentes/ProdcutosCard";
import { PRODUCTOS } from "../datos/Productos";

function Productos() {
  return (
    <div className="container">
      {/* Titulo y descripcion del producto 
      `<div className="container">`):** Clase de Bootstrap
       que centra el contenido en la pantalla con márgenes automáticos a los lados.*/}
      <div className="mb-4 mt-4">
        {/*Margenes de bootstrap mb-4 hacia abajo
        mt 4 margen hacia arriba */}
        <h3 className="custom-title mb-0">Catalogo de Productos</h3>
        {/*Custom tittle Clase definida que pinta el titulo azul con sombra suave
        Text muted Clase de bootstrap que coloca el texto secundario en color gris sutil */}
        <p className="text-muted">
          Explora todos nuestros repuestos disponibles
        </p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5">
        {/*row:define una fila flexible
          row-cols-sm-2: en las pantallas medianas(celulares tablets)
           muestra 2 tarjetas por fila
           row-cols-md-4: en compuadoras medianas grandes muestra 4 tarjetas por fila
           g-4:gap separacion de tamaño 4 entra las tarjetas
           mb-5:margen inferior de tamaño 5 para que las tarjetas
           no queden pegadas al footer */}
        {PRODUCTOS.map((producto) => (
          <ProdcutosCard
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;

//ahora lo importamos en app.tsx
