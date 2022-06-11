const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("Am i here");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://news-feed-app-backend.onrender.com",
      changeOrigin: true,
    })
  );
};
