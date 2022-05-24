import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [amount, setAmount] = useState();
  const [toaddress, setToaddress] = useState("");
  const [sentstatus, setSentstatus] = useState(false);
  let meta_connect;

  const XBUSD_ADDRESS = "0x59C27DFAB4b8A3e6917DB99652FF506e3536fB44";
  const XBUSD_ABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "tokenname",
          type: "string",
        },
        {
          internalType: "string",
          name: "tokenSymbol",
          type: "string",
        },
        {
          internalType: "uint8",
          name: "decimals",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "initSupply",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    console.log(currentAccount);
  }, []);
  return (
    <div className="flex flex-col h-screen w-full bg-slate-300 justify-center items-center">
      {currentAccount === "" ? (
        <button
          className={`   px-5 py-1 rounded-lg shadow-sm ${
            currentAccount !== ""
              ? ` bg-gray-700 text-gray-200`
              : `text-lime-500 hover:bg-white bg-lime-200`
          } `}
          disabled={currentAccount !== "" ? true : false}
          onClick={async () => {
            console.log("click");
            if (!window.ethereum) {
              console.log("please install MetaMask");
              return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const message = "give me your wallet !";
            const account = accounts[0];
            const sign = await provider
              .send("personal_sign", [message, account])
              .catch((e) => console.log(e));
            if (sign !== undefined) {
              setCurrentAccount(account);
            }

            // const message = "give me your wallet !";
            // const accounts = await window.ethereum.request({
            //   method: "eth_requestAccounts",
            // });
            // const account = accounts[0];
            // const signature = await window.ethereum
            //   .request({
            //     method: "personal_sign",
            //     params: [message, account],
            //   })
            //   .catch((e) => console.log(e));
            // setCurrentAccount(account);
          }}
        >
          Connect wallet
        </button>
      ) : null}

      {currentAccount !== "" ? (
        <div className=" bg-blue-300 p-5 h-fit w-1/2 rounded-xl shadow-xl flex flex-col items-center">
          <p>{currentAccount}</p>
          <div className=" w-full px-10 flex flex-row gap-3 items-center justify-between my-1">
            {`Amout :`}
            <input
              className=" rounded-sm"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className=" w-full px-10 flex flex-row gap-3 items-center justify-between">
            {`to Address :`}
            <input
              className=" rounded-sm"
              onChange={(e) => {
                setToaddress(e.target.value);
              }}
            />
          </div>
          <button
            className=" bg-white px-5 py-1 mt-5 rounded-lg shadow-lg hover:bg-cyan-200"
            onClick={async () => {
              const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
              );
              const signer = provider.getSigner();

              const transactionResponse = await signer.sendTransaction({
                to: toaddress,
                value: ethers.utils.parseEther(amount),
              });
              const conf = await transactionResponse.wait();
              if (conf.status === 1) {
                setSentstatus(true);
                setInterval(() => {
                  setSentstatus(false);
                  window.location.reload();
                }, 5000);
              } else {
                alert("error");
              }
              console.log(conf);
            }}
          >
            {" "}
            pay{" "}
          </button>
          <p
            className={`m-2 p-2 rounded-lg shadow-lg${
              sentstatus === true
                ? ` text-green-500 bg-green-100 `
                : ` text-red-500 bg-red-100`
            }`}
          >
            status : {`${sentstatus ? `Complect` : `Waiting`}`}
          </p>
          <div className="py-10 bg-green-200 w-full h-fit flex flex-col items-center justify-center rounded-lg shadow-md">
            <p>xbusd tranfer</p>
            <p className=" text-xs text-gray-400 ">
              XBUSD ADDRESS : 0x59C27DFAB4b8A3e6917DB99652FF506e3536fB44
            </p>
            <button
              className=" bg-white px-5 py-1 mt-5 rounded-lg shadow-lg hover:bg-cyan-200"
              onClick={async () => {
                const provider = new ethers.providers.Web3Provider(
                  window.ethereum,
                  "any"
                );
                const signer = provider.getSigner();
                meta_connect = new ethers.Contract(
                  XBUSD_ADDRESS,
                  XBUSD_ABI,
                  signer
                );
                console.log("Connected :", meta_connect);
                let res = await meta_connect.balanceOf(
                  "0xfe501ee4ed46d7f13ff89d775a7c395eee3ac6ba"
                );
                console.log(ethers.utils.formatEther(res));
                let temp_amount = amount * 100000000;
                let res2 = await meta_connect.transfer(toaddress, temp_amount);
                const conf = await res2.wait();
                if (conf.status === 1) {
                  setSentstatus(true);
                  setInterval(() => {
                    setSentstatus(false);
                    window.location.reload();
                  }, 5000);
                } else {
                  alert("error");
                }
                console.log(conf);
                // let res3 = await meta_connect.mint(temp_amount);
                // // console.log(res2);
                // console.log(res3);

                // const transactionResponse = await signer.sendTransaction({
                //   to: toaddress,
                //   value: ethers.utils.parseEther(amount),
                // });
                // const conf = await transactionResponse.wait();
                // if (conf.status === 1) {
                //   setSentstatus(true);
                //   setInterval(() => {
                //     setSentstatus(false);
                //     window.location.reload();
                //   }, 5000);
                // } else {
                //   alert("error");
                // }
                // console.log(conf);
              }}
            >
              {" "}
              pay{" "}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
