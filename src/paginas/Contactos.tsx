import { useState, type FormEvent } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import Alerta from "../componentes/Alerta";
import { validarCorreo } from "../utilidades/validaciones";

function Contactos() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; texto: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !asunto.trim() || !mensaje.trim()) {
      setAlerta({ tipo: "danger", texto: "Por favor, completa todos los campos del formulario." });
      return;
    }

    if (!validarCorreo(correo)) {
      setAlerta({
        tipo: "danger",
        texto: "Correo inválido. Solo se admiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com",
      });
      return;
    }

    setAlerta({
      tipo: "success",
      texto: "¡Mensaje enviado con éxito! Uno de nuestros mecánicos te responderá a la brevedad.",
    });

    // Limpiar formulario
    setNombre("");
    setCorreo("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mb-5">
        <div className="mb-5 mt-4 text-center">
          <h1 className="custom-title">Contáctanos</h1>
          <p className="text-muted">¿Tienes dudas sobre un repuesto? Escríbenos y un mecánico te asesorará.</p>
        </div>

        <div className="row g-5">
          {/* Columna Información de la Tienda */}
          <div className="col-md-5">
            <div className="bg-light p-4 rounded-3 shadow-sm h-100">
              <h4 className="fw-bold mb-4">Información de la Tienda</h4>

              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-geo-alt-fill text-warning fs-3 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Dirección</h6>
                  <p className="text-muted mb-0">
                    Av. Los Motores 1024, Sector Industrial<br />
                    Región Metropolitana, Chile
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-telephone-fill text-warning fs-3 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Teléfono</h6>
                  <p className="text-muted mb-0">+56 9 1234 5678</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-envelope-fill text-warning fs-3 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Correo Electrónico</h6>
                  <p className="text-muted mb-0">soporte@repuestoscuchau.cl</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <i className="bi bi-clock-fill text-warning fs-3 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Horario de Atención</h6>
                  <p className="text-muted mb-0">
                    Lunes a Viernes: 09:00 - 18:30<br />
                    Sábados: 09:00 - 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Formulario de Contacto */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm p-4">
              <h4 className="fw-bold mb-4">Envíanos un Mensaje</h4>

              {alerta && (
                <Alerta
                  tipo={alerta.tipo}
                  mensaje={alerta.texto}
                  onCerrar={() => setAlerta(null)}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombreContacto" className="form-label fw-bold">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreContacto"
                    placeholder="Ej: Juan Pérez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoContacto" className="form-label fw-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correoContacto"
                    placeholder="ejemplo@duoc.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="asuntoContacto" className="form-label fw-bold">
                    Asunto / Repuesto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="asuntoContacto"
                    placeholder="Ej: Consulta por Pastillas Brembo"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mensajeContacto" className="form-label fw-bold">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensajeContacto"
                    rows={4}
                    placeholder="Escribe tu consulta aquí..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-warning w-100 fw-bold py-2">
                  <i className="bi bi-send me-1"></i> Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contactos;
