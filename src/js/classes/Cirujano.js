import { Doctor } from './Doctor';

export class Cirujano extends Doctor {
  constructor(nombre, experiencia) {
    super(nombre, 'Cirujano', experiencia, 25000);
  }

  mostarDatos() {
    console.log(
      `Cirujano. Nombre: ${this.nombre}, Especialidad: ${this.especialidad}, Experiencia: ${this._experiencia}`
    );
  }

  operacionesRealizadas() {
    console.log(
      `Operaciones realizadas del cirujano ${this.nombre} (${this.pacienes.length})`
    );
    this.pacienes.forEach(({ nombre }) => {
      console.log(nombre);
    });
  }
}
