class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `Tu Nombre es: ${this.nombre} ${this.apellido}`;
  }
  addMascota(nombreMascotas) {
    this.mascotas.push(nombreMascotas);
  }
  countMascotas() {
    return `tienes  ${this.mascotas.length} mascotas;`;
  }
  addBook(libro, escritoPor) {
    this.libros.push({ titulo: libro, autor: escritoPor });
  }
  getBookNames() {
    return `Tus libros son: ${this.libros.map((el) => el.titulo.toString())}`;
  }
}

let usuario1 = new Usuario("Jose", "Nava", [{ titulo: "Así habló Zaratustra", autor: "Friedrich Nietzsche" }], ["rayo", "moco"]);

let nombreGenerado = usuario1.getFullName();
usuario1.addMascota("rocky");
let contador = usuario1.countMascotas();
usuario1.addBook("ventajas de ser invicible", "Stephen Chbosky");
let titulosLibros = usuario1.getBookNames();

console.log(nombreGenerado);
console.log(contador);
console.log(titulosLibros);
