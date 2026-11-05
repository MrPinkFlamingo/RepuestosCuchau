import BarraNavegacion from "../componentes/BarraNavegacion";
import PiePagina from "../componentes/PiePagina";

function Nosotros() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />

      <main className="container mb-5">
        {/* CABECERA NOSOTROS */}
        <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
          <h1 className="display-5 fw-bold custom-title">Sobre Nosotros</h1>
          <p className="col-md-8 mx-auto fs-5 text-muted">
            Somos Repuestos Cuchau, tu tienda de confianza. Llevamos más de 10 años entregando calidad, seguridad y velocidad a los motores de todo el país.
          </p>
        </div>

        {/* HISTORIA E IMAGEN */}
        <div className="row align-items-center mb-5 mt-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <h3 className="custom-title">Nuestra Historia</h3>
            <p className="text-muted">
              Todo comenzó en un pequeño garaje con la pasión por los motores y la mecánica. Hoy en día, Repuestos Cuchau se ha convertido en la tienda líder en repuestos automotrices, trabajando con las mejores marcas a nivel mundial para garantizar que tu vehículo siempre esté en las mejores condiciones.
            </p>
            <p className="text-muted">
              Creemos firmemente en que cada cliente merece atención personalizada y repuestos de alta durabilidad, sin pagar de más.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/img/AutoInicio.jpg"
              alt="Historia de la Empresa"
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: "cover", height: "300px", width: "100%" }}
            />
          </div>
        </div>

        {/* MISIÓN Y VISIÓN */}
        <div className="row g-4 mb-5 mt-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-bullseye text-warning me-3" style={{ fontSize: "2.5rem" }}></i>
                  <h4 className="fw-bold custom-title mb-0">Nuestra Misión</h4>
                </div>
                <p className="text-muted">
                  Proveer repuestos automotrices de alta calidad a precios accesibles, garantizando la satisfacción de nuestros clientes mediante un servicio rápido, confiable y personalizado que mantenga sus vehículos en óptimas condiciones de funcionamiento y seguridad.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-eye-fill text-warning me-3" style={{ fontSize: "2.5rem" }}></i>
                  <h4 className="fw-bold custom-title mb-0">Nuestra Visión</h4>
                </div>
                <p className="text-muted">
                  Ser la tienda líder en repuestos automotrices a nivel nacional, reconocida por la excelencia en la calidad de nuestros productos, la innovación en nuestros canales digitales de venta y el compromiso constante con la seguridad vial de cada conductor chileno.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 PILARES DE CONFIANZA */}
        <div className="row g-4 text-center mt-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-shield-check text-warning" style={{ fontSize: "3rem" }}></i>
              <h5 className="fw-bold mt-3">Calidad Garantizada</h5>
              <p className="text-muted small">
                Todos nuestros repuestos están certificados y probados para brindar el máximo rendimiento.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-truck text-warning" style={{ fontSize: "3rem" }}></i>
              <h5 className="fw-bold mt-3">Envíos Rápidos</h5>
              <p className="text-muted small">
                Despachamos tus pedidos el mismo día para que nunca te quedes con el auto parado.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-headset text-warning" style={{ fontSize: "3rem" }}></i>
              <h5 className="fw-bold mt-3">Soporte Experto</h5>
              <p className="text-muted small">
                Nuestros mecánicos asociados están disponibles para asesorarte en tu compra.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}

export default Nosotros;
