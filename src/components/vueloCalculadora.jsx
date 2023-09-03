import React, { useState } from 'react';
import { vuelosData } from '../data/vueloData';

const VueloCalculadora = () => {
  const [ciudad, setCiudad] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [precioFinal, setPrecioFinal] = useState(null);
  const [impuestoPersona, setImpuestoPersona] = useState(0);
  const [precioBase, setPrecioBase] = useState(0);

  const [mostrarFormulario, setMostrarFormulario] = useState(true);

  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleCantidadPersonasChange = (e) => {
    setCantidadPersonas(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vueloSeleccionado = vuelosData.find((vuelo) => vuelo.ciudad === ciudad);

    if (vueloSeleccionado) {
      const { costos, tax } = vueloSeleccionado;
      let precio, porcentaje, costoBase = 0;

      if (cantidadPersonas === 1) {
        porcentaje = (tax * cantidadPersonas) / 100;
        costoBase = costos.precio1;
        precio = costoBase + costoBase * porcentaje;
      } else if (cantidadPersonas === 2) {
        porcentaje = (tax * cantidadPersonas) / 100;
        costoBase = costos.precio2;
        precio = costoBase + costoBase * porcentaje;
      } else if (cantidadPersonas >= 3 && cantidadPersonas <= 4) {
        porcentaje = (tax * cantidadPersonas) / 100;
        costoBase = costos.precio3;
        precio = costoBase + costoBase * porcentaje;
      } else if (cantidadPersonas >= 5) {
        porcentaje = (tax * cantidadPersonas) / 100;
        costoBase = costos.precio4;
        precio = costoBase + costoBase * porcentaje;
      }
      setPrecioBase(costoBase);
      setImpuestoPersona(porcentaje);
      setPrecioFinal(precio);
      setMostrarFormulario(false); 
    } else {
      setPrecioFinal(null);
    }
  };

  const mostrarFormularioHandler = () => {
    setMostrarFormulario(true); 
    setCiudad('');
    setCantidadPersonas(1);
    setPrecioFinal(null);
    setImpuestoPersona(0);
    setPrecioBase(0);
  };

  return (
    <div>
      {mostrarFormulario ? (
        <div className='reservarVuelo'>
          <h2>Reserva Vuelo</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="ciudad">Ciudad que desea Viajar:</label>
              <select id="ciudad" value={ciudad} onChange={handleCiudadChange}>
                <option value=''>Seleccione ciudad</option>
               
                {vuelosData.map((vuelo) => (
                  <option key={vuelo.ciudad} value={vuelo.ciudad}>
                    {vuelo.ciudad}
                  </option>
                ))}
              </select>
              { ciudad == ''  &&(
              <p style={{ color: 'red' }}>Por favor, seleccione una ciudad.</p>
            )}
            </div>
            <div>
              <label htmlFor="cantidadPersonas">Cantidad de Personas:</label>
              <input
                type="number"
                id="cantidadPersonas"
                min="1"
                value={cantidadPersonas}
                onChange={handleCantidadPersonasChange}
              />
            </div>
            <div>
              <button type="submit">Calcular Precio</button>
            </div>
          </form>
        </div>
      ) : (
        <div className='reservarVuelo'>
          <h2>Factura</h2>
          <p>Ciudad: {ciudad}</p>
          <p>Cantidad de Personas: {cantidadPersonas}</p>
          <p>Costo de paquete por persona: ${precioBase.toFixed(2)}</p>
          <p>Impuesto por persona: {(impuestoPersona * 100).toFixed(2)}%</p>
          <p>Precio Final: ${precioFinal.toFixed(2)}</p>
          <button onClick={mostrarFormularioHandler}>Volver a Ordenar</button>
        </div>
      )}
    </div>
  );
};

export default VueloCalculadora;

