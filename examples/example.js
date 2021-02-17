var BEA256 = require('./BEA256')

/*
  Get results base64
*/

var base64en = new BEA256("MERHABALAR AQ", "test").encrypt("base64")
// var base64de = new BEA256(base64en, "test").decrypt("base64")

console.log("Base64:\n", base64en);


/*
  Get results json
*/
var jsonen = new BEA256("MERHABALAR AQ", "test").encrypt("json")
// var jsonde = new BEA256(jsonen, "test").decrypt("json")

console.log("Json:\n", jsonen);

/*
  Get results block
*/
var blocken = new BEA256("MERHABALAR AQ", "test").encrypt()
// var blockde = new BEA256(blocken, "test").decrypt()

console.log("Block:\n", blocken);
