module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        fiber: require("fibers")
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
};
