/**
 * Tests para apiMappers.ts
 * Valida normalización de respuestas de API, paginación, fechas y mapeo de datos
 */

import {
  extractData,
  extractArray,
  extractPaginated,
  normalizeId,
  normalizeDate,
  normalizeDates,
  mapUser,
  mapUsers,
  mapActivity,
  mapActivities,
  mapGame,
  mapGames,
  mapChatMessage,
  mapChatMessages,
  mapGameSession,
  mapGameSessions,
  mapAchievement,
  mapAchievements,
  mapRelationship,
  mapRelationships,
  createTransformResponse,
  createTransformArrayResponse,
  createTransformPaginatedResponse,
} from "../apiMappers";

describe("apiMappers", () => {
  describe("extractData", () => {
    it("debe extraer datos de respuesta estándar con success y data", () => {
      const response = {
        success: true,
        data: { id: 1, name: "Test" },
        message: "Success",
      };
      expect(extractData(response)).toEqual({ id: 1, name: "Test" });
    });

    it("debe devolver fallback cuando no hay datos", () => {
      const response = null;
      const fallback = { id: 0 };
      // extractData devuelve fallback cuando response es null/undefined
      const result = extractData(response, fallback);
      expect(result).toEqual(fallback);
    });

    it("debe devolver respuesta directamente si no tiene estructura estándar", () => {
      const response = { id: 1, name: "Test" };
      expect(extractData(response)).toEqual(response);
    });

    it("debe manejar respuesta con data pero sin success", () => {
      const response = { data: { id: 1 } };
      expect(extractData(response)).toEqual({ id: 1 });
    });
  });

  describe("extractArray", () => {
    it("debe extraer array de respuesta estándar", () => {
      const response = {
        success: true,
        data: [{ id: 1 }, { id: 2 }],
      };
      expect(extractArray(response)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("debe devolver fallback cuando no hay array", () => {
      const response = { success: false };
      expect(extractArray(response, [])).toEqual([]);
    });

    it("debe extraer array de respuesta paginada", () => {
      const response = {
        data: [{ id: 1 }, { id: 2 }],
        pagination: { page: 1, limit: 10, total: 2, pages: 1 },
      };
      expect(extractArray(response)).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe("extractPaginated", () => {
    it("debe extraer datos y paginación de respuesta paginada", () => {
      const response = {
        data: [{ id: 1 }, { id: 2 }],
        pagination: { page: 1, limit: 10, total: 2, pages: 1 },
      };
      const result = extractPaginated(response);
      expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      });
    });

    it("debe usar valores por defecto cuando no hay paginación", () => {
      const response = {
        data: [{ id: 1 }],
      };
      const result = extractPaginated(response);
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(1);
    });

    it("debe extraer paginación de formato alternativo", () => {
      const response = {
        data: [{ id: 1 }],
        page: 2,
        limit: 20,
        total: 50,
        pages: 3,
      };
      const result = extractPaginated(response);
      expect(result.pagination).toEqual({
        page: 2,
        limit: 20,
        total: 50,
        pages: 3,
      });
    });
  });

  describe("normalizeId", () => {
    it("debe normalizar id de objeto con id", () => {
      expect(normalizeId({ id: "123" })).toBe("123");
    });

    it("debe normalizar id de objeto con _id", () => {
      expect(normalizeId({ _id: "456" })).toBe("456");
    });

    it("debe normalizar id de objeto con userId", () => {
      expect(normalizeId({ userId: "789" })).toBe("789");
    });

    it("debe devolver string vacío para objeto null", () => {
      expect(normalizeId(null)).toBe("");
    });

    it("debe convertir número a string", () => {
      expect(normalizeId(123)).toBe("123");
    });
  });

  describe("normalizeDate", () => {
    it("debe normalizar Date a string ISO", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const result = normalizeDate(date);
      expect(result).toBe("2024-01-01T00:00:00.000Z");
    });

    it("debe devolver string directamente si ya es string", () => {
      const dateString = "2024-01-01T00:00:00Z";
      expect(normalizeDate(dateString)).toBe(dateString);
    });

    it("debe devolver undefined para null o undefined", () => {
      expect(normalizeDate(null)).toBeUndefined();
      expect(normalizeDate(undefined)).toBeUndefined();
    });
  });

  describe("normalizeDates", () => {
    it("debe normalizar campos de fecha especificados", () => {
      const item = {
        id: 1,
        createdAt: new Date("2024-01-01"),
        updatedAt: "2024-01-02",
        name: "Test",
      };
      const result = normalizeDates(item, ["createdAt", "updatedAt"]);
      expect(result.createdAt).toBe("2024-01-01T00:00:00.000Z");
      expect(result.updatedAt).toBe("2024-01-02");
      expect(result.name).toBe("Test");
    });

    it("debe usar campos de fecha por defecto si no se especifican", () => {
      const item = {
        id: 1,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
      };
      const result = normalizeDates(item);
      expect(result.createdAt).toMatch(/2024-01-01/);
      expect(result.updatedAt).toMatch(/2024-01-02/);
    });
  });

  describe("mapUser", () => {
    it("debe mapear usuario con _id a formato con id", () => {
      const user = {
        _id: "123",
        username: "test",
        email: "test@example.com",
        createdAt: new Date("2024-01-01"),
      };
      const result = mapUser(user);
      expect(result.id).toBe("123");
      expect(result._id).toBe("123");
      expect(result.username).toBe("test");
      expect(result.createdAt).toMatch(/2024-01-01/);
    });

    it("debe devolver null para usuario null", () => {
      expect(mapUser(null)).toBeNull();
    });
  });

  describe("mapUsers", () => {
    it("debe mapear array de usuarios", () => {
      const users = [
        { _id: "1", username: "user1" },
        { _id: "2", username: "user2" },
      ];
      const result = mapUsers(users);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    it("debe devolver array vacío para input no array", () => {
      expect(mapUsers(null as any)).toEqual([]);
      expect(mapUsers({} as any)).toEqual([]);
    });
  });

  describe("mapActivity", () => {
    it("debe mapear actividad correctamente", () => {
      const activity = {
        _id: "123",
        title: "Test Activity",
        createdAt: new Date("2024-01-01"),
      };
      const result = mapActivity(activity);
      expect(result.id).toBe("123");
      expect(result.title).toBe("Test Activity");
      expect(result.createdAt).toMatch(/2024-01-01/);
    });

    it("debe devolver null para actividad null", () => {
      expect(mapActivity(null)).toBeNull();
    });
  });

  describe("mapActivities", () => {
    it("debe mapear array de actividades", () => {
      const activities = [
        { _id: "1", title: "Activity 1" },
        { _id: "2", title: "Activity 2" },
      ];
      const result = mapActivities(activities);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });
  });

  describe("mapGame", () => {
    it("debe mapear juego correctamente", () => {
      const game = {
        _id: "123",
        name: "Test Game",
        createdAt: new Date("2024-01-01"),
      };
      const result = mapGame(game);
      expect(result.id).toBe("123");
      expect(result.name).toBe("Test Game");
    });

    it("debe devolver null para juego null", () => {
      expect(mapGame(null)).toBeNull();
    });
  });

  describe("mapGames", () => {
    it("debe mapear array de juegos", () => {
      const games = [
        { _id: "1", name: "Game 1" },
        { _id: "2", name: "Game 2" },
      ];
      const result = mapGames(games);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
    });
  });

  describe("mapChatMessage", () => {
    it("debe mapear mensaje de chat correctamente", () => {
      const message = {
        _id: "123",
        content: "Hello",
        createdAt: new Date("2024-01-01"),
      };
      const result = mapChatMessage(message);
      expect(result.id).toBe("123");
      expect(result.content).toBe("Hello");
    });

    it("debe devolver null para mensaje null", () => {
      expect(mapChatMessage(null)).toBeNull();
    });
  });

  describe("mapChatMessages", () => {
    it("debe mapear array de mensajes", () => {
      const messages = [
        { _id: "1", content: "Message 1" },
        { _id: "2", content: "Message 2" },
      ];
      const result = mapChatMessages(messages);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
    });
  });

  describe("mapGameSession", () => {
    it("debe mapear sesión de juego correctamente", () => {
      const session = {
        _id: "123",
        gameId: "game1",
        startedAt: new Date("2024-01-01"),
      };
      const result = mapGameSession(session);
      expect(result.id).toBe("123");
      expect(result.gameId).toBe("game1");
    });

    it("debe devolver null para sesión null", () => {
      expect(mapGameSession(null)).toBeNull();
    });
  });

  describe("mapGameSessions", () => {
    it("debe mapear array de sesiones", () => {
      const sessions = [
        { _id: "1", gameId: "game1" },
        { _id: "2", gameId: "game2" },
      ];
      const result = mapGameSessions(sessions);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
    });
  });

  describe("mapAchievement", () => {
    it("debe mapear logro correctamente", () => {
      const achievement = {
        _id: "123",
        title: "First Win",
        unlockedAt: new Date("2024-01-01"),
      };
      const result = mapAchievement(achievement);
      expect(result.id).toBe("123");
      expect(result.title).toBe("First Win");
    });

    it("debe devolver null para logro null", () => {
      expect(mapAchievement(null)).toBeNull();
    });
  });

  describe("mapAchievements", () => {
    it("debe mapear array de logros", () => {
      const achievements = [
        { _id: "1", title: "Achievement 1" },
        { _id: "2", title: "Achievement 2" },
      ];
      const result = mapAchievements(achievements);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
    });
  });

  describe("mapRelationship", () => {
    it("debe mapear relación correctamente", () => {
      const relationship = {
        _id: "123",
        type: "parent-child",
        createdAt: new Date("2024-01-01"),
      };
      const result = mapRelationship(relationship);
      expect(result.id).toBe("123");
      expect(result.type).toBe("parent-child");
    });

    it("debe devolver null para relación null", () => {
      expect(mapRelationship(null)).toBeNull();
    });
  });

  describe("mapRelationships", () => {
    it("debe mapear array de relaciones", () => {
      const relationships = [
        { _id: "1", type: "parent-child" },
        { _id: "2", type: "therapist-patient" },
      ];
      const result = mapRelationships(relationships);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
    });
  });

  describe("createTransformResponse", () => {
    it("debe crear transformador que extrae datos", () => {
      const transform = createTransformResponse({ id: 0 });
      const response = { success: true, data: { id: 1 } };
      expect(transform(response)).toEqual({ id: 1 });
    });

    it("debe usar fallback cuando no hay datos", () => {
      const fallback = { id: 0 };
      const transform = createTransformResponse(fallback);
      // Cuando response es null o undefined, extractData devuelve fallback
      const response = null;
      expect(transform(response)).toEqual(fallback);
    });

    it("debe lanzar error si no hay datos ni fallback", () => {
      const transform = createTransformResponse();
      const response = null;
      // La función lanza error solo si data es undefined y no hay fallback
      expect(() => transform(response)).toThrow(
        "No se pudieron extraer datos de la respuesta"
      );
    });
  });

  describe("createTransformArrayResponse", () => {
    it("debe crear transformador que extrae array", () => {
      const transform = createTransformArrayResponse([]);
      const response = { success: true, data: [{ id: 1 }] };
      expect(transform(response)).toEqual([{ id: 1 }]);
    });

    it("debe usar fallback cuando no hay array", () => {
      const fallback = [{ id: 0 }];
      const transform = createTransformArrayResponse(fallback);
      const response = { success: false };
      expect(transform(response)).toEqual(fallback);
    });
  });

  describe("createTransformPaginatedResponse", () => {
    it("debe crear transformador que extrae datos paginados", () => {
      const transform = createTransformPaginatedResponse();
      const response = {
        data: [{ id: 1 }],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 },
      };
      const result = transform(response);
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.pagination.page).toBe(1);
    });
  });
});
