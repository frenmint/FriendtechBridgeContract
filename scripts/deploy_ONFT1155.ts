
// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying...')
    const _endpoint:any = "0x4e08B1F1AC79898569CfB999FB92B5495FB18A2B";
    const _uri:any = ''
    const instance = await ethers.getContractFactory('ONFT1155');
    const instanceBridge = await instance.deploy(_uri,  _endpoint);
    await instanceBridge.waitForDeployment();
    console.log(`Bridge contract is deployed. Token address: ${instanceBridge.target}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})