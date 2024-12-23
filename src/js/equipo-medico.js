// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { doctors } from './data/doctors';
import { services } from './data/services';
import { Doctor } from './classes/Doctor';
import { Pediatra } from './classes/Pediatra';
import { Cirujano } from './classes/Cirujano';
import { Paciente } from './classes/Paciente';

function fixIndex() {
  const btns = document.querySelectorAll('.doctors-row .btn-close');

  btns.forEach((btn, index) => {
    btn.setAttribute('data-index', index);
  });
}

function removeDoctor(event) {
  event.stopPropagation();
  const index = event.target.getAttribute('data-index');

  doctors.splice(index, 1);

  const btn = event.target;

  btn.parentElement.parentElement.parentElement.parentElement.remove();

  fixIndex();
}

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

console.log('Ordernando doctores por años de experiencia');
sortByFn(doctors, (a, b) => b.experience - a.experience);

const dr = new Doctor('Dr. Juan', 'Cardiologo', 10, 30000);

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);

dr.experiencia = 15;

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);

dr.mostarDatos();

dr.agregarPaciente(new Paciente('Paciente 1'));
dr.agregarPaciente(new Paciente('Paciente 2'));
dr.agregarPaciente(new Paciente('Paciente 3'));

console.log(`Total de ingresos del ${dr.nombre}: ${dr.totalIngresos()}`);

const pediatra = new Pediatra('Dr. Andres', 5);

pediatra.mostarDatos();

const cirujano = new Cirujano('Dr. Jorge', 10);

cirujano.mostarDatos();

const listaPolimorfica = [dr, pediatra, cirujano];

listaPolimorfica.forEach((el) => {
  el.mostarDatos();
});

window.removeDoctor = removeDoctor;

function generateDoctorCard(doctor, index) {
  const {
    image,
    name,
    description,
    experience,
    available,
    contacto: { telefono, email },
    horarios,
    especialidad,
  } = doctor;

  console.log(doctor);
  console.log(doctor.contacto);

  return `
    <div class="col-3 mb-5">
      <div class="card text-center">
        <img src="${image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <h5 class="text-muted"> ${especialidad}</h5>
          <p class="card-text">
            ${description}
            <br>
            <strong>${experience}</strong> años de experiencia
            <br>
            Telefono: ${telefono}
            <br>
            Email: ${email}
            <br>
            Horario: ${horarios.join(', ')}
            <br>
            <strong>${
              available ? 'Disponible' : 'No disponible'
            }</strong><button type="button" class="btn-close remove-doctor" aria-label="Close" data-index="${index}" onclick="removeDoctor(event)"></button>
          </p>
        </div>
      </div>
    </div>`;
}

function renderDoctors(docs) {
  const doctorsElement = document.querySelector('.doctors-row');

  let doctorsHtmlContent = '';

  docs.forEach((doc) => {
    const {
      image,
      name,
      description,
      experience,
      available,
      contacto,
      horarios,
      especialidad,
    } = doc;
    const index = doctors.indexOf(doc);

    doctorsHtmlContent += generateDoctorCard(
      {
        image,
        name,
        description,
        experience,
        available,
        contacto,
        horarios,
        especialidad,
      },
      index
    );
  });

  doctorsElement.innerHTML = doctorsHtmlContent;
}

console.log('equipo-medico');

renderDoctors(doctors);

const clonedDocs = JSON.parse(JSON.stringify(doctors));
clonedDocs[0].name = 'Doctor Modificado';
console.log('Cloned docs', clonedDocs);
console.log('Original docs', doctors);

console.log(
  'doctor original',
  doctors[0].name,
  'doctor clonado',
  clonedDocs[0].name
);

const mergedData = [...doctors, ...services];

console.log('Merged docs', mergedData);

for (const merged of mergedData) {
  console.log('Datos mergeados', merged);
}

console.log('Objeto serializado', JSON.stringify(mergedData));

const searchText = document.querySelector('.search-box');

searchText.addEventListener('keyup', (event) => {
  try {
    const searchTerm = event.target.value.trim();

    const filteredDoctors = doctors.filter(
      ({ name, description, especialidad }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderDoctors(filteredDoctors);
  } catch (error) {
    alert(`Error al buscar: ${error.message}`);
  }
});

const showModal = document.querySelector('#modal-doctor');
const doctorModal = new bootstrap.Modal('#agregar-doctor-modal');

showModal.addEventListener('click', () => {
  const modalInputs = document.querySelectorAll('#agregar-doctor-modal input');
  modalInputs.forEach((input) => (input.value = ''));
  document.querySelector('#disponibilidad-doctor').value = 'disponible';
  document
    .querySelectorAll('#agregar-doctor-modal span')
    .forEach((el) => (el.innerText = ''));

  doctorModal.show();
});

const btnAddDoctor = document.querySelector('#btn-agregar-doctor');

btnAddDoctor.addEventListener('click', () => {
  const modalInputs = document.querySelectorAll('#agregar-doctor-modal input');
  let hasError = false;

  for (const modalInput of modalInputs) {
    const regexValidation = modalInput.getAttribute('data-regex');
    const regex = new RegExp(regexValidation);
    const errorMessage = modalInput.parentElement.querySelector('span');

    if (!regex.test(modalInput.value)) {
      errorMessage.innerText = 'Campo inválido';
      hasError = true;
    } else {
      errorMessage.innerText = '';
    }
  }

  if (hasError) {
    return;
  }

  const doctor = {};

  modalInputs.forEach((input) => {
    const field = input.getAttribute('data-field');

    if (field.includes('.')) {
      const [attrA, attrB] = field.split('.');
      if (!doctor[attrA]) {
        doctor[attrA] = {};
      }

      doctor[attrA][attrB] = input.value;
    } else if (
      field.includes('horario-inicio') ||
      field.includes('horario-termino')
    ) {
      if (!doctor.horarios) {
        doctor.horarios = [];
      }

      doctor.horarios.push(input.value);
    } else {
      doctor[field] = input.value;
    }

    console.log('DOCTOR', doctor);
  });

  const available = document.querySelector('#disponibilidad-doctor').value;
  const spec = document.querySelector('#especialidad-doctor').value;

  console.log(available);

  doctor.experience = Number(doctor.experience);
  doctor.available = available === 'disponible';
  doctor.especialidad = spec;
  doctor.image = 'img/doc-1.png';

  console.log('Doctor a agregar', doctor);

  doctors.push(doctor);

  document.querySelector('.doctors-row').innerHTML += generateDoctorCard(
    doctor,
    doctors.length - 1
  );

  doctorModal.hide();
});

const btnSortExp = document.querySelector('#sort-exp');

let sortByExp = false;
let sortByName = false;

btnSortExp.addEventListener('click', () => {
  sortByExp = !sortByExp;
  const icon = document.querySelector('#iconoExperiencia');

  if (sortByExp) {
    sortByFn(doctors, (a, b) => b.experience - a.experience);
    icon.classList.remove('bx-up-arrow-alt');
    icon.classList.add('bx-down-arrow-alt');
  } else {
    sortByFn(doctors, (a, b) => a.experience - b.experience);
    icon.classList.remove('bx-down-arrow-alt');
    icon.classList.add('bx-up-arrow-alt');
  }

  renderDoctors(doctors);
});

const btnSortName = document.querySelector('#sort-name');

btnSortName.addEventListener('click', () => {
  sortByName = !sortByName;
  const icon = document.querySelector('#iconoNombre');

  if (sortByName) {
    sortByFn(doctors, (a, b) => (b.name < a.name ? 1 : -1));
    icon.classList.remove('bx-up-arrow-alt');
    icon.classList.add('bx-down-arrow-alt');
  } else {
    sortByFn(doctors, (a, b) => (a.name < b.name ? 1 : -1));
    icon.classList.remove('bx-down-arrow-alt');
    icon.classList.add('bx-up-arrow-alt');
  }

  renderDoctors(doctors);
});
