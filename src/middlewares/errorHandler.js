class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true; // نميز بين أخطاء متوقعة وغير متوقعة
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  // نحدد حالة الـ status code
  const statusCode = err.statusCode || 500;

  // نطبع الخطأ في الـ console فقط في development أو لو خطأ غير متوقع
  if (process.env.NODE_ENV === "development" || !err.isOperational) {
    console.error(err.stack);
  }

  // الرد للمستخدم
  res.status(statusCode).json({
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : err.isOperational
        ? err.message
        : "Internal Server Error"
  });
};

module.exports = { errorHandler, AppError };