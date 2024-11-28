import { Doctor } from './Doctor';

export class Pediatra extends Doctor {
  constructor(nombre, experiencia) {
    super(nombre, 'Pediatra', experiencia, 20000);
  }

  mostarDatos() {
    console.log(
      `Pediatra. Nombre: ${this.nombre}, Especialidad: ${this.especialidad}, Experiencia: ${this._experiencia}`
    );
  }
}
