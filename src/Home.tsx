import {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";
import * as anchor from "@project-serum/anchor";
import { MatchesProgram } from "./rain/contract/matches";
import {getAtaForMint, toDate} from './utils';
import { Fanout, FanoutClient } from '@glasseaters/hydra-sdk'
import fetch from 'node-fetch';
import { usePriceInUsd } from '@strata-foundation/react'
import { getAssociatedAccountBalance } from "@strata-foundation/spl-utils";

import {
    PublicKey,
    Transaction,
    LAMPORTS_PER_SOL,
    Connection
} from "@solana/web3.js";
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import Countdown from "react-countdown";
import {Snackbar, Paper, LinearProgress, Chip, Input, Button, Link} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {AlertState} from './utils';
import {CTAButton, MintButton} from './MintButton';

import { TokenType } from "raindrops-cli/build/state/matches";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
const whatToksLol = {"AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq": "LEO", 
"Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG":"gamin",
"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":"USDC",
"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh":"COPE",
"8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA":"GRAPE",
"PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x":"PRISM", "openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79":"OPEN"
  }
const someDecs2 = {"AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq":9,
"Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG":9,
"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":6,
"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh":6,
"8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA":6,
"PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x":6, "openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79":9
  }
export const getOracle = async (
    seed: PublicKey,
    payer: PublicKey
  ): Promise<[PublicKey, number]> => {
    return await PublicKey.findProgramAddress(
      [Buffer.from("matches"), payer.toBuffer(), seed.toBuffer()],
      MATCHES_ID
    );
  };
  
export const MATCHES_ID = new anchor.web3.PublicKey(
    "mtchsiT6WoLQ62fwCoiHMCfXJzogtfru4ovY8tXKrjJ"
  );
  const fanout = new PublicKey("H3QZjfiZLQdREFQxSjBxezSfiUvNFEPmnoWVi4R6dLnd")

const cluster = process.env.REACT_APP_SOLANA_NETWORK!.toString();
const decimals = process.env.REACT_APP_SPL_TOKEN_TO_MINT_DECIMALS ? +process.env.REACT_APP_SPL_TOKEN_TO_MINT_DECIMALS!.toString() : 9;
const splTokenName = process.env.REACT_APP_SPL_TOKEN_TO_MINT_NAME ? process.env.REACT_APP_SPL_TOKEN_TO_MINT_NAME.toString() : "TOKEN";

const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
`;

const WalletAmount = styled.div`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 22px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
  border-radius: 18px !important;
  padding: 6px 16px;
  background-color: #4E44CE;
  margin: 0 auto;
`;

const NFT = styled(Paper)`
  min-width: 500px;
  margin: 0 auto;
  padding: 5px 20px 20px 20px;
  flex: 1 1 auto;
  background-color: var(--card-background-color) !important;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;

  h1 {
    margin: 0px;
  }
`;

const MintButtonContainer = styled.div`
  button.MuiButton-contained:not(.MuiButton-containedPrimary).Mui-disabled {
    color: #464646;
  }

  button.MuiButton-contained:not(.MuiButton-containedPrimary):hover,
  button.MuiButton-contained:not(.MuiButton-containedPrimary):focus {
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }
`;

const SolExplorerLink = styled.a`
  color: var(--title-text-color);
  border-bottom: 1px solid var(--title-text-color);
  font-weight: bold;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  outline: none;
  text-decoration: none;
  text-size-adjust: 100%;

  :hover {
    border-bottom: 2px solid var(--title-text-color);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 20px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
`;

const Price = styled(Chip)`
  position: absolute;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em !important;
  font-family: 'Patrick Hand', cursive !important;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  border-radius: 7px;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
`;

const BorderLinearProgress = styled(LinearProgress)`
  margin: 20px;
  height: 10px !important;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
  background-color: var(--main-text-color) !important;

  > div.MuiLinearProgress-barColorPrimary {
    background-color: var(--title-text-color) !important;
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.5));
  }
`;

export interface HomeProps {
    candyMachineId?: anchor.web3.PublicKey;
    connection: anchor.web3.Connection;
    txTimeout: number;
    rpcHost: string;
    network: WalletAdapterNetwork;
}
let first = true;
const Home = (props: HomeProps) => {
  const {sendTransaction} = useWallet()
  const [endts, setEndts] = useState<number>(new Date().getTime() - 1);
  const [balance, setBalance] = useState(0)
  const [thepots, setthepots] = useState<string>()
 
  const [index, setIndex] = useState<number>(0);
    const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
    const [isActive, setIsActive] = useState(false); // true when countdown completes or whitelisted
    const [solanaExplorerLink, setSolanaExplorerLink] = useState<string>("");
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [itemsRedeemed, setItemsRedeemed] = useState(0);
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [payWithSplToken, setPayWithSplToken] = useState(false);
    const [price, setPrice] = useState(0);
    const [priceLabel, setPriceLabel] = useState<string>("SOL");
    const [whitelistPrice, setWhitelistPrice] = useState(0);
    const [whitelistEnabled, setWhitelistEnabled] = useState(false);
    const [isBurnToken, setIsBurnToken] = useState(false);
    const [whitelistTokenBalance, setWhitelistTokenBalance] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [endDate, setEndDate] = useState<Date>();
    const [isPresale, setIsPresale] = useState(false);
    const [isWLOnly, setIsWLOnly] = useState(false);
    const [toplay, setToplay] = useState("");
    
const { connection } = useConnection()

const wallet = useWallet();

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined,
    });

    const [needTxnSplit, setNeedTxnSplit] = useState(true);
    const rpcUrl = props.rpcHost;
    const solFeesEstimation = 0.012; // approx of account creation fees

    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);


    const renderGoLiveDateCounter = ({days, hours, minutes, seconds}: any) => {
        return (
            <div><Card elevation={1}><h1>{days}</h1>Days</Card><Card elevation={1}><h1>{hours}</h1>
                Hours</Card><Card elevation={1}><h1>{minutes}</h1>Mins</Card><Card elevation={1}>
                <h1>{seconds}</h1>Secs</Card></div>
        );
    };

    const renderEndDateCounter = ({days, hours, minutes}: any) => {
        let label = "";
        if (days > 0) {
            label += days + " days "
        }
        if (hours > 0) {
            label += hours + " hours "
        }
        label += (minutes + 1) + " minutes left to blarg."
        if (days + hours + minutes <= 0){
          label = ""
        }
        return (
            <div><h3>{label}</h3></div>
        );
    };

    function throwConfetti(): void {
        confetti({
            particleCount: 400,
            spread: 70,
            origin: {y: 0.6},
        });
    }

    const onMint = async (
        beforeTransactions: Transaction[] = [],
        afterTransactions: Transaction[] = [],
    ) => {
            if (wallet.connected && wallet.publicKey) {
                setIsMinting(true);
                // @ts-ignore
                const provider = new anchor.Provider(connection, anchorWallet, {
                    preflightCommitment: 'processed',
                  });

  const idl = {"version":"0.1.0","name":"matches","instructions":[{"name":"createOrUpdateOracle","accounts":[{"name":"oracle","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateOrUpdateOracleArgs"}}]},{"name":"createMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateMatchArgs"}}]},{"name":"updateMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"args","type":{"defined":"UpdateMatchArgs"}}]},{"name":"updateMatchFromOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[]},{"name":"drainOracle","accounts":[{"name":"matchInstance","isMut":false,"isSigner":false},{"name":"oracle","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":true,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DrainOracleArgs"}}]},{"name":"drainMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":false,"isSigner":false}],"args":[]},{"name":"leaveMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"receiver","isMut":false,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"LeaveMatchArgs"}}]},{"name":"disburseTokensByOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"originalSender","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DisburseTokensByOracleArgs"}}]},{"name":"joinMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenTransferAuthority","isMut":false,"isSigner":true},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"sourceTokenAccount","isMut":true,"isSigner":false},{"name":"sourceItemOrPlayerPda","isMut":false,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"validationProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"JoinMatchArgs"}}]}],"accounts":[{"name":"Match","type":{"kind":"struct","fields":[{"name":"namespaces","type":{"option":{"vec":{"defined":"NamespaceAndIndex"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"lastOracleCheck","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"state","type":{"defined":"MatchState"}},{"name":"leaveAllowed","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}},{"name":"bump","type":"u8"},{"name":"currentTokenTransferIndex","type":"u64"},{"name":"tokenTypesAdded","type":"u64"},{"name":"tokenTypesRemoved","type":"u64"},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"joinAllowedDuringStart","type":"bool"}]}},{"name":"PlayerWinCallbackBitmap","type":{"kind":"struct","fields":[{"name":"matchKey","type":"publicKey"}]}},{"name":"WinOracle","type":{"kind":"struct","fields":[{"name":"finalized","type":"bool"},{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}}]}}],"types":[{"name":"CreateOrUpdateOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}},{"name":"seed","type":"publicKey"},{"name":"space","type":"u64"},{"name":"finalized","type":"bool"}]}},{"name":"DrainOracleArgs","type":{"kind":"struct","fields":[{"name":"seed","type":"publicKey"}]}},{"name":"CreateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"space","type":"u64"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"UpdateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"JoinMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"},{"name":"tokenEntryValidationProof","type":{"option":{"vec":{"array":["u8",32]}}}},{"name":"tokenEntryValidation","type":{"option":{"defined":"TokenValidation"}}}]}},{"name":"LeaveMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"}]}},{"name":"DisburseTokensByOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenDeltaProofInfo","type":{"option":{"defined":"TokenDeltaProofInfo"}}}]}},{"name":"TokenDeltaProofInfo","type":{"kind":"struct","fields":[{"name":"tokenDeltaProof","type":{"vec":{"array":["u8",32]}}},{"name":"tokenDelta","type":{"defined":"TokenDelta"}},{"name":"totalProof","type":{"vec":{"array":["u8",32]}}},{"name":"total","type":"u64"}]}},{"name":"Root","type":{"kind":"struct","fields":[{"name":"root","type":{"array":["u8",32]}}]}},{"name":"Callback","type":{"kind":"struct","fields":[{"name":"key","type":"publicKey"},{"name":"code","type":"u64"}]}},{"name":"ValidationArgs","type":{"kind":"struct","fields":[{"name":"instruction","type":{"array":["u8",8]}},{"name":"extraIdentifier","type":"u64"},{"name":"tokenValidation","type":{"defined":"TokenValidation"}}]}},{"name":"NamespaceAndIndex","type":{"kind":"struct","fields":[{"name":"namespace","type":"publicKey"},{"name":"indexed","type":"bool"},{"name":"inherited","type":{"defined":"InheritanceState"}}]}},{"name":"TokenDelta","type":{"kind":"struct","fields":[{"name":"from","type":"publicKey"},{"name":"to","type":{"option":"publicKey"}},{"name":"tokenTransferType","type":{"defined":"TokenTransferType"}},{"name":"mint","type":"publicKey"},{"name":"amount","type":"u64"}]}},{"name":"TokenValidation","type":{"kind":"struct","fields":[{"name":"filter","type":{"defined":"Filter"}},{"name":"isBlacklist","type":"bool"},{"name":"validation","type":{"option":{"defined":"Callback"}}}]}},{"name":"MatchState","type":{"kind":"enum","variants":[{"name":"Draft"},{"name":"Initialized"},{"name":"Started"},{"name":"Finalized"},{"name":"PaidOut"},{"name":"Deactivated"}]}},{"name":"PermissivenessType","type":{"kind":"enum","variants":[{"name":"TokenHolder"},{"name":"ParentTokenHolder"},{"name":"UpdateAuthority"},{"name":"Anybody"}]}},{"name":"InheritanceState","type":{"kind":"enum","variants":[{"name":"NotInherited"},{"name":"Inherited"},{"name":"Overridden"}]}},{"name":"TokenType","type":{"kind":"enum","variants":[{"name":"Player"},{"name":"Item"},{"name":"Any"}]}},{"name":"TokenTransferType","type":{"kind":"enum","variants":[{"name":"PlayerToPlayer"},{"name":"PlayerToEntrant"},{"name":"Normal"}]}},{"name":"Filter","type":{"kind":"enum","variants":[{"name":"None"},{"name":"All"},{"name":"Namespace","fields":[{"name":"namespace","type":"publicKey"}]},{"name":"Parent","fields":[{"name":"key","type":"publicKey"}]},{"name":"Mint","fields":[{"name":"mint","type":"publicKey"}]}]}},{"name":"ErrorCode","type":{"kind":"enum","variants":[{"name":"IncorrectOwner"},{"name":"Uninitialized"},{"name":"MintMismatch"},{"name":"TokenTransferFailed"},{"name":"NumericalOverflowError"},{"name":"TokenMintToFailed"},{"name":"TokenBurnFailed"},{"name":"DerivedKeyInvalid"},{"name":"InvalidStartingMatchState"},{"name":"InvalidUpdateMatchState"},{"name":"InvalidOracleUpdate"},{"name":"CannotDrainYet"},{"name":"CannotLeaveMatch"},{"name":"ReceiverMustBeSigner"},{"name":"PublicKeyMismatch"},{"name":"AtaShouldNotHaveDelegate"},{"name":"CannotEnterMatch"},{"name":"InvalidProof"},{"name":"RootNotPresent"},{"name":"MustPassUpObject"},{"name":"NoValidValidationFound"},{"name":"Blacklisted"},{"name":"NoTokensAllowed"},{"name":"InvalidValidation"},{"name":"NoDeltasFound"},{"name":"UsePlayerEndpoint"},{"name":"FromDoesNotMatch"},{"name":"CannotDeltaMoreThanAmountPresent"},{"name":"DeltaMintDoesNotMatch"},{"name":"DestinationMismatch"},{"name":"MatchMustBeInFinalized"},{"name":"AtaDelegateMismatch"},{"name":"OracleAlreadyFinalized"},{"name":"OracleCooldownNotPassed"},{"name":"MatchMustBeDrained"},{"name":"NoParentPresent"},{"name":"ReinitializationDetected"}]}}]}// await anchor.Program.fetchIdl(MATCHES_ID, provider);

  const program = new anchor.Program(idl as anchor.Idl, MATCHES_ID, provider);

 
                const anchorProgram =  new MatchesProgram({
                    id: MATCHES_ID,
                    // @ts-ignore
                    program,
                  });
                  console.log(anchorProgram)
                let blarg = new PublicKey("B2shfZUYv4o39WkrDBhhgwAmp32azWpSpGZtFj1nNEyj")
                const config = (await (await fetch('https://ablarg.herokuapp.com/blargs')).json()) 
            
                console.log(index)
                // @ts-ignore
                  const setup = config.tokensToJoin[index];
                  console.log(setup)

                      // Generate a new wallet keypair and airdrop SOL
                      const fromWallet = anchorWallet?.publicKey// Keypair.generate();
                     
                      // Generate a new wallet to receive newly minted token
                      const toWallet = fanout//Keypair.generate();
                  
                      // Create new token mint
                      const mint = new PublicKey(setup.mint)//await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
                  
                      // Get the token account of the fromWallet address, and if it does not exist, create it
                      // @ts-ignore
                      let tokAccs = await connection.getTokenAccountsByOwner(anchorWallet.publicKey as PublicKey,{mint:new PublicKey(setup.mint)})
                      let bal = 0
                      let winning = 0 
                      let winner: PublicKey
                for (var i in tokAccs.value){
                  try {
                    let eh1 = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
                   if (eh1.value.uiAmount || 0 > winning ){
                      winning = eh1.value.uiAmount || 0
                      winner = tokAccs.value[i].pubkey
                    }

                  } catch (err){
                    console.log('wat')
                  }
                }
                // @ts-ignore
                      const fromTokenAccount = winner 
                       tokAccs = await connection.getTokenAccountsByOwner(toWallet as PublicKey,{mint:new PublicKey(setup.mint)})
                       winning = 0 
                for (var i in tokAccs.value){
                  try {
                    let eh1 = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
                   if (eh1.value.uiAmount || 0 > winning ){
                      winning = eh1.value.uiAmount || 0
                      winner = tokAccs.value[i].pubkey
                    }

                  } catch (err){
                    console.log('wat')
                  }
                }
                // @ts-ignore
                      const toTokenAccount = winner 
                  
                     
                      // Transfer the new token to the "toTokenAccount" we just created
                      const transaction = new anchor.web3.Transaction().add(
                        Token.createTransferInstruction(
                            TOKEN_PROGRAM_ID,
                            fromTokenAccount,
                            toTokenAccount,
                            // @ts-ignore
                            anchorWallet.publicKey,
                            [],
                            Math.ceil(setup.amount / 100 * 10)
                        )
                      )
                      
                  let stupidjare = await anchorProgram.joinMatch (
                    {
                        // @ts-ignore
                      amount: new anchor.BN(setup.amount),
                      // @ts-ignore
                      escrowBump: null,
                      tokenEntryValidation: null,
                      tokenEntryValidationProof: null,
                    },
                    {
                        // @ts-ignore
                      tokenMint: new PublicKey(setup.mint),
                      sourceTokenAccount: null,
                      tokenTransferAuthority: null,
                      // @ts-ignore
                      validationProgram: setup.validationProgram
                      // @ts-ignore
                        ? new PublicKey(setup.validationProgram)
                        : null,
                    },
                    {
                      winOracle: config.winOracle
                        ? new PublicKey(config.winOracle)
                        : (
                            await getOracle(
                              new PublicKey(config.oracleState.seed),
            
                              config.oracleState.authority
                                ? new PublicKey(config.oracleState.authority)
                                : wallet.publicKey
                            )
                          )[0],
                          // @ts-ignore
                      sourceType: setup.sourceType as TokenType,
                      index:new anchor.BN(index),
                    }
                  );
                  transaction.add(...stupidjare.instructions)
                  transaction.recentBlockhash = await (await connection.getLatestBlockhash()).blockhash
                  transaction.feePayer = anchorWallet?.publicKey
                  transaction.partialSign(...stupidjare.signers)
                      const signature = await sendTransaction(transaction, connection)
                      
                      const response = await connection.confirmTransaction(signature, 'processed')
                      console.log('response', response)
                      
                  const jconfig = (await (await fetch('https://ablarg.herokuapp.com/join?me=' + wallet.publicKey.toBase58() + '&tok=' + setup.mint + '&amount=' + setup.amount.toString())).json()) 
                  
    const winOracle = jconfig.winOracle
    ? new PublicKey(jconfig.winOracle)
    : (
        await getOracle(
          new PublicKey(jconfig.oracleState.seed),

          jconfig.oracleState.authority
            ? new PublicKey(jconfig.oracleState.authority)
            : wallet.publicKey
        )
      )[0];
  const oracleInstance = await anchorProgram.fetchOracle(winOracle);
  console.log(jconfig)
  for (let i = 0; i < oracleInstance.object.tokenTransfers.length; i++) {
    const tfer = oracleInstance.object.tokenTransfers[i];
  /*
    setTimeout(async function(){
    await anchorProgram.disburseTokensByOracle(
      {
        // @ts-ignore
        escrowBump: null,
        tokenDeltaProofInfo: null,
      },
      {
        winOracle,
      },
      {
        tokenDelta: tfer,
      }
    );
    }, 13800) */
  }
             
            }     
//            const hehe = (await (await fetch('https://ablarg.herokuapp.com/leavejoinlol')).json()) 
                   
    };
    useEffect(() => {
        (async () => {
            if (anchorWallet) {
   
   setTimeout(async function(){
       if (first){
     first = false;
     
     try {
 
      let thepotsTemp = await (await fetch("https://ablarg.herokuapp.com/totals")).text()
      // @ts-ignore 
   let  ablargs = thepotsTemp.split(' &&').join().replace(',','').split(' ')
   // @ts-ignore 
let blarg2 = []
   // @ts-ignore 

let blargwhichs = []
// @ts-ignore 
for (var bla in ablargs){
  // @ts-ignore 
  if (bla % 2 == 0){
      
    // @ts-ignore 
  blargwhichs.push(parseFloat(ablargs[bla]))
  }
  // @ts-ignore 
    if (bla % 2 == 1){

      // @ts-ignore 
    blarg2.push(parseFloat(ablargs[bla]))
    }

}
for (var i in blargwhichs){
  let derp = usePriceInUsd(new PublicKey(blargwhichs[i]))
  thepotsTemp = thepotsTemp.replace(blarg2[i].toString(), 
    blarg2[i].toString() + ' / ' +  (blarg2[i] * (derp as number)).toString())
}
      if (thepots){

      
      if (thepotsTemp.length >= (thepots as string).length){
      console.log(thepotsTemp)
      for (var which in whatToksLol){
        console.log(which)
        // @ts-ignore
        console.log(whatToksLol[which])
        // @ts-ignore
thepotsTemp = thepotsTemp.replace(which, whatToksLol[which])
      }
      setthepots(thepotsTemp)
  console.log(thepots)
  }
    }
   else {
     if (thepotsTemp.length > 10){
    console.log(thepotsTemp)
    for (var which in whatToksLol){
      console.log(which)
      // @ts-ignore
      console.log(whatToksLol[which])
      // @ts-ignore
thepotsTemp = thepotsTemp.replace(which, whatToksLol[which])
    }
    setthepots(thepotsTemp)
console.log(thepots)
     }
  }
}
  catch (err){
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)
  
  }
    try {
        console.log(anchorWallet.publicKey as PublicKey,{mint:mintPublicKey})
      const tokAccs = await connection.getTokenAccountsByOwner(anchorWallet.publicKey as PublicKey,{mint:mintPublicKey})
      let bal = 0
for (var i in tokAccs.value){
  try {
    let eh1 = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
    let eh2 = eh1.value.uiAmount || 0
bal+= eh2
  }
  catch(err){
console.log(err)
  }
  setBalance(bal)
}
      // @ts-ignore
  //var tokenAmount = await getAssociatedAccountBalance(connection2, wallet.publicKey, mintPublicKey)
  // @ts-ignore
  //setBalance( tokenAmount.uiAmount)
  }
  catch (err){
  console.log(err)
  }

  
   setInterval(async function(){
     
     try {
 
       let thepotsTemp = await (await fetch("https://ablarg.herokuapp.com/totals")).text()
       if (thepots){
 
        // @ts-ignore 
   let  ablargs = thepotsTemp.split(' &&').join().replace(',','').split(' ')
   // @ts-ignore 
let blarg2 = []
   // @ts-ignore 

let blargwhichs = []
// @ts-ignore 
for (var bla in ablargs){
  // @ts-ignore 
  if (bla % 2 == 0){
      
    // @ts-ignore 
  blargwhichs.push(parseFloat(ablargs[bla]))
  }
  // @ts-ignore 
    if (bla % 2 == 1){

      // @ts-ignore 
    blarg2.push(parseFloat(ablargs[bla]))
    }

}
for (var i in blargwhichs){
  let derp = usePriceInUsd(new PublicKey(blargwhichs[i]))
  thepotsTemp = thepotsTemp.replace(blarg2[i].toString(), 
    blarg2[i].toString() + ' / ' +  (blarg2[i] * (derp as number)).toString())
}
       if (thepotsTemp.length >= (thepots as string).length){
       console.log(thepotsTemp)
       for (var which in whatToksLol){
        console.log(which)
        // @ts-ignore
        console.log(whatToksLol[which])
        // @ts-ignore
thepotsTemp = thepotsTemp.replace(which, whatToksLol[which])
      }
       setthepots(thepotsTemp)
   console.log(thepots)
   }
     }
    else {
      if (thepotsTemp.length > 10){
     console.log(thepotsTemp)
     for (var which in whatToksLol){
      console.log(which)
      // @ts-ignore
      console.log(whatToksLol[which])
      // @ts-ignore
thepotsTemp = thepotsTemp.replace(which, whatToksLol[which])
    }
     setthepots(thepotsTemp)
 console.log(thepots)
      }
   }
 }
   catch (err){
     console.log(err)
     console.log(err)
     console.log(err)
     console.log(err)
     console.log(err)
   
   }
     try {
         console.log(anchorWallet.publicKey as PublicKey,{mint:mintPublicKey})
       const tokAccs = await connection.getTokenAccountsByOwner(anchorWallet.publicKey as PublicKey,{mint:mintPublicKey})
       let bal = 0
 for (var i in tokAccs.value){
   try {
     let eh1 = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
     let eh2 = eh1.value.uiAmount || 0
 bal+= eh2
   }
   catch(err){
 console.log(err)
   }
   setBalance(bal)
 }
       // @ts-ignore
   //var tokenAmount = await getAssociatedAccountBalance(connection2, wallet.publicKey, mintPublicKey)
   // @ts-ignore
   //setBalance( tokenAmount.uiAmount)
   }
   catch (err){
   console.log(err)
   }
 
   
 }, 12500)     
   }
 }, 500)
              const ts = (await (await fetch('https://ablarg.herokuapp.com/endts')).json()) 
            console.log(ts)
            setEndts(ts)
              const config = (await (await fetch('https://ablarg.herokuapp.com/blargs')).json()) 
              let temp = "To play, select a number above and it'll cost u this much for u (and ur team) to become winna: \n"
            for (var token of config.tokensToJoin){
              // @ts-ignore
              temp+= whatToksLol[token.mint] + ': ' + token.amount / 10 ** (parseInt(someDecs2[token.mint]) + parseInt(someDecs2[token.mint]) * 0.1) + '\n'
            }
            temp+="I'm actually lazy ppl plz look up which token r which for now. :)"
            setToplay(temp)
                //const balance = await props.connection.getBalance(anchorWallet!.publicKey);
               // setBalance(balance / LAMPORTS_PER_SOL);
            }
        })();
    }, [anchorWallet, props.connection]);

function changeIndex(e: any){
    try {
    setIndex(parseInt(e.target.value))
    }
    catch (err){

    }
}
const mintPublicKey = new PublicKey("Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG")
var [shares, setShares] = useState("1.38");

var connection2 = new Connection('https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");

async function onChange(e: any){
    e.preventDefault()
    console.log(e.target.value)
    setShares(e.target.value)
    }

async function claim(){
  if (wallet){    var fanoutSdk: FanoutClient;
  // @ts-ignore
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });
  fanoutSdk = new FanoutClient(
    connection2,
    provider.wallet
);
  let ixes = [[]]
  let acount = 0
  let acount2 = 0

for (var der of Object.keys(someDecs2)){
  acount++
var ix = await fanoutSdk.distributeTokenMemberInstructions(
  {
    
    distributeForMint: true,
    // @ts-ignore
    fanout: fanout,
    fanoutMint: new PublicKey(der),
    // @ts-ignore
    membershipMint: mintPublicKey,
   // @ts-ignore
    member: wallet.publicKey,
    // @ts-ignore
    payer: wallet.publicKey

  }
);
for (var bla of ix.instructions){
  // @ts-ignore
  ixes[acount2].push(bla)
}
if (acount > 1){
  acount = 0
  acount2++
  ixes.push([])


}
}
console.log(ixes.length)
for (var i = 0; i <= acount2; i++){
  if (i in ixes){
  if (ixes[i].length > 0){
var  tx2 = await fanoutSdk.sendInstructions(
  [...ixes[i]],
  // [...ix.instructions, ...ix3.instructions],
  [],
  // @ts-ignore
  wallet.publicKey
  );
  }
}
}
}
}
async function doit(){

if (wallet){

  var fanoutSdk: FanoutClient;
  // @ts-ignore
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });
  fanoutSdk = new FanoutClient(
    connection2,
    provider.wallet
);
let blarg = await fanoutSdk.fetch<Fanout>(fanout, Fanout)
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log(blarg.membershipMint?.toBase58())
console.log( (parseFloat(shares) * 10 ** 9))
var  ixs = await fanoutSdk.stakeTokenMemberInstructions(
      {
          
          shares:  (parseFloat(shares) * 10 ** 9),
          // @ts-ignore
          fanout: fanout,
          membershipMint: mintPublicKey,
         // @ts-ignore
          member: wallet.publicKey,
          // @ts-ignore
          payer: wallet.publicKey
      }
  );var tx = await fanoutSdk.sendInstructions(
    ixs.instructions,
    [],
    // @ts-ignore
    wallet.publicKey
);

}
}

/*
console.log(321)
const { info: tokenBonding2 } = useTokenBondingFromMint(mintPublicKey);
const { price: price2, loading: l2 } = useLivePrice(tokenBonding2?.publicKey);
if (price2){
  if (!l2 && !isNaN(price2)){
 // console.log(price2)
  }
}
*/
async function us(){

  if (wallet){
    var fanoutSdk: FanoutClient;
  // @ts-ignore
  const provider = new anchor.Provider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });
  fanoutSdk = new FanoutClient(
    connection2,
    provider.wallet
);
  
  await fanoutSdk.unstakeTokenMember({
      // @ts-ignore
    fanout: fanout,
    // @ts-ignore
    member: wallet.publicKey,
    // @ts-ignore
    payer: wallet.publicKey
}
);
  }

}
    return (
        <main>
            <MainContainer>
                <WalletContainer>
                    <Wallet>
                        {wallet ?
                            <ConnectButton/> :
                            <ConnectButton>Connect Wallet</ConnectButton>}
                    </Wallet>
                </WalletContainer>
                <br/>
                <MintContainer>
                    <DesContainer>
                        <NFT elevation={3}>
                            <h2>the thepots presently are factually inarguably verifiably thusly:</h2>
                            <h3>{thepots}</h3>
                            <br/>
                            <div><Price
                                label={isActive && whitelistEnabled && (whitelistTokenBalance > 0) ? (whitelistPrice + " " + priceLabel) : (price + " " + priceLabel)}/><Image
                                src="cool-cats.gif"
                                alt="NFT To Mint"/></div>
                            <br/>
                            
                            <MintButtonContainer>
                            { // @ts-ignore 
                            <Countdown
                                date={new Date(endts)}
                                onMount={({completed}) => completed && setIsEnded(true)}
                                onComplete={() => {
                                    setIsEnded(true);
                                }}
                                renderer={renderEndDateCounter}
                              /> }
                               { !wallet && 
                                        <ConnectButton>Connect Wallet</ConnectButton> }
                               { wallet && 
                               <div>
                                 <h3>Hey type in 0 for our collective - w o w - or 1 for our social token <br />- mmm - then after that idk this is guesswork <br /> lol <br />2 for usdc, 3 for cope, 4 for grape, 5 for prism</h3>
                                 
                                 <Input type="text" onChange={changeIndex} placeholder={"1"} />

                                 <h3>I am lazy and atm you need 1 of whatever token. the first cool bit is that <br /> anyone who becomes winner for they team 1. increases cost to play for they team 2. decrease cost to play for all oppsin teams <br /> ohhh, nash.. nash</h3>
                                 <h1>6 for OPEN</h1> <h3>ayy, well, {toplay} </h3>   <h3>anyways all the other rules from all the other fair3ds remain the same: <br /> you can become winner at any time, with any of the below buttons. <br  /> if you do, the timer resets to now + 24hrs <br /> altho, now we're raindrops. <br /> so instead of 1 party winning lions share - well, we fck with the nashisms kiddos. <br /> redacted_j wen onchain referrals? <br /> dont forget to stake ur tokens tho cuz the hydras arguably the only ppl extractin value here <br /> ily </h3>       <MintButton

                                                onMint={onMint}
                                            />
</div>
                                        }
                            </MintButtonContainer>
                            <br/>
                            {wallet && isActive && solanaExplorerLink &&
                              <SolExplorerLink href={solanaExplorerLink} target="_blank">View on
                                Solscan</SolExplorerLink>}
                        </NFT>
                    </DesContainer>
                </MintContainer>
                <div>
<br />
you hodl {balance} social tok, grab moar here: <Link href={"https://app.strataprotocol.com/swap/Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG"} >nfa</Link>
<br />
mm pinatadrastick... <br /> <br /> 

        <CTAButton onClick={claim} >Distribute to self..</CTAButton>
<br />
<Input  style={{color:"black", fontSize: "30px;", backgroundColor: "grey"}} type="text" onInput={onChange} value={shares} />
<br /><br />


<CTAButton  onClick={doit} >Stake</CTAButton>
<br />

<CTAButton  onClick={us} >Unstake All</CTAButton>
<br />
                </div>
            </MainContainer>
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({...alertState, open: false})}
            >
                <Alert
                    onClose={() => setAlertState({...alertState, open: false})}
                    severity={alertState.severity}
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </main>
    );
};

export default Home;
