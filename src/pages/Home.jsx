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
				className="text-light m-2"
				style={{
					width: "12rem",
					flex: "0 0 auto",
					background: "rgba(0, 0, 0, 0.5)",
					borderRadius: "12px",
					overflow: "hidden",
					boxShadow: "0 0 10px rgba(255,255,255,0.1)",
				}}
				key={`${tipo}-${element.uid}`}
			>
				<img
					src={obtenerImagen(element.name, tipo)}
					alt={element.name}
					style={{ height: "150px", objectFit: "cover", width: "100%" }}
				/>
				<div className="p-2">
					<h6 className="d-flex justify-content-between align-items-center" style={{ fontSize: "0.9rem" }}>
						{element.name}
						<button className="btn btn-sm" onClick={toggleFavorito}>
							<i className={`fa${isFavorito ? "s" : "r"} fa-star text-warning`}></i>
						</button>
					</h6>
					<Link to={`/single/${tipo}/${element.uid}`} className="btn btn-outline-light btn-sm mt-2 w-100">
						Ver más
					</Link>
				</div>
			</div>
		);
	};

	return (
		<div className="text-light py-5">
			<div className="px-4">
				<h4 className="mb-3">Vehículos</h4>
				<div className="d-flex overflow-auto pb-3">
					{vehicleList.map(vehicle => renderCard(vehicle, "vehicles"))}
				</div>

				<h4 className="mt-5 mb-3">Personajes</h4>
				<div className="d-flex overflow-auto pb-3">
					{peopleList.map(person => renderCard(person, "people"))}
				</div>

				<h4 className="mt-5 mb-3">Planetas</h4>
				<div className="d-flex overflow-auto pb-3">
					{planetList.map(planet => renderCard(planet, "planets"))}
				</div>
			</div>
		</div>
	);
};
