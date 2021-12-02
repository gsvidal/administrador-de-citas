// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo citas
  const [ citas, guardarCitas ] = React.useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  React.useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);
  // optional Use Effect
  // React.useEffect(() => {
  //     localStorage.setItem("citas", JSON.stringify(citas));
  // }, [citas]);

  //  Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ])
  }
  
  // Funcion que elimina una cita por su ID
  const eliminarCita = (id) => {
    const citasRestantes = citas.filter(cita => cita.id !== id);
    guardarCitas(citasRestantes);
  }

  // Mensaje condicional para el titulo
  const titulo = citas.length === 0 ? "No hay citas programadas" : "Citas Programadas"

  return (
    <React.Fragment>
      <h1>Administrador de citas</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            { citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default App;
