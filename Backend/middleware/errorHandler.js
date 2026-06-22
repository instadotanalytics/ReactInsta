// middleware/errorHandler.js

// ✅ FIXED: Proper error handler with all parameters
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.stack || err.message || err);
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 5MB.'
    });
  }
  
  // Multer file filter error
  if (err.message === 'Only image files are allowed (jpeg, jpg, png, gif, webp)') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  // Multer other errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired. Please login again.'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// ✅ For backward compatibility
export default errorHandler;