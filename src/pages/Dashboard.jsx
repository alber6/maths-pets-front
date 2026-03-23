import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { GameContext } from "../context/GameContext";
import { useMathsEngine } from "../hooks/useMathsEngine";

import "./Dashboard.css"
import { Link } from "react-router-dom";
import { POKEDEX } from "/src/utils/pokedex.js"

// todo el juego ocurre aquí, aparece la mascota, el nivel, las operaciones y el form
const Dashboard = () => {
    const { mascotaGlobal, xp, nivel, ganarExperiencia } = useContext(GameContext);
    const { num1, num2, nuevasSumas, comprobarResultado } = useMathsEngine();

    //el formulario
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // estados para guardar los datos que vamos a recoger de la api
    const [ datosMascota, setDatosMascota ] = useState(null);

    const [mensajeFeedback, setMensajeFeedback] = useState('');
    
    //como useEffec hace que se ejecute nuevasSumas cada vez que esta función cambia, necesitamos que la función nuevasSumas tenga un useCallback para memorizar la función y no se ejecute todo el rato.
    useEffect(() => {
        nuevasSumas()
    }, [nuevasSumas])

useEffect(() => {
    if (!mascotaGlobal) return;

    const lineaEvolutiva = POKEDEX[mascotaGlobal];
    const faseActual = lineaEvolutiva.slice().reverse().find(poke => nivel >= poke.nivelReq);

    fetch(`https://pokeapi.co/api/v2/pokemon/${faseActual.id}`)
      .then(respuesta => respuesta.json())
      .then(datosAPI => {
        setDatosMascota({
          nombre: faseActual.nombre,
          imagen: datosAPI.sprites.other['official-artwork'].front_default
        });
      });
  }, [nivel, mascotaGlobal]);
   
    // --- COMO FUNCIONA EL JUEGO ---
    const alEnviarRespuesta = (datosDelFormulario) => {
    // Comprobamos si acertó
    const esCorrecto = comprobarResultado(datosDelFormulario.respuesta);
    console.log(datosDelFormulario.respuesta)

    if (esCorrecto) {
      setMensajeFeedback('¡Correcto! 🎉 +25 XP');
      ganarExperiencia(25); // Le damos 25 puntos
      nuevasSumas();   // Inventamos otra suma
      reset();          // Borramos lo que escribió para que la casilla quede limpia
    } else {
      setMensajeFeedback('Mmm... casi. ¡Vuelve a intentarlo! 💪');
      reset(); // Borramos para que lo intente de nuevo
    }

    // Borramos el mensaje a los 2 segundos para que no se quede ahí para siempre
    setTimeout(() => setMensajeFeedback(''), 2000);
  };

    return (
        <div className="dashboard">
            <h2>Centro de Entrenamiento</h2>
            <p>Has elegido tipo <strong>{mascotaGlobal}</strong></p>
        <div id="container-dashboard">
            <div id="petImg">
                <img className= { nivel === 2 || nivel === 3 ? "evolucion-animacion" : ""} 
                key={datosMascota?.nombre}
                // añadimos ? que significa que solo lea la imagen si datosmascota existe
                src={datosMascota?.imagen} 
                alt={datosMascota?.nombre} 
                />
            </div>

        {/* zona de juego -- form */}
            <div id="petInfo">
                <h3>{datosMascota?.nombre}</h3>
                <p>Nivel: {nivel} | XP: {xp}/100</p>
        {/* react-hook-form */}
                <form onSubmit={handleSubmit(alEnviarRespuesta)} id="form">
                    <div id="operation">
                         <p>{num1} + {num2} = </p>
                        <input 
                        type="number"
                        placeholder=" Num"
                        {...register("respuesta", { required: true })}
                    />
                    </div>
                    <button type="submit">Responder</button>
                </form>
            </div>
        </div>
        {/* Mensajes de error si intenta enviar vacío */}
        {errors.respuesta && <p>¡Debes escribir un número!</p>}
        
        {/* Mensaje de ¡Correcto! o ¡Fallo! */}
        {mensajeFeedback && (
          <p>{mensajeFeedback}</p>
        )}
        <div>
            <Link to ="/" >
                <button id="goToHome">Ir a inicio</button>
            </Link>
        </div>
        </div>
        
    );
}

export default Dashboard;