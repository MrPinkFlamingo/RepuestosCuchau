/* 
   Molde reutulizable que transforma datos 
   de un repuesto en una tarjeta visual interactiva 
*/


//Contrato de type script que define que datos debe recibir este componente
interface Props {
    nombre: string
    descripcion: string
    precio: string
    imagen: string
}
//DECLARACION Y DECONSTRUCCION
//Extraemos directamente las variables 
//con el :props obligamos a typescript que valide los parametros que declaramos arriba
function ProdcutosCard({ nombre, descripcion, precio, imagen }: Props) {
    //return: indica que el codigo jsx va adibujar en pantalla esta funcion
    return (
        //<div className="col"> clase de cuadricula de bootstrap

    <div className="col">
        <div className="card h-100 border-0 shadow-sm product-card-hover">
        <a href="#">
            <img
            src={imagen}
            className="card-img-top"
            alt={nombre}
            style={{ objectFit: 'contain', height: '200px', padding: '15px', backgroundColor: '#fff' }}
            />
        </a>
        <div className="card-body d-flex flex-column">
            <a href="#" className="text-decoration-none text-dark">
            <h6 className="card-title text-truncate">{nombre}</h6>
            </a>
            <p className="card-text text-muted small mb-2">{descripcion}</p>
            <div className="mt-auto">
            <span className="fs-4 fw-bold text-dark">{precio}</span>
            <button className="btn btn-custom-action w-100 mt-2 d-block">
                <i className="bi bi-cart-plus me-1"></i> Comprar
            </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ProdcutosCard