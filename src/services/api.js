const apiBaseUrl = "https://www.swapi.tech/api";

// 🔍 Servicio para obtener UN elemento individual
export const getElement = async (type, id) => {
  try {
    const res = await fetch(`${apiBaseUrl}/${type}/${id}`);
    const data = await res.json();

    if (!data.result) {
      console.warn(`⚠️ No se encontró el recurso: ${type}/${id}`);
      return null;
    }

    return data.result;
  } catch (error) {
    console.error("❌ Error en getElement:", error);
    return null;
  }
};

// 📜 Servicio para obtener listado de elementos con uid incluido
export const getElementIndex = async (type) => {
  try {
    const res = await fetch(`${apiBaseUrl}/${type}`);
    const data = await res.json();

    // Extraer uid de la URL
    return data.results.map((item) => {
      const uid = item.url.split("/").pop();
      return { ...item, uid };
    });
  } catch (error) {
    console.error("❌ Error en getElementIndex:", error);
    return [];
  }
};
