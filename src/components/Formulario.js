import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  // Crear State de Citas
  const [ cita, actualizarCita ] = useState({
    mascota: "",
    owner: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  const [ error, actualizarError ] = useState(false);

  // Funcion que se ejectura cada que el usuario escribe en un input
  const handleChange = (event) => {
    actualizarCita({
      ...cita,
      [event.target.name]: event.target.value 
    })
  }

  // Extraer los valores
  const { mascota, owner, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona Agregar cita
  const submitCita = (event) => {
    event.preventDefault();
    
    // Validación de campos vacíos para formularios
    if(mascota.trim() === "" || owner.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
      actualizarError(true);
      return;
    }

    //Eliminar el mensaje previo
    actualizarError(false);

    // Asignar un ID
    cita["id"] = uuidv4();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    actualizarCita({
      mascota: "",
      owner: "",
      fecha: "",
      hora: "",
      sintomas: ""
    })

  }

  return(
    <Fragment>
      <h2>Crear Cita</h2>

      { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

      <form
        action=""
        onSubmit={submitCita}
        >
        <label htmlFor="">Nombre Mascota</label>
        <input 
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={mascota}
        />
        
        <label htmlFor="">Nombre del dueño</label>
        <input 
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Nombre del dueño"
          onChange={handleChange}
          value={owner}
        />
        
        <label htmlFor="">Fecha</label>
        <input 
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />
        
        <label htmlFor="">Hora</label>
        <input 
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />
        
        <label htmlFor="">Sintomas</label>
        <textarea name="sintomas" id="" cols="30" rows="10"
          className="u-full-width"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Cita
        </button>
        
      </form>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;