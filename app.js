const form = document.getElementById("formReserva");
const tabla = document.getElementById("tablaReservas");

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

mostrarReservas();

// Fecha actual
const hoy = new Date();
hoy.setHours(0,0,0,0);

// Limitar fecha
const fechaInput = document.getElementById("fecha");
const fechaMin = new Date().toISOString().split("T")[0];
fechaInput.setAttribute("min", fechaMin);

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const cancha = document.getElementById("cancha").value;

  const fechaSeleccionada = new Date(fecha);
  fechaSeleccionada.setHours(0,0,0,0);

  if (fechaSeleccionada < hoy) {
    alert("No puedes usar fechas pasadas");
    return;
  }

  const repetida = reservas.some(r =>
    r.fecha === fecha &&
    r.hora === hora &&
    r.cancha === cancha
  );

  if (repetida) {
    alert("Ya existe esa reserva");
    return;
  }

  reservas.push({ nombre, fecha, hora, cancha });

  localStorage.setItem("reservas", JSON.stringify(reservas));

  mostrarReservas();
  form.reset();
});

function mostrarReservas() {
  tabla.innerHTML = "";

  reservas.forEach((r, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.fecha}</td>
        <td>${r.hora}</td>
        <td>Cancha ${r.cancha}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminar(${i})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  });
}

function eliminar(i) {
  reservas.splice(i, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarReservas();
}