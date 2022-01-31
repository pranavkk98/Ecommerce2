const crypto = require("crypto");

const { razorpayWebhookSecret } = require("../config/keys");

const capturePaymentMiddleware = (req, res, next) => {
  try {
    var expectedSignature = crypto
      .createHmac("sha256", razorpayWebhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== req.headers["x-razorpay-signature"]) {
      return res.send({ signatureIsValid: false });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = capturePaymentMiddleware;
