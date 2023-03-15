import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from "react";
import Web3 from "web3";

const MY_CONTRACT_ABI = [
  {
    inputs: [],
    name: "getGreeting",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "_myString", type: "string" }],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const MY_CONTRACT_ADDRESS = "0x8581F6a58B08BcEED7FAaeDe6CB4142F6F54Db04";

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [address, setAddress] = useState("");
  const [myString, setMyString] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function loadWeb3() {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          throw new Error("No Ethereum provider found");
        }

        await ethereum.enable();

        const web3 = new Web3(ethereum);
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        setAddress(accounts[0]);

        const balance = await web3.eth.getBalance(accounts[0]);
        const balanceInEther = web3.utils.fromWei(balance, "ether");
        setBalance(balanceInEther);
      } catch (error) {
        console.error(error.message);
      }
    }

    loadWeb3();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const contract = new web3.eth.Contract(
        MY_CONTRACT_ABI,
        MY_CONTRACT_ADDRESS
      );

      await contract.methods
        .setGreeting(inputValue)
        .send({ from: accounts[0] });

      const updatedString = await contract.methods.getGreeting().call();
      setMyString(updatedString);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getValue = async (event) => {
    try {
      const contract = new web3.eth.Contract(
        MY_CONTRACT_ABI,
        MY_CONTRACT_ADDRESS
      );

      const updatedString = await contract.methods.getGreeting().call();
      setMyString(updatedString);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Head>
        <title>Create A Fullstack dApp</title>
        <meta name="description" content="ChainIDE Education" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/chainidelogo.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://chainide.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/chainide.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/chainide.svg"
            alt="Next.js Logo"
            width={300}
            height={100}
            priority
          />
        </div>
        <div className={styles.update}>
          <p className={styles.description} >Current wallet address: {address}</p>
          <p className={styles.description} >Balance: {balance} ETH</p>

          <div>
            <button type="button" className={styles.button} onClick={getValue}>
              Check Latest Greeting
            </button>
            <div className={styles.description} >Latest Greeting: {myString}</div>
          </div>




          <form onSubmit={handleSubmit}>
            <label className={styles.description} >
              Update your value:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                required
              />
            </label>

            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </div>

        <div className={styles.grid}>
          <a
            href="https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/1.-ethereum-ide/quick-demo"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Create <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Create your smart contract using ChainIDE.
            </p>
          </a>

          <a
            href="https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/1.-ethereum-ide/quick-demo"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Compile & Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Compile your smart contracts to ChainIDE integrated compiler and deploy to any blockchain that suits you!
            </p>
          </a>

          <a
            href="https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/1.-ethereum-ide/quick-demo"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Interact <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Interact with the deployed smart contract using ChainIDE built-in interaction panel or build your own interface using React in ChainIDE.
            </p>
          </a>

          <a
            href="https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/1.-ethereum-ide/quick-demo"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Create your amazing dApps.
            </p>
          </a>

        </div>

        <footer className={styles.footer}>
          Made with &#10084; by ChainIDE
        </footer>
      </main>
    </>
  )
}







