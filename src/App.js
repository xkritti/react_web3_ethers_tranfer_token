import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [amount, setAmount] = useState();
  const [toaddress, setToaddress] = useState("");
  const [sentstatus, setSentstatus] = useState(false);
  useEffect(() => {
    console.log(currentAccount);
  }, []);
  return (
    <div className="flex flex-col h-screen w-full bg-slate-300 justify-center items-center">
      {currentAccount === "" ? (
        <button
          className={`   px-5 py-1 rounded-lg shadow-sm ${
            currentAccount != ""
              ? ` bg-gray-700 text-gray-200`
              : `text-lime-500 hover:bg-white bg-lime-200`
          } `}
          disabled={currentAccount != "" ? true : false}
          onClick={async () => {
            console.log("click");
            if (!window.ethereum) {
              console.log("please install MetaMask");
              return;
            }

            const message = "give me your wallet !";
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            const signature = await window.ethereum
              .request({
                method: "personal_sign",
                params: [message, account],
              })
              .catch((e) => console.log(e));
            setCurrentAccount(account);

            // provider
            //   .send("eth_requestAccounts", [])
            //   .then(async (accounts) => {
            //     console.log(accounts);
            //     if (accounts.length > 0) {
            //       setCurrentAccount(accounts[0]);
            //       const signature = await window.ethereum.request({
            //         method: "personal_sign",
            //         params: [provider, accounts],
            //       });
            //     }
            //   })
            //   .catch((e) => console.log(e));
          }}
        >
          Connect wallet
        </button>
      ) : null}

      {currentAccount != "" ? (
        <div className=" bg-blue-300 p-10 m-10 h-fit w-1/2 rounded-xl shadow-xl flex flex-col items-center">
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
              const gas_price = await provider.getGasPrice();
              const chainname = (await provider.getNetwork()).name;
              const balance = await signer.getBalance();

              const transactionResponse = await signer.sendTransaction({
                to: toaddress,
                value: ethers.utils.parseEther(amount),
              });
              const conf = await transactionResponse.wait();
              if (conf.status == 1) {
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
              sentstatus == true
                ? ` text-green-500 bg-green-100 `
                : ` text-red-500 bg-red-100`
            }`}
          >
            status : {`${sentstatus ? `Complect` :`Waiting`}`}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
