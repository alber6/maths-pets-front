import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import './Home.css';

const Home = () => {
    //con esto vemos si hay alguna mascota guardada o no, para seguir con el juego o empezar uno nuevo
    const { mascotaGlobal, reinicioPartida } = useContext(GameContext)

    return (
        <div className="home">
            <h1>Bienvenido a MathPets</h1>
            <p>Interacciona y enseña a tu nueva mascotas las matematicas para que aprenda un montón</p>
            {/* Si hay mascota guardada en el localstorage se sigue la aventura sino se empieza una nueva */}
            {mascotaGlobal ? (
                <div className="botones">
                    <Link to ="dashboard" >
                        <button>Seguir aventura</button>
                    </Link>
                    <hr></hr>
                    <button onClick={reinicioPartida}>
                        Borrar partida
                    </button>

                </div>
            ) :
                <Link to ="choose" >
                    <button>Empezar aventura</button>
                </Link>
            }
                </div>
    )
};

export default Home;