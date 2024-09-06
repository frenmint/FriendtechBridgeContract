import { ethers } from "hardhat";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying ProxyONFT1155 using CREATE3...");

    const salt = ethers.keccak256(ethers.toUtf8Bytes("unique-salt-for-onft"));
    // const salt = ethers.randomBytes(32)

    console.log("salt", salt);


    const ONFT1155 = await ethers.getContractFactory('ProxyONFT1155');
    const initCode = await ONFT1155.getDeployTransaction('0x55370E0fBB5f5b8dAeD978BA1c075a499eB107B8', "0xEB02137E715b7F87C5f84Ada304279A83DE119f4");

    // Deploy the ImmutableCreate2Factory (replace with the actual deployed factory address)
    const factoryAddress = "0x9fBB3DF7C40Da2e5A0dE984fFE2CCB7C47cd0ABf";  // Replace with the actual deployed factory contract address
    const factory = await ethers.getContractAt("CREATE3Factory", factoryAddress);
    // Use the factory to deploy the contract via CREATE2 with the same salt
    const tx = await factory.deploy(salt, initCode.data, { value: 0 });
    console.log("here1");
    await tx.wait();
    console.log("here2");
    // Compute and verify the deployed contract address
    const deploymentAddress = await factory.getDeployed(salt, initCode.data);
    console.log(`ProxyONFT1155 contract deployed at: ${deploymentAddress}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});