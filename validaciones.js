// Función para validar el RUT chileno (Módulo 11)
function validarRUT(rut) {
    var valor = rut.trim().toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(valor) || valor.length < 7 || valor.length > 9) return false;
    
    var cuerpo = valor.slice(0, -1), dv = valor.slice(-1), suma = 0, multiplo = 2;
    for (var i = 1; i <= cuerpo.length; i++) {
        suma += multiplo * valor.charAt(cuerpo.length - i);
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    var dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();
    return dv === dvEsperado;
}

// Función para validar dominios permitidos de correo
function validarCorreoDominio(correo) {
    return ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'].some(d => correo.endsWith(d));
}

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Validar todos los RUT automáticamente
    document.querySelectorAll('input[id*="rut"]').forEach(input => {
        input.addEventListener('input', function() {
            this.setCustomValidity(validarRUT(this.value) ? '' : 'RUT inválido. Debe ser sin puntos ni guion (Ej: 19011022K)');
        });
    });

    // 2. Validar todos los correos automáticamente (Dominios y Coincidencias)
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('input', function() {
            // Validar dominio
            this.setCustomValidity(validarCorreoDominio(this.value) ? '' : 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
            
            // Validar coincidencia si es parte del registro
            let confirm = document.getElementById('confirmarCorreo');
            let original = document.getElementById('correo');
            if (confirm && original && (this.id === 'correo' || this.id === 'confirmarCorreo')) {
                confirm.setCustomValidity(original.value === confirm.value ? '' : 'Los correos no coinciden.');
            }
        });
    });

    // 3. Validar todas las contraseñas (Coincidencias)
    document.querySelectorAll('input[type="password"]').forEach(input => {
        input.addEventListener('input', function() {
            let confirm = document.getElementById('confirmarContrasena');
            let original = document.getElementById('contrasena');
            if (confirm && original) {
                confirm.setCustomValidity(original.value === confirm.value ? '' : 'Las contraseñas no coinciden.');
            }
        });
    });

    // 4. Validar Fecha de Nacimiento
    document.querySelectorAll('#fechaNacimiento').forEach(input => {
        input.addEventListener('input', function() {
            let v = this.value;
            if (v.match(/^\d{2}$/) || v.match(/^\d{2}\-\d{2}$/)) this.value = v + '-';
            
            let regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/;
            this.setCustomValidity(this.value.length === 10 && regex.test(this.value) ? '' : 'Formato inválido. Usa DD-MM-AAAA.');
        });
    });

    // 5. Mostrar alertas al enviar
    document.querySelectorAll('.needs-validation').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.classList.add('was-validated');
            let alerta = document.getElementById('alerta-formulario');
            
            if (!form.checkValidity()) {
                if (alerta) alerta.innerHTML = '<div class="alert alert-danger">Error: Por favor revisa los campos en rojo.</div>';
            } else {
                if (alerta) {
                    let msj = form.id === 'form-login' ? '¡Inicio de sesión exitoso!' : 
                             (form.id === 'form-contacto' ? '¡Mensaje enviado correctamente!' : '¡Usuario registrado correctamente!');
                    alerta.innerHTML = '<div class="alert alert-success">' + msj + '</div>';
                    form.reset();
                    form.classList.remove('was-validated');
                }
            }
        });
    });

});
