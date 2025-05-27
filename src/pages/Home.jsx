import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getElementIndex } from "../services/api.js"
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

  // Renderizado de tarjetas con navegación al Single.jsx
  const renderCard = (element, tipo) => (
    <div
      className="card bg-white text-dark m-2"
      style={{ width: "12rem", flex: "0 0 auto" }}
      key={`${tipo}-${element.uid}`}
    >
      <img
        src={obtenerImagen(element.name, tipo)}
        alt={element.name}
        className="card-img-top"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h6 className="card-title">{element.name}</h6>
        <Link to={`/single/${tipo}/${element.uid}`} className="btn btn-outline-primary btn-sm mt-2">
          Ver más
        </Link>
      </div>
    </div>
  );

  return (
    <div className="text-dark py-5">
      <div className="container">

        {/* Vehículos */}
        <h4 className="mb-3 text-white">Vehículos</h4>
        <div className="d-flex overflow-auto px-2 pb-3">
          {vehicleList.map((vehicle) => renderCard(vehicle, "vehicles"))}
        </div>

        {/* Personajes */}
        <h4 className="mb-3 text-white">Personajes</h4>
        <div className="d-flex overflow-auto px-2 pb-3">
          {peopleList.map((person) => renderCard(person, "people"))}
        </div>

        {/* Planetas */}
        <h4 className="mb-3 text-white">Planetas</h4>
        <div className="d-flex overflow-auto px-2 pb-3">
          {planetList.map((planet) => renderCard(planet, "planets"))}
        </div>
      </div>
    </div>
  );
};
