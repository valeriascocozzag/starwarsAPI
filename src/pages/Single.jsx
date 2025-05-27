import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getElement } from "../services/api";
import { fotosPersonajes, fotosPlanetas, fotosVehiculos } from "../assets/imagenes";

export const Single = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { store, dispatch } = useGlobalReducer();

  const fotosName = (name) => {
    const dict = {
      people: fotosPersonajes,
      planets: fotosPlanetas,
      vehicles: fotosVehiculos,
    };
    const arr = dict[type];
    if (!arr) return "https://via.placeholder.com/600x400";
    const found = arr.find((img) => img.name.toLowerCase() === name.toLowerCase());
    return found ? found.url : "https://via.placeholder.com/600x400";
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getElement(type, uid);
      setItem(data);
      setLoading(false);
    };
    fetchData();
  }, [type, uid]);

  if (loading) return <p className="text-center mt-5 fs-4">🛰️ Cargando datos...</p>;
  if (!item) return <p className="text-center mt-5 fs-4 text-danger">⚠️ No se encontró el elemento.</p>;

  const { description, properties } = item;
  const name = properties?.name || "Sin nombre";

  const keysToShow = {
    people: ["gender", "birth_year", "eye_color", "hair_color", "height", "mass"],
    planets: ["climate", "population", "orbital_period", "rotation_period", "diameter"],
    vehicles: ["model", "manufacturer", "cost_in_credits", "max_atmosphering_speed", "crew", "passengers"],
  };

  // ✅ Función de favoritos
  const isFavorito = store.favorites?.some(
    (fav) => fav.uid === uid && fav.type === type
  );

  const toggleFavorito = () => {
    if (isFavorito) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: {
          uid,
          type,
          name,
          url: `/single/${type}/${uid}`,
        },
      });
    }
  };

  return (
    <div className="container my-5">
      <div className="card bg-black text-light border rounded-4 shadow-lg overflow-hidden">
        <div className="row g-0 align-items-center">
          {/* Imagen */}
          <div className="col-lg-6 p-4 text-center bg-dark">
            <img
              src={fotosName(name)}
              alt={name}
              className="img-fluid rounded-3 shadow"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* Info principal */}
          <div className="col-lg-6 p-4">
            <h1 className="text-primary fw-bold display-5">{name}</h1>

            <button
              className={`btn ${isFavorito ? "btn-primary" : "btn-outline-secondary"} mt-3`}
              onClick={toggleFavorito}
            >
              {isFavorito ? "💛 Quitar de favoritos" : "🤍 Agregar a favoritos"}
            </button>

            <p className="mt-4 fs-5 text-white-50 fst-italic">
              {description || "No hay descripción disponible para este elemento de la galaxia."}
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-top mt-3 mb-0"></div>

        {/* Detalles en bloques */}
        <div className="row text-center p-4 bg-dark bg-opacity-50">
          {keysToShow[type]?.map((key) => (
            <div className="col-6 col-md-3 col-lg-2 mb-4" key={key}>
              <div className="border border-primary rounded-3 p-3 bg-black bg-opacity-75 h-100">
                <h6 className="text-uppercase text-primary fw-bold" style={{ fontSize: "0.75rem" }}>
                  {key.replaceAll("_", " ")}
                </h6>
                <p className="mb-0 text-white" style={{ fontSize: "0.9rem" }}>
                  {properties[key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
