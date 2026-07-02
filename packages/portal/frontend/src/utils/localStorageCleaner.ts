/**
 * Utilidad para limpiar y validar datos del localStorage
 * Evita errores de JSON.parse cuando hay datos corruptos
 */

export const cleanLocalStorage = () => {
  const keysToCheck = [
    "activity-data",
    "progress-data",
    "last-session",
    "weekly-progress",
    "routine-data",
    "achievement-data",
    "session-data",
  ];

  keysToCheck.forEach((key) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        // Intentar parsear para validar
        if (key === "weekly-progress") {
          // Para weekly-progress, debe ser un número
          const numValue = parseInt(value, 10);
          if (isNaN(numValue)) {
            localStorage.setItem(key, "0");
            // Valor inválido restaurado a 0
          }
        } else {
          // Para otros campos, debe ser JSON válido
          JSON.parse(value);
        }
      }
    } catch (error) {
      // Si hay error al parsear, limpiar el valor
      if (key === "weekly-progress") {
        localStorage.setItem(key, "0");
      } else if (key === "progress-data") {
        localStorage.setItem(key, "{}");
      } else {
        localStorage.setItem(key, "[]");
      }
      // Datos corruptos restaurados a valor por defecto
    }
  });
};

export const initializeLocalStorage = () => {
  // Asegurar que todos los campos necesarios existan con valores válidos
  const defaults = {
    "activity-data": "[]",
    "progress-data": "{}",
    "last-session": null,
    "weekly-progress": "0",
    "routine-data": "[]",
    "achievement-data": "[]",
    "session-data": "[]",
  };

  Object.entries(defaults).forEach(([key, defaultValue]) => {
    if (!localStorage.getItem(key)) {
      if (defaultValue !== null) {
        localStorage.setItem(key, defaultValue);
      }
    }
  });
};
