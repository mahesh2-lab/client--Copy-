const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< HEAD
    screens: {
      'below-400px': {'max': '400px'},
      'below-540px': {'max': '540px'},
    },
  },
  plugins: [],
});
=======
    extend: {},
  },
  plugins: [],
});
>>>>>>> 7ac991d (uy)
