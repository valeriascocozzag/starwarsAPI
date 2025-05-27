const apiBaseUrl = "https://www.swapi.tech/api";

export const getElement = async (type, id) => {
  try {
    const res = await fetch(`${apiBaseUrl}/${type}/${id}`);
    const data = await res.json();

    if (!data.result) {
      console.warn(`No se encontró el recurso: ${type}/${id}`);
      return null;
    }

    return data.result;
  } catch (error) {
    console.error("Error en getElement:", error);
    return null;
  }
};


export const getElementIndex = async (type) => {
  try {
    const res = await fetch(`${apiBaseUrl}/${type}`);
    const data = await res.json();

    return data.results.map((item) => {
      const uid = item.url.split("/").pop();
      return { ...item, uid };
    });
  } catch (error) {
    console.error("Error en getElementIndex:", error);
    return [];
  }
};
