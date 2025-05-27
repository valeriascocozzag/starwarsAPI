import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorito = (fav) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: {
        uid: fav.uid,
        type: fav.type,
      },
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black navbar-dark shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG20.png"
            alt="logo"
            height="50"
            className="me-2"
          />
        </Link>

        {/* Dropdown de Favoritos */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            ⭐ Favoritos <span className="badge bg-dark">{store.favorites.length}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No tienes favoritos</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/single/${fav.type}/${fav.uid}`}
                    className="text-decoration-none text-dark me-2"
                  >
                    {fav.name}
                  </Link>
                  <i
                    className="fa-solid fa-trash text-danger"
                    role="button"
                    onClick={() => removeFavorito(fav)}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
