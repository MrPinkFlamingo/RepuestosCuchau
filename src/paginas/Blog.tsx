import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

function Blog() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <div className="mb-4 mt-4 text-center">
          <h1 className="custom-title">Blog Mecánico Cuchau</h1>
          <p className="text-muted">Consejos, guías y tips para mantener tu motor rugiendo al máximo.</p>
        </div>

        {/* 2 TARJETAS DE ARTÍCULOS */}
        <div className="row justify-content-center g-4 mt-2">
          {/* Artículo 1 */}
          <div className="col-md-6">
            <article className="card h-100 border-0 shadow-sm product-card-hover">
              <img
                src="/img/JuegoDePastillasBrembo.jpg"
                className="card-img-top"
                alt="Frenos"
                style={{ height: "250px", objectFit: "contain", padding: "20px", backgroundColor: "#fff" }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-danger-subtle text-danger align-self-start mb-2">Mantenimiento</span>
                <h4 className="card-title fw-bold">5 señales de que debes cambiar tus pastillas de freno</h4>
                <p className="card-text text-muted flex-grow-1">
                  ¿Escuchas un chillido molesto al frenar o el pedal se siente esponjoso? Descubre cuáles son los síntomas clave que te advierten de que es momento de reemplazar tus pastillas antes de dañar los discos.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <small className="text-muted">
                    <i className="bi bi-calendar3 me-1"></i> Publicado hace 2 días
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i> 4 min de lectura
                  </small>
                </div>
              </div>
            </article>
          </div>

          {/* Artículo 2 */}
          <div className="col-md-6">
            <article className="card h-100 border-0 shadow-sm product-card-hover">
              <img
                src="/img/BateriaHankook55MP.jpg"
                className="card-img-top"
                alt="Batería"
                style={{ height: "250px", objectFit: "contain", padding: "20px", backgroundColor: "#fff" }}
              />
              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-warning-subtle text-dark align-self-start mb-2">Guías de Compra</span>
                <h4 className="card-title fw-bold">¿Cómo saber si es momento de cambiar la batería?</h4>
                <p className="card-text text-muted flex-grow-1">
                  Quedarse botado por falta de batería es la peor pesadilla de cualquier conductor. Aprende a medir el voltaje y a reconocer si tu batería Hankook está llegando al final de su vida útil.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <small className="text-muted">
                    <i className="bi bi-calendar3 me-1"></i> Publicado la semana pasada
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i> 6 min de lectura
                  </small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
