function Banner() {
  return (
    <div
      className="p-4 p-md-5 mb-4 text-white rounded bg-dark"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/AutoInicio.jpg') center/cover",
      }}
    >
      <div className="col-md-6 px-0">
        <h1 className="display-4 fw-bold">Descuentos Explosivos</h1>
        <p className="lead my-3">
          Hasta un 40% de descuento en pastillas de freno y discos para todas las marcas. ¡Prepara tu auto para el viaje seguro!
        </p>
      </div>
    </div>
  )
}

export default Banner
