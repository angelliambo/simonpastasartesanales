// Función para normalizar el título según tus reglas
export const normalizeTitle = (title: string) => {
  // Mapa de reemplazos para vocales acentuadas y diéresis
  const accentsMap: { [key: string]: string } = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
    Á: "a",
    É: "e",
    Í: "i",
    Ó: "o",
    Ú: "u",
    Ü: "u",
  };

  // Reemplaza vocales acentuadas y diéresis
  let normalized = title
    .split("")
    .map((char) => {
      if (char === "ñ" || char === "Ñ") return "nio"; // regla para ñ
      if (accentsMap[char]) return accentsMap[char];
      return char;
    })
    .join("");

  // Luego convierte a minúsculas, elimina espacios extras y caracteres no alfanuméricos excepto guiones
  normalized = normalized
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return normalized;
};
