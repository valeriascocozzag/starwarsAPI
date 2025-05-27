import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getElementIndex } from "../services/api.js";
import { fotosPersonajes, fotosPlanetas, fotosVehiculos } from "../assets/imagenes.jsx";

// Función para buscar imagen por nombre y tipo
const obtenerImagen = (name, tipo) => {
  let lista = [];
  if (tipo === "people") lista = fotosPersonajes;
  else if (tipo === "planets") lista = fotosPlanetas;
  else if (tipo === "vehicles") lista = fotosVehiculos;

  const found = lista.find((item) => item.name.toLowerCase() === name.toLowerCase());
  return found ? found.url : "https://via.placeholder.com/300x200?text=No+Image";
};

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [peopleList, setPeopleList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const handleGetLists = async () => {
      setPeopleList(await getElementIndex("people"));
      setVehicleList(await getElementIndex("vehicles"));
      setPlanetList(await getElementIndex("planets"));
    };
    handleGetLists();
  }, []);

  const renderCard = (element, tipo) => {
    const isFavorito = store.favorites?.some(
      fav => fav.uid === element.uid && fav.type === tipo
    );

    const toggleFavorito = () => {
      if (isFavorito) {
        dispatch({ type: "REMOVE_FAVORITE", payload: { uid: element.uid, type: tipo } });
      } else {
        dispatch({
          type: "ADD_FAVORITE",
          payload: {
            uid: element.uid,
            type: tipo,
            name: element.name,
            url: `/single/${tipo}/${element.uid}`,
          },
        });
      }
    };

    return (
      <div
        className="card flex-shrink-0 border-0 shadow-sm"
        style={{
          width: "280px",
          minWidth: "280px",
          borderRadius: "16px",
        }}
        key={`${tipo}-${element.uid}`}
      >
        <img
          src={obtenerImagen(element.name, tipo)}
          alt={element.name}
          className="card-img-top object-fit-cover"
          style={{
            height: "180px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-dark">{element.name}</h5>
          <div className="d-flex justify-content-between mt-auto">
            <Link to={`/single/${tipo}/${element.uid}`} className="btn btn-sm btn-primary">
              Ver más
            </Link>
            <button
              className={`btn btn-sm ${isFavorito ? "btn-warning" : "btn-outline-warning"}`}
              onClick={toggleFavorito}
            >
              <i className={`fa-${isFavorito ? "solid" : "regular"} fa-star`}></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-light py-5">
      <div className="container">
        {/* Vehículos */}
        <h4 className="mt-5 mb-3 section-title text-warning text-shadow mb-3">Vehículos</h4>
        <div className="character-carousel d-flex overflow-auto gap-4 px-3 pb-3">
          {vehicleList.map((vehicle) => renderCard(vehicle, "vehicles"))}
        </div>

        {/* Personajes */}
        <h4 className="mt-5 mb-3 section-title text-info text-shadow mb-3">Personajes</h4>
        <div className="character-carousel d-flex overflow-auto gap-4 px-3 pb-3">
          {peopleList.map((person) => renderCard(person, "people"))}
        </div>

        {/* Planetas */}
        <h4 className="mt-5 mb-3 section-title text-danger text-shadow mb-3">Planetas</h4>
        <div className="character-carousel d-flex overflow-auto gap-4 px-3 pb-3">
          {planetList.map((planet) => renderCard(planet, "planets"))}
        </div>
      </div>
    </div>
  );
};
