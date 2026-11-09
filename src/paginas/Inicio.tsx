import Banner from '../componentes/Banner'
import ProdcutosCard from '../componentes/ProdcutosCard'
import { PRODUCTOS } from '../datos/Productos'
/* 
   es la pagina de incio (ruta /)
   modularizamos la pagina en componentes independientes
   usamos programacion funcional con .map()
*/


function Inicio() {
  return (
    <div className="container my-4">
      {/* 1. LLAMA AL Componente del Banner promocional */}
      <Banner />

      {/* 2. Título de la sección PRODUCTOS DESTACADOS*/}
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h3 className="custom-title mb-0">Productos Destacados</h3>
      </div>

      {/* 3. Grilla dinámica con .map() */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5">
       {/* iteracion de productos */}
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
  )
}

export default Inicio
