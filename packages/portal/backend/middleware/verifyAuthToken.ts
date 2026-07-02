import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const verifyIsLoggedIn = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return res.status(403).json({
        success: false,
        error: "Se requiere token para autenticación",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({
        success: false,
        error: "Sesión expirada. Por favor, inicia sesión nuevamente.",
      });
    }
  } catch (err) {
    console.error("[AUTH-MIDDLEWARE] Error en verificación:", err);
    next(err);
  }
};

const verifyIsAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user &&
    typeof req.user === "object" &&
    "isAdmin" in req.user &&
    req.user.isAdmin
  ) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      error: "Se requieren permisos de administrador",
    });
  }
};

export { verifyIsLoggedIn, verifyIsAdmin };
