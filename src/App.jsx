import { useEffect, useState } from "react";

const tipos = {

  artifacts:"Artefactos",
  boss:"Jefes",
  characters:"Personajes",
  consumables:"Consumibles",
  domains:"Dominios",
  elements:"Elementos",
  enemies:"Enemigos",
  materials:"Materiales",
  nations:"Naciones",
  weapons:"Armas",

};

function App (){

  //almacenar el contenido en un use state
  const [genshinState, setGenshinState] = useState({
    types: [],
  });
  
  //solicitud de la api paea guardar en una variable "fetch"
  //funcion asincrona
  const fetchGenshinApi = async (item, url = "https://api.genshin.dev/") => {
    
    const respuesta = await fetch(url);
    const respJson = await respuesta.json();
    if (item === "types") {
    setGenshinState({
      ...genshinState,
      types: respJson.types,
    });
  } else{
    setGenshinState({
      ...genshinState,
      [item]: respJson,
     });
    }
    console.log(respJson);
  };

  useEffect(() => {

    fetchGenshinApi("types");
  }, []);

  const handleChangeType = ({target}) => {
    const url= `https://api.genshin.dev/${target.value}`;
  fetchGenshinApi(target.value, url);
  console.log(genshinState);
  };

  return (
  <div className="App">
    <h1> GENSHI </h1>
    <hr />
    <select name="types" onChange={handleChangeType}>
      <option value="">Seleccione un elemeto</option> 
      {genshinState.types.map((type)=> (
        <option 
          key={type} 
          value={type}>
          {tipos[type]}
          </option>
      ))}
    </select>

    {
      //creacion del segundo menu para artefactos
      genshinState.artifacts && <select name="artifacts">
        <option value="">Selecciona un set de artefactos</option>
        {genshinState.artifacts.map((artifact)=> (
          <option key={artifact} value={artifact}>
            {artifact}
          </option>
        ))}
      </select>
    }
  </div>
  ); 
}


export default App;