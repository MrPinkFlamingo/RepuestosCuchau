interface BannerProps {
  titulo?: string;
  subtitulo?: string;
  descuento?: string;
  imagenFondo?: string;
}

function Banner({
  titulo = "Descuentos Explosivos",
  subtitulo = "Hasta un 40% de descuento en pastillas de freno y discos para todas las marcas. ¡Prepara tu auto para el viaje seguro!",
  descuento,
  imagenFondo = "/img/AutoInicio.jpg",
}: BannerProps) {
  return (
    <div
      className="p-4 p-md-5 mb-4 text-white rounded bg-dark position-relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('${imagenFondo}') center/cover`,
        minHeight: "220px",
      }}
    >
      <div className="col-md-7 px-0">
        {descuento && (
          <span className="badge bg-danger mb-2 px-3 py-2 fs-6">
            <i className="bi bi-fire me-1"></i> {descuento}
          </span>
        )}
        <h1 className="display-4 fw-bold mb-2">{titulo}</h1>
        <p className="lead my-2">{subtitulo}</p>
      </div>
    </div>
  );
}

export default Banner;
