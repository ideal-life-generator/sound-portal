require("babel-register")({
  presets: [ "es2015", "stage-2" ],
  plugins: [ "array-includes" ]
})
require("./server")