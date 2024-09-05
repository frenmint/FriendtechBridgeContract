
// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying...')
    const instance = await ethers.getContractFactory('ProxyONFT1155');
    const instanceBridge = await instance.deploy('0x55370E0fBB5f5b8dAeD978BA1c075a499eB107B8', "0xEB02137E715b7F87C5f84Ada304279A83DE119f4");
    await instanceBridge.waitForDeployment();
    console.log(`Proxy Bridge contract is deployed. Token address: ${instanceBridge.target}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})