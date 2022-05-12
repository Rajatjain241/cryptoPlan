const { ethers } = require("hardhat");

async function main(){
    // const [deployer] = await ethers.getSigners();
    const WillFactory = await ethers.getContractFactory("WillFactory");
    const will = await WillFactory.deploy();
    console.log("WillFactory Address: ", will.address);
}
main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})