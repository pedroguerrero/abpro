# Modulo 3 Evaluación grupal

## Autores
Pedro Guerrero
Bastian Ortega
Nadja Villarroel


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
  const [doctor, ...rest] = doctorList;
```

### Recorrido

```

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
  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  isEmpty() {
    return this.data.length === 0;
  }
```

### Colas

```
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
```

## Programación Orientada a Objetos

```
  constructor(nombre, especialidad, experiencia, precioConsulta) {
    this.nombre = nombre;
    this.especialidad = especialidad;
    this._experiencia = experiencia;  // Encapsulación
    this.precioConsulta = precioConsulta;
    this.pacienes = [];
  }
```


### Herencia

```
export class Pediatra extends Doctor {
  constructor(nombre, experiencia) {
    super(nombre, 'Pediatra', experiencia, 20000);
  }
}
```

### Polimorfismo

```
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
document.addEventListener('newPatient', (event) => {
  const message = document.querySelector('#new-patient-alert');
  const {
    detail: { name, doctorName },
  } = event;
```