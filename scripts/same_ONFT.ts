import { ethers } from "hardhat";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying ProxyONFT1155 using CREATE3...");

    const salt = ethers.keccak256(ethers.toUtf8Bytes("unique-salt-for-onft"));
    // const salt = ethers.randomBytes(32)

    console.log("salt", salt);

    const _endpoint:any = "0x4e08B1F1AC79898569CfB999FB92B5495FB18A2B";
    const _uri:any = ''
    const ONFT1155 = await ethers.getContractFactory('ONFT1155');
    const initCode = await ONFT1155.getDeployTransaction(_uri,  _endpoint);

    // Deploy the ImmutableCreate2Factory (replace with the actual deployed factory address)
    const factoryAddress = "0x9fBB3DF7C40Da2e5A0dE984fFE2CCB7C47cd0ABf";  // Replace with the actual deployed factory contract address
    const factory = await ethers.getContractAt("CREATE3Factory", factoryAddress);

    // console.log(initCode.data);
    const deploymentAddress = await factory.getDeployed(deployer.address, salt);
    console.log(`ProxyONFT1155 contract deployed at: ${deploymentAddress}`);
    // Use the factory to deploy the contract via CREATE2 with the same salt
    const tx = await factory.deploy(salt, initCode.data, { value: 0 });
    console.log("here1");
    await tx.wait();
    console.log("here2");
    // Compute and verify the deployed contract address
    // const deploymentAddress = await factory.getDeployed(deployer.address, salt);
    // console.log(`ProxyONFT1155 contract deployed at: ${deploymentAddress}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});