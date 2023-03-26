const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());


const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  const randomName = req.body.randomName;
  const index = niceList.findIndex(n => n === randomName);
  const proof = merkleTree.getProof(index);
  if(verifyProof(proof, randomName, MERKLE_ROOT) ) {
    res.send("Congrats " + randomName + ", you got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
