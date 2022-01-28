2 main instructions

1) In order to run the application as it is, just open the code folder in VS Code and right click index.js file and click "Open with Live server".
    -- when the application loads, you can login initially with the following details (but it is set to a wallet address so you may want to create another user by entering your own wallet address)
    --     test@moralis.com      testing123! (password)

2) The following settings in the common.js file can be modified in order to run the application. The settings are self explanator by their names, so leave / change as applicable 


// moralis server address (configure accordingly)
commonKeyValues.set('serverUrl', 'https://z2et8zjterwa.usemoralis.com:2053/server');

// moralis ipfs server address (configure accordingly)
commonKeyValues.set('ipfs_server_address', 'https://ipfs.moralis.io:2053/ipfs/');

// moralis dapp Id (configure accordingly)
commonKeyValues.set('appId', 'suPKrJmwcp3kq4Fv2ZyjqOpf6BqcksAUUBEJCPmn');

// wallet address for document history
commonKeyValues.set('historyWalletAddress', '0x3F4e2A19619b2C697C132B50Bd6dcdB3214CC45E');

// block chain for avalanche fuji testnet
commonKeyValues.set('blockChain', '0xa869');

// ethereum contract address [created with remix] (configure accordingly)
commonKeyValues.set('nft_contract_address', '0x3b11604f095da423050c4c2780d31db26747c452');
// PLEASE NOTE that if the above smart contract does not work then
// - Run the following code in REMIX online with solidity. 
// - Create a new .sol file,
// - Then compile the code, 
// - Then select the correct .sol file, 
// - Then deploy using 'Injected Web 3' in the ENVIRONMENT dropdown,
// - Then use your wallet address 
// - Then fetch the contract address from https://testnet.snowtrace.io by passing your transaction id from the wallet that was used for the smart contract create transaction
// - Then set the contract address in the above settings

see smart-contract.sol for solidity code for the smart contract that we are using.
