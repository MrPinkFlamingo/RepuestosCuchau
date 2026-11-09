import { useState, type FormEvent } from 'react'

function Login() {
  // 1. Estados para los datos del formulario
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'success' | 'danger' } | null>(null)

  // 2. Función que maneja el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // Evita que la página se recargue

    // Validación de dominio (como en tu validaciones.js original)
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    const correoValido = dominiosPermitidos.some((dominio) => correo.endsWith(dominio))

    if (!correoValido) {
      setMensaje({
        texto: 'Error: Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com',
        tipo: 'danger',
      })
      return
    }

    if (password.trim() === '') {
      setMensaje({
        texto: 'Error: Debes ingresar tu contraseña',
        tipo: 'danger',
      })
      return
    }

    // Si todo está correcto
    setMensaje({
      texto: '¡Inicio de sesión exitoso! Bienvenido a Repuestos Cuchau.',
      tipo: 'success',
    })
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h3 className="custom-title text-center mb-4">Iniciar Sesión</h3>

              {/* Alerta dinámica si hay mensaje */}
              {mensaje && (
                <div className={`alert alert-${mensaje.tipo}`} role="alert">
                  {mensaje.texto}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Campo Correo */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@duoc.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                {/* Campo Contraseña */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Botón Enviar */}
                <button className="btn btn-custom-action w-100 mt-4 py-2" type="submit">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login