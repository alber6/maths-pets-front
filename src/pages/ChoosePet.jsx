import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import "./ChoosePet.css"

import eggPlant from '../assets/eggPlant.png';
import eggWater from '../assets/eggWater.png'; 
import eggFire from '../assets/eggFire.png'; 

const ChoosePet = () => {
        const navigate = useNavigate()
        const [ mascotaSeleccionada, setMascotaSeleccionada] = useState(null)
        
       // coger la función para guardar los datos
        const { setMascotaGlobal } = useContext(GameContext)
        
        const confirmarEleccion = () => {
            if (!mascotaSeleccionada) return; 

            // Metemos la mascota elegida en la mochila global
            setMascotaGlobal(mascotaSeleccionada);
          
            // vamos a Dashboard
            navigate('/dashboard');
        }

    return (
        <div className="choose">
            <h2>¡Elige la mascota que quieras!</h2>
            <div className="botones">
                <div className="eggCard">
                    <button 
                    // usar un ternario para dejar seleccionado el boton
                    className={`btn-juego ${mascotaSeleccionada === 'Agua' ? 'seleccionado' : ''}`} 
                    onClick={() => setMascotaSeleccionada('Agua')}
                    >
                    Agua 💧
                    </button>
                <img src={eggWater} alt="Huevo de Agua" />
                </div>
                <div className="eggCard">
                    <button className={`btn-juego ${mascotaSeleccionada === 'Fuego' ? 'seleccionado' : ''}`} 
                    onClick={() => setMascotaSeleccionada('Fuego')}>Fuego 🔥</button>
                 <img src={eggFire} alt="Huevo de Fuego" />
                </div>
                <div className="eggCard">
                    <button className={`btn-juego ${mascotaSeleccionada === 'Planta' ? 'seleccionado' : ''}`} 
                    onClick={() => setMascotaSeleccionada('Planta')}>Planta 🌱</button>
                    <img src={eggPlant} alt="Huevo de Planta" />
                </div>
            </div>
            {mascotaSeleccionada && (
                <div className="buttonConfirmado">
                    <p>{`Has elegido el huevo de ${mascotaSeleccionada} ¿Estás seguro?`}</p>
                    <button onClick={confirmarEleccion}>Adoptar y empezar</button>
                </div>
            )}
        </div>
    )
};

export default ChoosePet;