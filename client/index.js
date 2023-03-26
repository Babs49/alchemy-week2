const axios = require('axios');
const niceList = require('../utils/niceList.json');
const serverUrl = 'http://localhost:1225';

async function main() {
  var randomName = niceList[Math.floor(Math.random()*niceList.length)]
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    randomName
  });

  console.log({ gift });
}

main();