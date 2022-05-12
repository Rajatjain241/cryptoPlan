// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;




// import './App.css';
// import { ethers } from 'ethers';
// //import Wallet from './components/Wallet';
// import WalletEthers from './components/WalletEthers';
// import WillFactory from './components/jsons/artifacts/contracts/cp.sol/WillFactory.json';
// import NewWill from './components/jsons/artifacts/contracts/cp.sol/NewWill.json';

// const contractaddress = "0x30e916373d98B3DFD5F4C4Ab227ABe0d36eb93c9";

// function App() {

//   async function requestAccount() {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   }

//   async function create() {
//     if (typeof window.ethereum !== 'undefined') {
//       await requestAccount()
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()
//       const contract = new ethers.Contract(contractaddress, WillFactory.abi, signer)
//       const transaction = await contract.create("0x68bA80a2F185C213102582b60a0CD78Bcd34574f", "rajat")
//       const data = await transaction.wait()
//       console.log(data);
//       // fetchGreeting()
//     }
//   }

//   async function getwill() {
//     if (typeof window.ethereum !== 'undefined') {
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const contract = new ethers.Contract(contractaddress, WillFactory.abi, provider)
//       try {
//         const data = await contract.wills("0");
//         console.log('data: ', data);
//       } catch (err) {
//         console.log("Error: ", err);
//       }
//     }    
//   }

//   async function addNominees() {
//     if (typeof window.ethereum !== 'undefined') {
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const signer = provider.getSigner()
//       const contract = new ethers.Contract("0x0310B417173F45FC867758aaff2D54E4d78C27D5", NewWill.abi, signer)
//       try {
//         console.log(contract);
//         await contract.addBeneficiaries("0x68ba80a2f185c213102582b60a0cd78bcd34574f", "fiduciary");
//         console.log(`wallet Address: ${await contract.getAddresses()} ${await contract.getAlias("0x68ba80a2f185c213102582b60a0cd78bcd34574f")}}`);
//         console.log(contract._aliases());
//         //console.log('appoint as: ', await contract.getAlias("0x68ba80a2f185c213102582b60a0cd78bcd34574f"));
//       } catch (err) {
//         console.log("Error: ", err);
//       }
//     }    
//   }  

//   return (
//     <div className="App">
//       <header className="App-header">
//         <WalletEthers />
//         <button onClick={create}>Create Contract</button>
//         <button onClick={getwill}>getUsers </button>
//         <button onClick={addNominees}>Add Nominees </button>
//       </header>
//     </div>
//   );
// }

// export default App;



















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import './App.css';
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers';
//import Wallet from './components/Wallet';
import WalletEthers from './components/WalletEthers';
import WillFactory from './artifacts/contracts/cp.sol/WillFactory.json';
import NewWill from './artifacts/contracts/cp.sol/NewWill.json';

const contractaddress = "0xDb3271736612fC953E578091a251C2BDa91F1793";
var NewWillAddress;

function App() {

  async function requestAccount() {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function create() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractaddress, WillFactory.abi, signer)
      const transaction = await contract.create(account[0], "Granter")
      const data = await transaction.wait()
      console.log(data);
      // fetchGreeting()
    }
  }

  async function getwill() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractaddress, WillFactory.abi, provider)
      try {
        NewWillAddress = await contract.wills("0");
        console.log('NewWillAddress: ', NewWillAddress);
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

  const addNominees = async(data)=> {
    // console.log("data is", data);
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(NewWillAddress, NewWill.abi, signer)
      try {
        console.log(contract);
        await contract.addBeneficiaries(data.address, data.type);
        console.log("wallet Address: ",await contract.getAddresses());
        console.log(await contract._aliases(data.address, data.address));
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    addNominees(data)
  }; 

  return (
    <div className="App">
      <header className="App-header">
        <WalletEthers />
        <button onClick={create}>Create Contract</button>
        <button onClick={getwill}>getUsers </button>
        <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit'>Add Nominees </button>
        <input type='text' name='address' {...register("address")}/>
        <input type='text' name='type' {...register("type")}/>
     </form>
      </header>
    </div>
  );
}

export default App;