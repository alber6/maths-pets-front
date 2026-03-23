import React, { useContext } from "react";
import { GameContext } from "../context/GameContext"
import { POKEDEX } from "/src/utils/pokedex"

const Header = () => {

    const { mascotaGlobal, nivel, xp } = useContext(GameContext);

    //todo esto para conseguir el nombre del pokemon y poder añadirlo en el header
    let nombreMascota = ""
    if (mascotaGlobal) {
        const lineaEvolutiva = POKEDEX[mascotaGlobal]

        const faseActual = lineaEvolutiva.slice().reverse().find(poke => nivel >= poke.nivelReq);
        nombreMascota = faseActual.nombre;
    }

    return (
        <header>
            <h1>MathsPets 🐾</h1>
            {mascotaGlobal && (
                <div className="datosPet">
                    <p>Nivel: {nivel}</p>
                    <p>{nombreMascota}</p>
                    <p>{xp}xp</p>
                      {/*  */}
                    <progress value={xp} max="100"></progress>
                </div>
            )} 
        </header>
    )
};

export default Header;