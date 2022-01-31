const prodKeys = {
  mongoUri: process.env.MONGO_PROD,
  jwtSecret: process.env.JWT_SECRET_PROD,
  frontEndBaseUrl: process.env.FRONTEND_BASE_URL_PROD,
  backEndBaseUrl: process.env.BACKEND_BASE_URL_PROD,
  emailId: process.env.EMAIL_ID_PROD,
  emailPass: process.env.EMAIL_PASSWORD_PROD,
  algorithm: process.env.ALGORITHM_PROD,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY_PROD,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET_PROD,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME_PROD,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID_PROD,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET_PROD,
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET_PROD,
};

module.exports = prodKeys;
