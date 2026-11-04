import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Blog() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar paginaActiva="Blog" />

      {/* CONTENIDO DEL BLOG */}
      <div className="container mb-5">
        <div className="mb-4 mt-4 text-center">
          <h1 className="custom-title">Blog Mecánico Cuchau</h1>
          <p className="text-muted">Consejos, guías y tips para mantener tu motor rugiendo al máximo.</p>
        </div>

        {/* 2 TARJETAS DE BLOG */}
        <div className="row justify-content-center g-4 mt-2">
          {/* Articulo 1 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <img
                src="/img/JuegoDePastillasBrembo.jpg"
                className="card-img-top"
                alt="Frenos"
                style={{ height: "250px", objectFit: "contain", padding: "20px", backgroundColor: "#fff" }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <p className="text-muted small mb-1">Mantenimiento</p>
                <h4 className="card-title fw-bold">5 señales de que debes cambiar tus pastillas de freno</h4>
                <p className="card-text text-muted flex-grow-1">
                  ¿Escuchas un chillido molesto al frenar o el pedal se siente esponjoso? Descubre cuáles son los síntomas clave que te advierten de que es momento de reemplazar tus pastillas antes de dañar los discos.
                </p>
                <p className="text-muted small mb-0">Publicado hace 2 días</p>
              </div>
            </div>
          </div>

          {/* Articulo 2 */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm product-card-hover">
              <img
                src="/img/BateriaHankook55MP.jpg"
                className="card-img-top"
                alt="Bateria"
                style={{ height: "250px", objectFit: "contain", padding: "20px", backgroundColor: "#fff" }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <p className="text-muted small mb-1">Guías de Compra</p>
                <h4 className="card-title fw-bold">¿Cómo saber si es momento de cambiar la batería?</h4>
                <p className="card-text text-muted flex-grow-1">
                  Quedarse botado por falta de batería es la peor pesadilla de cualquier conductor. Aprende a medir el voltaje y a reconocer si tu batería Hankook está llegando al final de su vida útil.
                </p>
                <p className="text-muted small mb-0">Publicado la semana pasada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
