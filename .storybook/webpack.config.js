module.exports = ({ config }) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
  
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader");
  
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ];
  
  // use @babel/plugin-proposal-class-properties for class arrow functions
  config.module.rules[0].use[0].options.plugins = [
    require.resolve("@babel/plugin-proposal-class-properties"),
  ];
  
  //remove svg from current rule.
  config.module.rules.map(rule => {
    if (String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)) {
      rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
    }
    return rule;
  });
  
  // use svgr for svg files
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "@svgr/webpack",
        options: {
          jsx: true, // true outputs JSX tags
          //svgo optimization removes the viewBox by default. It's needed when resetting the width and height of a svg component.
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          }
        }
      }
    ],
  });
  
  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"];
  return config
};
