# Modulo 3 Evaluación grupal

## Descripción
El objetivo de este Aprendizaje Basado en Proyectos es que los estudiantes integren todos
los conceptos avanzados de JavaScript para mejorar y completar el sitio web del hospital.
Deberán demostrar habilidades en la manipulación de datos, el uso de algoritmos y estructuras
de datos, y la aplicación de programación funcional, asincrónica y orientada a objetos.

## Acceso al proyecto
Este proyecto utiliza Webpack como empaquetador de módulos para compilar y gestionar los archivos del proyecto.

  Si tienes Git instalado en tu máquina, puedes clonar el repositorio usando el siguiente comando en tu terminal o línea de comandos:

  ```
  git clone https://github.com/pedroguerrero/abpro.git
  ```
 
  Instalar dependencias: Una vez dentro del proyecto, instala las dependencias utilizando 

  ```
  npm install
  ```
  Para iniciar el servidor de desarrollo con Webpack, ejecuta el siguiente comando:
  
  ```
  npm run start
  ```

## Autores

- Pedro Guerrero
- Bastian Ortega
- Nadja Villarroel

## Manipulación de Datos con JSON y Simulación de API REST

```
async function getDoctors(cbError) {
  try {
    const doctorsUrl = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get(doctorsUrl);

    return data;
  } catch (error) {
    cbError('Error al cargar la lista de doctores');

    return [];
  }
}
```

### Clonación

```
const clonedDocs = JSON.parse(JSON.stringify(doctors));
```

### Fusión (merge)

```
const mergedData = [...doctors, ...services];
```

### Recorrido

Se utilizaron varios tipos de recorridos de arreglos como por ejemplo utilizando el metodo **forEach**

```
listaPolimorfica.forEach((el) => {
  el.mostarDatos();
});
```

La iteracion a traves de un for

```
for (const merged of mergedData) {
  console.log('Datos mergeados', merged);
}
```

## Implementación de Algoritmos y Estructuras de Datos

```
// ordenar data por la funcion pasada
function sortByFn(data, fn) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (fn(data[i], data[j]) > 0) {
        [data[i], data[j]] = [data[j], data[i]];
      } else if (fn(data[j], data[i]) < 0) {
        [data[j], data[i]] = [data[i], data[j]];
      }
    }
  }
}
```

### Pilas

```
export class Stack {
  data = [];

  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  isEmpty() {
    return this.data.length === 0;
  }
}
```

### Colas

```
export class Queue {
  queue = [];

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  length() {
    return this.queue.length;
  }
}

```

## Implementación de Algoritmos y Estructuras de Datos

### Currying

```
const calculateCost = (price) => (qty) => price * qty;
```

### Composición de funciones

```
function generatePrice() {
  return Math.floor(Math.random() * 10000 + 15000);
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function discountByFn(price, discountFn) {
  return price - discountFn();
}

function discountByPercentage(price, percentage) {
  return () => Math.floor(price * percentage);
}
```

### Recursión

```
function calculateTotalHours(doctors, doctorList) {
  if (doctorList.length === 0) {
    return;
  }

  const [doctor, ...rest] = doctorList;

  if (!(doctor in doctors)) {
    doctors[doctor] = 0;
  }

  doctors[doctor] += 1;

  return calculateTotalHours(doctors, rest);
}
```

## Programación Orientada a Objetos

### Clase Doctor

```
export class Doctor {
  constructor(nombre, especialidad, experiencia, precioConsulta) {
    this.nombre = nombre;
    this.especialidad = especialidad;
    this._experiencia = experiencia;
    this.precioConsulta = precioConsulta;
    this.pacienes = [];
  }

  mostarDatos() {
    console.log(
      `Dr. Nombre: ${this.nombre}, Especialidad: ${this.especialidad}, Experiencia: ${this._experiencia}`
    );
  }

  agregarPaciente(paciente) {
    this.pacienes.push(paciente);
  }

  mostrarPacientes() {
    console.log(`Pacientes del doctor ${this.nombre}`);
    this.pacienes.forEach(({ nombre }) => {
      console.log(nombre);
    });
  }

  get experiencia() {
    return this._experiencia;
  }

  set experiencia(experience) {
    this._experiencia = experience;
  }

  totalIngresos() {
    return this.pacienes.length * this.precioConsulta;
  }
}
```

### Herencia

```
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

```

### Polimorfismo

```
const dr = new Doctor('Dr. Juan', 'Cardiologo', 10, 30000);

const pediatra = new Pediatra('Dr. Andres', 5);

const cirujano = new Cirujano('Dr. Jorge', 10);

const listaPolimorfica = [dr, pediatra, cirujano];

listaPolimorfica.forEach((el) => {
  el.mostarDatos();
});
```

## Programación Asíncrona y Eventos

### Integra programación asíncrona utilizando async/await y promesas

```
async function getDoctors(cbError) {
  try {
    const doctorsUrl = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get(doctorsUrl);

    return data;
  } catch (error) {
    cbError('Error al cargar la lista de doctores');

    return [];
  }
}
```

### Event listeners

```

// disparar evento
const customEvent = new CustomEvent('newPatient', {
  detail: patient,
});

// agregar listener para el evento
document.addEventListener('newPatient', (event) => {
  const message = document.querySelector('#new-patient-alert');
  const {
    detail: { name, doctorName },
  } = event;
  ...
});
```
