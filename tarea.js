// Clase Tarea
class Tarea {
  constructor(id, titulo, descripcion, estado, prioridad, fechaEntrega) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.prioridad = prioridad;
    this.fechaEntrega = fechaEntrega;
  }
}

// Clase ServicioTareas
class ServicioTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
  }

  obtenerTodasLasTareas() {
    return this.tareas;
  }

  obtenerTareasPorEstado(estado) {
    return this.tareas.filter((tarea) => tarea.estado === estado);
  }

  obtenerTareasPorPrioridad(prioridad) {
    return this.tareas.filter((tarea) => tarea.prioridad === prioridad);
  }

  actualizarTarea(id, nuevaTarea) {
    const tareaIndex = this.tareas.findIndex((tarea) => tarea.id === id);
    if (tareaIndex !== -1) {
      this.tareas[tareaIndex] = nuevaTarea;
    }
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }
}

// Función para mostrar el menú
function mostrarMenu() {
  console.log("---------------------------");
  console.log("Gestión de Tareas");
  console.log("---------------------------");
  console.log("1. Agregar una nueva tarea");
  console.log("2. Mostrar todas las tareas");
  console.log("3. Mostrar tareas por estado");
  console.log("4. Mostrar tareas por prioridad");
  console.log("5. Actualizar una tarea");
  console.log("6. Eliminar una tarea");
  console.log("7. Salir");
  console.log("---------------------------");
}

// Función para leer una entrada desde la consola
function leerEntrada(mensaje) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(mensaje, (entrada) => {
      resolve(entrada);
      readline.close();
    });
  });
}

// Función principal
async function gestionarTareas() {
  const servicioTareas = new ServicioTareas();
  let salir = false;

  while (!salir) {
    mostrarMenu();
    const opcion = await leerEntrada("Selecciona una opción: ");

    switch (opcion) {
      case "1":
        console.log("\n--- Agregar una nueva tarea ---\n");

        const id = new Date().getTime();
        const titulo = await leerEntrada("Título: ");
        const descripcion = await leerEntrada("Descripción: ");
        const estado = await leerEntrada("Estado: ");
        const prioridad = await leerEntrada("Prioridad: ");
        const fechaEntrega = await leerEntrada(
          "Fecha de entrega (YYYY-MM-DD): "
        );
        const nuevaTarea = new Tarea(
          id,
          titulo,
          descripcion,
          estado,
          prioridad,
          new Date(fechaEntrega)
        );

        servicioTareas.agregarTarea(nuevaTarea);
        console.log("\nTarea agregada con éxito.\n");
        break;

      case "2":
        console.log("\n--- Mostrar todas las tareas ---\n");
        const todasLasTareas = servicioTareas.obtenerTodasLasTareas();

        if (todasLasTareas.length === 0) {
          console.log("No hay tareas registradas.\n");
        } else {
          todasLasTareas.forEach((tarea) => {
            console.log("ID:", tarea.id);
            console.log("Título:", tarea.titulo);
            console.log("Descripción:", tarea.descripcion);
            console.log("Estado:", tarea.estado);
            console.log("Prioridad:", tarea.prioridad);
            console.log("Fecha de entrega:", tarea.fechaEntrega.toDateString());
            console.log("---------------------------");
          });
        }
        break;

      case "3":
        console.log("\n--- Mostrar tareas por estado ---\n");
        const estadoFiltrar = await leerEntrada("Estado: ");
        const tareasPorEstado =
          servicioTareas.obtenerTareasPorEstado(estadoFiltrar);

        if (tareasPorEstado.length === 0) {
          console.log("No hay tareas con ese estado.\n");
        } else {
          tareasPorEstado.forEach((tarea) => {
            console.log("ID:", tarea.id);
            console.log("Título:", tarea.titulo);
            console.log("Descripción:", tarea.descripcion);
            console.log("Estado:", tarea.estado);
            console.log("Prioridad:", tarea.prioridad);
            console.log("Fecha de entrega:", tarea.fechaEntrega.toDateString());
            console.log("---------------------------");
          });
        }
        break;

      case "4":
        console.log("\n--- Mostrar tareas por prioridad ---\n");
        const prioridadFiltrar = await leerEntrada("Prioridad: ");
        const tareasPorPrioridad =
          servicioTareas.obtenerTareasPorPrioridad(prioridadFiltrar);

        if (tareasPorPrioridad.length === 0) {
          console.log("No hay tareas con esa prioridad.\n");
        } else {
          tareasPorPrioridad.forEach((tarea) => {
            console.log("ID:", tarea.id);
            console.log("Título:", tarea.titulo);
            console.log("Descripción:", tarea.descripcion);
            console.log("Estado:", tarea.estado);
            console.log("Prioridad:", tarea.prioridad);
            console.log("Fecha de entrega:", tarea.fechaEntrega.toDateString());
            console.log("---------------------------");
          });
        }
        break;

      case "5":
        console.log("\n--- Actualizar una tarea ---\n");
        const idActualizar = await leerEntrada("ID de la tarea a actualizar: ");
        const tareaExistente = servicioTareas
          .obtenerTodasLasTareas()
          .find((tarea) => tarea.id === parseInt(idActualizar));

        if (tareaExistente) {
          const nuevoTitulo = await leerEntrada("Nuevo título: ");
          const nuevaDescripcion = await leerEntrada("Nueva descripción: ");
          const nuevoEstado = await leerEntrada("Nuevo estado: ");
          const nuevaPrioridad = await leerEntrada("Nueva prioridad: ");
          const nuevaFechaEntrega = await leerEntrada(
            "Nueva fecha de entrega (YYYY-MM-DD): "
          );

          const nuevaTareaActualizada = new Tarea(
            tareaExistente.id,
            nuevoTitulo,
            nuevaDescripcion,
            nuevoEstado,
            nuevaPrioridad,
            new Date(nuevaFechaEntrega)
          );

          servicioTareas.actualizarTarea(
            tareaExistente.id,
            nuevaTareaActualizada
          );
          console.log("\nTarea actualizada conéxito.\n");
        } else {
          console.log("\nNo se encontró ninguna tarea con ese ID.\n");
        }
        break;

      case "6":
        console.log("\n--- Eliminar una tarea ---\n");
        const idEliminar = await leerEntrada("ID de la tarea a eliminar: ");
        const tareaEliminar = servicioTareas
          .obtenerTodasLasTareas()
          .find((tarea) => tarea.id === parseInt(idEliminar));

        if (tareaEliminar) {
          servicioTareas.eliminarTarea(tareaEliminar.id);
          console.log("\nTarea eliminada con éxito.\n");
        } else {
          console.log("\nNo se encontró ninguna tarea con ese ID.\n");
        }
        break;

      case "7":
        salir = true;
        console.log("\nSaliendo de la aplicación...\n");
        break;

      default:
        console.log("\nOpción no válida. Inténtalo de nuevo.\n");
        break;
    }
  }
}

// Ejecutar la aplicación
gestionarTareas();
