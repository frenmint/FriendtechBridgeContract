
// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying...')
    const instance = await ethers.getContractFactory('CREATE3Factory');
    console.log("first");
    const instanceFactory = await instance.deploy();
    console.log("second");
    await instanceFactory.waitForDeployment();
    console.log(`Factory contract is deployed. Token address: ${instanceFactory.target}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})