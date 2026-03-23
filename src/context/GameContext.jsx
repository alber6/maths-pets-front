import React, { createContext, useState, useEffect } from "react";

//DE MOMENTO NO LO VOY A EXPORTAR 
// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext();

// crear el provider que en el prop tendrá n elementos 
const GameProvider = ({ children }) => {

    // Aquí creamos el estado real que guardará los datos
    // aquí añadiremos más datos sobre la mascota como por ejemplo la experiencia (xp)
    const [ mascotaGlobal, setMascotaGlobal ] = useState(() => {
        const mascotaGuardada = localStorage.getItem('mascotaElegida');
        return mascotaGuardada ? mascotaGuardada : null;
    });

    const [ xp, setXp] = useState(() => {
        const xpGuardada = localStorage.getItem('mascotaXp')
        return xpGuardada ? parseInt(xpGuardada) : 0
        // parseInt() para que sume numeros y no un string con un numero, ya que xpGuardada viene como un string
    });

    const [ nivel, setNivel ] = useState(() => {
        const nivelGuardado = localStorage.getItem('mascotaNivel')
        return nivelGuardado ? parseInt(nivelGuardado) : 1
    })

    // usamos un useEffect por si el usuario elige otra mascota para que se cambie y no mantenga la mascota que eligió anteriormente. Guardado automático
    useEffect(() => {
        if (mascotaGlobal) {
            localStorage.setItem('mascotaElegida', mascotaGlobal);
        }
        // lo añadimos fuera del if porque desde el principio tienen un valor y no son nulos como la mascota que al inicio es null porque no se ha elegido la mascota
        localStorage.setItem('mascotaXp', xp)
        localStorage.setItem('mascotaNivel', nivel)
    }, [mascotaGlobal, xp, nivel]);

    // creamos una funcion para que se modifique el xp y el nivel para cuando el usuario acierte
    const ganarExperiencia = (puntosGanados) => {
        // NOTA DE ARQUITECTURA (React Strict Mode):
        // Nunca ejecutar un estado (setNivel) dentro de la función de otro estado (setXp(prev => ...)).
        // En desarrollo, React Strict Mode ejecuta esas funciones internas DOS VECES seguidas 
        // para detectar errores, lo que provocaba el bug de saltar del Nivel 1 al Nivel 3 (1+1+1).
        // SOLUCIÓN: Calculamos los valores primero y llamamos a los 'set' de forma independiente.
        const nuevaXp = xp + puntosGanados;

        //si sube de nivel
        if(nuevaXp >= 100){
            setNivel(nivel + 1)
            setXp( nuevaXp - 100)
        } else {
            setXp(nuevaXp);
        };
        // nunca meter un set dentro de otro set 
    }

    const reinicioPartida = () => {
        setMascotaGlobal(null);
        setXp(0);
        setNivel(1);
        localStorage.clear();
    }

    return (
    <GameContext.Provider value={{ mascotaGlobal, setMascotaGlobal, xp, nivel, ganarExperiencia, reinicioPartida }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;