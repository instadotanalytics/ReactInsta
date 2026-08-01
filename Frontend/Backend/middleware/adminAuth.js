// middleware/adminAuth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ✅ JWT Admin Verification
export const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("🔐 Auth Header:", authHeader ? "Present" : "Missing");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false, 
        message: "Access Denied. No token provided." 
      });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access Denied. Invalid token format." 
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined");
      return res.status(500).json({ 
        success: false, 
        message: "Server configuration error" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified for admin");
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT Verification Error:", err.message);
    return res.status(401).json({ 
      success: false, 
      message: err.message === 'jwt expired' 
        ? 'Token expired. Please login again.' 
        : 'Invalid or expired token.'
    });
  }
};

// Simple admin auth (Basic Auth) - for testing
export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      req.user = { email, role: 'admin' };
      next();
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};

// Combined admin check
export const checkAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  if (authHeader.startsWith('Basic ')) {
    return adminAuth(req, res, next);
  } else if (authHeader.startsWith('Bearer ')) {
    return verifyAdmin(req, res, next);
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid authentication method' 
    });
  }
};