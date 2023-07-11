id = location.search.substr(4); // captura de la URL el id enviado desde productos.html

const { createApp } = Vue; //creo un objeto VUE llamdo createApp
createApp({
  data() {
    // define los datos de VUE
    return {
      url: "https://lisbetobispo.pythonanywhere.com/tareas/" + id,
      //datos: [],
      id: 0,
      titulo: "",
      prioridad: "",
      imagen: "",
    };
  },
  methods: {
    // define los métodos o funciones
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.titulo = data.titulo;
          this.prioridad = data.prioridad;
          this.imagen = data.imagen;
        })
        .catch((error) => alert("Ups... se produjo un error: " + error));
    },
    /* eliminar(id) {
      const url = this.url + "/" + id;
      var options = {
        method: 'DELETE',
      }
      fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
          alert("Registro Eliminado")
          location.reload();
        })


    },*/
    grabar() {
      let tarea = {
        titulo: this.titulo,
        prioridad: this.prioridad,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(tarea),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "./index.html"; // recarga productos.html
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar"); // puedo mostrar el error tambien
        });
    },
  },
  created() {
    // llama a los métodos que se tienen que ejecutar al inicio
    this.fetchData(this.url);
  },
}).mount("#app");
