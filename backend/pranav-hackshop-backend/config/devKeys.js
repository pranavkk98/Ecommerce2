const devKeys = {
  mongoUri: process.env.MONGO_DEV,
  jwtSecret: process.env.JWT_SECRET_DEV,
  frontEndBaseUrl: process.env.FRONTEND_BASE_URL_DEV,
  backEndBaseUrl: process.env.BACKEND_BASE_URL_DEV,
  emailId: process.env.EMAIL_ID_DEV,
  emailPass: process.env.EMAIL_PASSWORD_DEV,
  algorithm: process.env.ALGORITHM_DEV,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY_DEV,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET_DEV,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME_DEV,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID_DEV,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET_DEV,
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET_DEV,
};

module.exports = devKeys;
