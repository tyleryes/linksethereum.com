# linksethereum.com
This is a very simple and uncensorable magnet and links explorer saved on ethereum blockchain.

## Running 

You can run it with the defaults options, but it is advisable put your own api keys.

### Node 

You can use infura api as node, or you can use your own localhost node or a public node. 

### Contract 

By default it is using https://chainy.link contract address, because there is already some links uploaded to this contract.

### Etherscan Cache

You can use etherscan cache to get transactions, or search within blocks with your selected node. Be careful because this can get too much time.
But if you search manually and your node is a localhost one, your explorer will be 100% decentralized and uncensorable, it will be running all on clientside.

## How to upload data:
This is an example of the JSON format that we are reading on inputs:

 
{	
"id":"CHAINY",
"version":1,
"type":"L",
"description":"your name file",
"url":"magnet:?xt=urn...",
"filetype":"magnet"
}

To publish it on ethereum blockchain with addChainyData function you can follow this steps. https://chainy.info/howto
Remember that ethereum is traceable, you must not upload ilegal links to the blockchain.

You can donate to pay the ethereum fees and thus we will be able to save more links and improve the software: 

ETH: 0x904acEB95f681665768f1464f36903068730Fd42
