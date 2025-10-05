const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://profile-t4pm.onrender.com",
      changeOrigin: true,
      secure: true,
    })
  );
};
