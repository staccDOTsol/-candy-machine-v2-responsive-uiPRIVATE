

import {Connection,Account, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import * as anchor from '@project-serum/anchor'
import * as fs from 'fs';
import { MatchesProgram } from "./src/contract/matches";
import { MatchState, TokenTransferType, TokenType } from "./src/state/matches";

import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
let totals = {}
let firstlala = true;
const someToks = ["AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq","Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG",("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"),
("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),
("PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x")
,"openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"  ]
const someDecs = {"AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq":9,"Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG":9,"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":6,
"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh":6,
"8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA":6,
"PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x":6, "openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79":9
  }

  for (var mintKey of someToks){
    // @ts-ignore
  totals[mintKey] = 1
  
  }
  let currp3: PublicKey;
const { exec } = require('child_process');
//console.log(new Date().getTime())
let endts = new Date().getTime() + 1000 * 60 * 60 * 24;
//console.log(endts)
const express = require("express");
const path = require("path");
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());

let config: any = {}
let oldTotal: any = 0 
let total: any = 0
let doOulala = true
const numberFormater = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = {
  format: (val?: any) => {
    if (!val) {
      return '--';
    }

    return numberFormater.format(val);
  },
  asNumber: (val?: any) => {
    if (!val) {
      return undefined;
    }

    return val.toNumber() ;
  },
};


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

app.get(`/join`, async (req: any, res: any)  => {
  let aresponse = {};
  try {
let query = req.query; 
let me = query.me; 
let tok = query.tok; 
let amount = query.amount;

let oops  
let oldoops = -1
const connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
const connection2 = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");

// @ts-ignore
 let ttotals = {}

  
for (var mintKey of someToks){


const tokAccs = await connection.getTokenAccountsByOwner( (new PublicKey("4StAPKUFZ83yXaufSSV5S3wp5uQa7RANTYpCRqzpLTPW")),{mint: new PublicKey(mintKey)})
for (var i in tokAccs.value){
const balance = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
//console.log(balance.value.uiAmountString)
//  //console.log(balance)
if (balance.value.uiAmount){
if (balance.value.uiAmount >= 0){
//console.log(mintKey + ': ' + balance.value.uiAmountString)
// @ts-ignore
ttotals[mintKey] = balance.value.uiAmount + 1
}
}
}
}
totals = ttotals
 
    //@ts-ignore
  config = {
  "winOracle": null,
  "matchState": { "initialized": true },
  "winOracleCooldown": 10,
  "space": 300,
  "minimumAllowedEntryTime": null,
  "tokenEntryValidation": null,
  "authority": "",
  "leaveAllowed": true,
  "joinAllowedDuringStart": true,
  "oracleState": {
    "seed": "BCUfkAyJYpxBpjT7AhnHSbW2PnUMMhoKfDSdmd5fga1m",
    "authority": "8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy",
    "finalized": false,
    "tokenTransferRoot": null,
    "tokenTransfers": [
    
    ]
  },
  "tokensToJoin": [ 
  ]}
total = 0
// @ts-ignore
   for (var t of Object.keys(totals)){
    // @ts-ignore
    total += totals[t]
   }
   let inverse_bruh = {}
   let c = -1
   for (var t of Object.keys(totals)){
     c++
    // @ts-ignore
    inverse_bruh[t] = totals[t] / total
config.tokensToJoin.push({"mint":t,
// @ts-ignore
"amount":Math.ceil(0.1 * 10 ** someDecs[t] / inverse_bruh[t]),
"sourceType":1,
"index":c,
"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"})


   }
    endts = new Date().getTime() + 1000 * 60 * 60 * 24;
     oldTotal = total;
     console.log(138)
   
     config.oracleState.tokenTransfers = [{
      "from": me,
      "to": currp3.toBase58(),
      "tokenTransferType": { "normal": true },
      
      "mint": tok,
      "amount": Math.ceil(parseInt(amount) / 100 * 25)
   }]
   /*
  let  wallie = Keypair.fromSecretKey((new Uint8Array(JSON.parse((await fs.readFileSync('./p0')).toString()))));
let    anchorWallet = new NodeWallet(wallie);

 let   provider = new anchor.Provider(connection, anchorWallet, {
   preflightCommitment: 'processed',
 });


 let idl = {"version":"0.1.0","name":"matches","instructions":[{"name":"createOrUpdateOracle","accounts":[{"name":"oracle","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateOrUpdateOracleArgs"}}]},{"name":"createMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateMatchArgs"}}]},{"name":"updateMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"args","type":{"defined":"UpdateMatchArgs"}}]},{"name":"updateMatchFromOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[]},{"name":"drainOracle","accounts":[{"name":"matchInstance","isMut":false,"isSigner":false},{"name":"oracle","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":true,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DrainOracleArgs"}}]},{"name":"drainMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":false,"isSigner":false}],"args":[]},{"name":"leaveMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"receiver","isMut":false,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"LeaveMatchArgs"}}]},{"name":"disburseTokensByOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"originalSender","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DisburseTokensByOracleArgs"}}]},{"name":"joinMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenTransferAuthority","isMut":false,"isSigner":true},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"sourceTokenAccount","isMut":true,"isSigner":false},{"name":"sourceItemOrPlayerPda","isMut":false,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"validationProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"JoinMatchArgs"}}]}],"accounts":[{"name":"Match","type":{"kind":"struct","fields":[{"name":"namespaces","type":{"option":{"vec":{"defined":"NamespaceAndIndex"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"lastOracleCheck","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"state","type":{"defined":"MatchState"}},{"name":"leaveAllowed","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}},{"name":"bump","type":"u8"},{"name":"currentTokenTransferIndex","type":"u64"},{"name":"tokenTypesAdded","type":"u64"},{"name":"tokenTypesRemoved","type":"u64"},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"joinAllowedDuringStart","type":"bool"}]}},{"name":"PlayerWinCallbackBitmap","type":{"kind":"struct","fields":[{"name":"matchKey","type":"publicKey"}]}},{"name":"WinOracle","type":{"kind":"struct","fields":[{"name":"finalized","type":"bool"},{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}}]}}],"types":[{"name":"CreateOrUpdateOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}},{"name":"seed","type":"publicKey"},{"name":"space","type":"u64"},{"name":"finalized","type":"bool"}]}},{"name":"DrainOracleArgs","type":{"kind":"struct","fields":[{"name":"seed","type":"publicKey"}]}},{"name":"CreateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"space","type":"u64"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"UpdateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"JoinMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"},{"name":"tokenEntryValidationProof","type":{"option":{"vec":{"array":["u8",32]}}}},{"name":"tokenEntryValidation","type":{"option":{"defined":"TokenValidation"}}}]}},{"name":"LeaveMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"}]}},{"name":"DisburseTokensByOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenDeltaProofInfo","type":{"option":{"defined":"TokenDeltaProofInfo"}}}]}},{"name":"TokenDeltaProofInfo","type":{"kind":"struct","fields":[{"name":"tokenDeltaProof","type":{"vec":{"array":["u8",32]}}},{"name":"tokenDelta","type":{"defined":"TokenDelta"}},{"name":"totalProof","type":{"vec":{"array":["u8",32]}}},{"name":"total","type":"u64"}]}},{"name":"Root","type":{"kind":"struct","fields":[{"name":"root","type":{"array":["u8",32]}}]}},{"name":"Callback","type":{"kind":"struct","fields":[{"name":"key","type":"publicKey"},{"name":"code","type":"u64"}]}},{"name":"ValidationArgs","type":{"kind":"struct","fields":[{"name":"instruction","type":{"array":["u8",8]}},{"name":"extraIdentifier","type":"u64"},{"name":"tokenValidation","type":{"defined":"TokenValidation"}}]}},{"name":"NamespaceAndIndex","type":{"kind":"struct","fields":[{"name":"namespace","type":"publicKey"},{"name":"indexed","type":"bool"},{"name":"inherited","type":{"defined":"InheritanceState"}}]}},{"name":"TokenDelta","type":{"kind":"struct","fields":[{"name":"from","type":"publicKey"},{"name":"to","type":{"option":"publicKey"}},{"name":"tokenTransferType","type":{"defined":"TokenTransferType"}},{"name":"mint","type":"publicKey"},{"name":"amount","type":"u64"}]}},{"name":"TokenValidation","type":{"kind":"struct","fields":[{"name":"filter","type":{"defined":"Filter"}},{"name":"isBlacklist","type":"bool"},{"name":"validation","type":{"option":{"defined":"Callback"}}}]}},{"name":"MatchState","type":{"kind":"enum","variants":[{"name":"Draft"},{"name":"Initialized"},{"name":"Started"},{"name":"Finalized"},{"name":"PaidOut"},{"name":"Deactivated"}]}},{"name":"PermissivenessType","type":{"kind":"enum","variants":[{"name":"TokenHolder"},{"name":"ParentTokenHolder"},{"name":"UpdateAuthority"},{"name":"Anybody"}]}},{"name":"InheritanceState","type":{"kind":"enum","variants":[{"name":"NotInherited"},{"name":"Inherited"},{"name":"Overridden"}]}},{"name":"TokenType","type":{"kind":"enum","variants":[{"name":"Player"},{"name":"Item"},{"name":"Any"}]}},{"name":"TokenTransferType","type":{"kind":"enum","variants":[{"name":"PlayerToPlayer"},{"name":"PlayerToEntrant"},{"name":"Normal"}]}},{"name":"Filter","type":{"kind":"enum","variants":[{"name":"None"},{"name":"All"},{"name":"Namespace","fields":[{"name":"namespace","type":"publicKey"}]},{"name":"Parent","fields":[{"name":"key","type":"publicKey"}]},{"name":"Mint","fields":[{"name":"mint","type":"publicKey"}]}]}},{"name":"ErrorCode","type":{"kind":"enum","variants":[{"name":"IncorrectOwner"},{"name":"Uninitialized"},{"name":"MintMismatch"},{"name":"TokenTransferFailed"},{"name":"NumericalOverflowError"},{"name":"TokenMintToFailed"},{"name":"TokenBurnFailed"},{"name":"DerivedKeyInvalid"},{"name":"InvalidStartingMatchState"},{"name":"InvalidUpdateMatchState"},{"name":"InvalidOracleUpdate"},{"name":"CannotDrainYet"},{"name":"CannotLeaveMatch"},{"name":"ReceiverMustBeSigner"},{"name":"PublicKeyMismatch"},{"name":"AtaShouldNotHaveDelegate"},{"name":"CannotEnterMatch"},{"name":"InvalidProof"},{"name":"RootNotPresent"},{"name":"MustPassUpObject"},{"name":"NoValidValidationFound"},{"name":"Blacklisted"},{"name":"NoTokensAllowed"},{"name":"InvalidValidation"},{"name":"NoDeltasFound"},{"name":"UsePlayerEndpoint"},{"name":"FromDoesNotMatch"},{"name":"CannotDeltaMoreThanAmountPresent"},{"name":"DeltaMintDoesNotMatch"},{"name":"DestinationMismatch"},{"name":"MatchMustBeInFinalized"},{"name":"AtaDelegateMismatch"},{"name":"OracleAlreadyFinalized"},{"name":"OracleCooldownNotPassed"},{"name":"MatchMustBeDrained"},{"name":"NoParentPresent"},{"name":"ReinitializationDetected"}]}}]}// await anchor.Program.fetchIdl(MATCHES_ID, provider);

let program = new anchor.Program(idl as anchor.Idl, MATCHES_ID, provider);


const anchorProgram =  new MatchesProgram({
    id: MATCHES_ID,
    // @ts-ignore
    program,
  });
  try {
  let blarggg123 =     await anchorProgram.createOrUpdateOracle({
    seed: config.oracleState.seed,
    // @ts-ignore
    oracleBump: null,
    authority: config.oracleState.authority
      ? new PublicKey(config.oracleState.authority)
      : wallie.publicKey,
    tokenTransferRoot: config.oracleState.tokenTransferRoot,
    tokenTransfers: config.oracleState.tokenTransfers,
    space: config.space ? new anchor.BN(config.space) : new anchor.BN(150),
    finalized: config.oracleState.finalized,
  });
} catch (err){
  let blarggg123 =     await anchorProgram.createOrUpdateOracle({
    seed: config.oracleState.seed,
    // @ts-ignore
    oracleBump: null,
    authority: config.oracleState.authority
      ? new PublicKey(config.oracleState.authority)
      : wallie.publicKey,
    tokenTransferRoot: config.oracleState.tokenTransferRoot,
    tokenTransfers: config.oracleState.tokenTransfers,
    space: config.space ? new anchor.BN(config.space) : new anchor.BN(150),
    finalized: config.oracleState.finalized,
  });
}
try {
  let blarggg = await anchorProgram.updateMatchFromOracle(
    {},
    {
      winOracle: config.winOracle
        ? new PublicKey(config.winOracle)
        : (
            await getOracle(
              new PublicKey(config.oracleState.seed),

              config.oracleState.authority
                ? new PublicKey(config.oracleState.authority)
                : wallie.publicKey
            )
          )[0],
    },
    {}
  );
} catch (err){
  let blarggg = await anchorProgram.updateMatchFromOracle(
    {},
    {
      winOracle: config.winOracle
        ? new PublicKey(config.winOracle)
        : (
            await getOracle(
              new PublicKey(config.oracleState.seed),

              config.oracleState.authority
                ? new PublicKey(config.oracleState.authority)
                : wallie.publicKey
            )
          )[0],
    },
    {}
  );
} */
   /*
     await fs.writeFileSync('./blarggg.json', JSON.stringify(config))

     var yourscript = exec('sh blargggg.sh',
        (error: any, stdout: any, stderr: any) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
*/
  }
  catch (err){
    console.log(err)
  }
  console.log('omg 200')
  res.status(200).json(config);
})
async function oulala() {

  const connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
  const connection2 = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
  
  try {

    
    let oops  
    let oldoops = -1
    const connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
    const connection2 = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
    
// @ts-ignore
 let ttotals = {}

for (var mintKey of someToks){


  const tokAccs = await connection.getTokenAccountsByOwner( (new PublicKey("4StAPKUFZ83yXaufSSV5S3wp5uQa7RANTYpCRqzpLTPW")),{mint: new PublicKey(mintKey)})
  for (var i in tokAccs.value){
  const balance = await connection.getTokenAccountBalance(tokAccs.value[i].pubkey)
  //console.log(balance.value.uiAmountString)
  //  //console.log(balance)
  if (balance.value.uiAmount){
  if (balance.value.uiAmount >= 0){
  //console.log(mintKey + ': ' + balance.value.uiAmountString)
  // @ts-ignore
  ttotals[mintKey] = balance.value.uiAmount + 1
  }
  }
  }
  }
  totals = ttotals
   
      //@ts-ignore
    config = {
    "winOracle": null,
    "matchState": { "initialized": true },
    "winOracleCooldown": 10,
    "space": 300,
    "minimumAllowedEntryTime": null,
    "tokenEntryValidation": null,
    "authority": "",
    "leaveAllowed": true,
    "joinAllowedDuringStart": true,
    "oracleState": {
      "seed": "BCUfkAyJYpxBpjT7AhnHSbW2PnUMMhoKfDSdmd5fga1m",
      "authority": "8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy",
      "finalized": false,
      "tokenTransferRoot": null,
      "tokenTransfers": [
      
      ]
    },
    "tokensToJoin": [ 
    ]}
  total = 0
  // @ts-ignore
     for (var t of Object.keys(totals)){
      // @ts-ignore
      total += totals[t]
     }
     let inverse_bruh = {}
     let c = -1
     for (var t of Object.keys(totals)){
       c++
      // @ts-ignore
      inverse_bruh[t] = totals[t] / total
  config.tokensToJoin.push({"mint":t,
  // @ts-ignore
  "amount":Math.ceil(0.1 * 10 ** someDecs[t] / inverse_bruh[t]),
  "sourceType":1,
  "index":c,
  "validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"})
  
  
     

       }
      } catch (err){
        console.log(err)
      }

  try {
    let wallie = Keypair.fromSecretKey((new Uint8Array(JSON.parse((await fs.readFileSync('./p3')).toString()))));

    let anchorWallet = new NodeWallet(wallie);
 
    let provider = new anchor.Provider(connection, anchorWallet, {
     preflightCommitment: 'processed',
   });
 
 let idl = {"version":"0.1.0","name":"matches","instructions":[{"name":"createOrUpdateOracle","accounts":[{"name":"oracle","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateOrUpdateOracleArgs"}}]},{"name":"createMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateMatchArgs"}}]},{"name":"updateMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"args","type":{"defined":"UpdateMatchArgs"}}]},{"name":"updateMatchFromOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[]},{"name":"drainOracle","accounts":[{"name":"matchInstance","isMut":false,"isSigner":false},{"name":"oracle","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":true,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DrainOracleArgs"}}]},{"name":"drainMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":false,"isSigner":false}],"args":[]},{"name":"leaveMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"receiver","isMut":false,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"LeaveMatchArgs"}}]},{"name":"disburseTokensByOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"originalSender","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DisburseTokensByOracleArgs"}}]},{"name":"joinMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenTransferAuthority","isMut":false,"isSigner":true},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"sourceTokenAccount","isMut":true,"isSigner":false},{"name":"sourceItemOrPlayerPda","isMut":false,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"validationProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"JoinMatchArgs"}}]}],"accounts":[{"name":"Match","type":{"kind":"struct","fields":[{"name":"namespaces","type":{"option":{"vec":{"defined":"NamespaceAndIndex"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"lastOracleCheck","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"state","type":{"defined":"MatchState"}},{"name":"leaveAllowed","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}},{"name":"bump","type":"u8"},{"name":"currentTokenTransferIndex","type":"u64"},{"name":"tokenTypesAdded","type":"u64"},{"name":"tokenTypesRemoved","type":"u64"},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"joinAllowedDuringStart","type":"bool"}]}},{"name":"PlayerWinCallbackBitmap","type":{"kind":"struct","fields":[{"name":"matchKey","type":"publicKey"}]}},{"name":"WinOracle","type":{"kind":"struct","fields":[{"name":"finalized","type":"bool"},{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}}]}}],"types":[{"name":"CreateOrUpdateOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}},{"name":"seed","type":"publicKey"},{"name":"space","type":"u64"},{"name":"finalized","type":"bool"}]}},{"name":"DrainOracleArgs","type":{"kind":"struct","fields":[{"name":"seed","type":"publicKey"}]}},{"name":"CreateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"space","type":"u64"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"UpdateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"JoinMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"},{"name":"tokenEntryValidationProof","type":{"option":{"vec":{"array":["u8",32]}}}},{"name":"tokenEntryValidation","type":{"option":{"defined":"TokenValidation"}}}]}},{"name":"LeaveMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"}]}},{"name":"DisburseTokensByOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenDeltaProofInfo","type":{"option":{"defined":"TokenDeltaProofInfo"}}}]}},{"name":"TokenDeltaProofInfo","type":{"kind":"struct","fields":[{"name":"tokenDeltaProof","type":{"vec":{"array":["u8",32]}}},{"name":"tokenDelta","type":{"defined":"TokenDelta"}},{"name":"totalProof","type":{"vec":{"array":["u8",32]}}},{"name":"total","type":"u64"}]}},{"name":"Root","type":{"kind":"struct","fields":[{"name":"root","type":{"array":["u8",32]}}]}},{"name":"Callback","type":{"kind":"struct","fields":[{"name":"key","type":"publicKey"},{"name":"code","type":"u64"}]}},{"name":"ValidationArgs","type":{"kind":"struct","fields":[{"name":"instruction","type":{"array":["u8",8]}},{"name":"extraIdentifier","type":"u64"},{"name":"tokenValidation","type":{"defined":"TokenValidation"}}]}},{"name":"NamespaceAndIndex","type":{"kind":"struct","fields":[{"name":"namespace","type":"publicKey"},{"name":"indexed","type":"bool"},{"name":"inherited","type":{"defined":"InheritanceState"}}]}},{"name":"TokenDelta","type":{"kind":"struct","fields":[{"name":"from","type":"publicKey"},{"name":"to","type":{"option":"publicKey"}},{"name":"tokenTransferType","type":{"defined":"TokenTransferType"}},{"name":"mint","type":"publicKey"},{"name":"amount","type":"u64"}]}},{"name":"TokenValidation","type":{"kind":"struct","fields":[{"name":"filter","type":{"defined":"Filter"}},{"name":"isBlacklist","type":"bool"},{"name":"validation","type":{"option":{"defined":"Callback"}}}]}},{"name":"MatchState","type":{"kind":"enum","variants":[{"name":"Draft"},{"name":"Initialized"},{"name":"Started"},{"name":"Finalized"},{"name":"PaidOut"},{"name":"Deactivated"}]}},{"name":"PermissivenessType","type":{"kind":"enum","variants":[{"name":"TokenHolder"},{"name":"ParentTokenHolder"},{"name":"UpdateAuthority"},{"name":"Anybody"}]}},{"name":"InheritanceState","type":{"kind":"enum","variants":[{"name":"NotInherited"},{"name":"Inherited"},{"name":"Overridden"}]}},{"name":"TokenType","type":{"kind":"enum","variants":[{"name":"Player"},{"name":"Item"},{"name":"Any"}]}},{"name":"TokenTransferType","type":{"kind":"enum","variants":[{"name":"PlayerToPlayer"},{"name":"PlayerToEntrant"},{"name":"Normal"}]}},{"name":"Filter","type":{"kind":"enum","variants":[{"name":"None"},{"name":"All"},{"name":"Namespace","fields":[{"name":"namespace","type":"publicKey"}]},{"name":"Parent","fields":[{"name":"key","type":"publicKey"}]},{"name":"Mint","fields":[{"name":"mint","type":"publicKey"}]}]}},{"name":"ErrorCode","type":{"kind":"enum","variants":[{"name":"IncorrectOwner"},{"name":"Uninitialized"},{"name":"MintMismatch"},{"name":"TokenTransferFailed"},{"name":"NumericalOverflowError"},{"name":"TokenMintToFailed"},{"name":"TokenBurnFailed"},{"name":"DerivedKeyInvalid"},{"name":"InvalidStartingMatchState"},{"name":"InvalidUpdateMatchState"},{"name":"InvalidOracleUpdate"},{"name":"CannotDrainYet"},{"name":"CannotLeaveMatch"},{"name":"ReceiverMustBeSigner"},{"name":"PublicKeyMismatch"},{"name":"AtaShouldNotHaveDelegate"},{"name":"CannotEnterMatch"},{"name":"InvalidProof"},{"name":"RootNotPresent"},{"name":"MustPassUpObject"},{"name":"NoValidValidationFound"},{"name":"Blacklisted"},{"name":"NoTokensAllowed"},{"name":"InvalidValidation"},{"name":"NoDeltasFound"},{"name":"UsePlayerEndpoint"},{"name":"FromDoesNotMatch"},{"name":"CannotDeltaMoreThanAmountPresent"},{"name":"DeltaMintDoesNotMatch"},{"name":"DestinationMismatch"},{"name":"MatchMustBeInFinalized"},{"name":"AtaDelegateMismatch"},{"name":"OracleAlreadyFinalized"},{"name":"OracleCooldownNotPassed"},{"name":"MatchMustBeDrained"},{"name":"NoParentPresent"},{"name":"ReinitializationDetected"}]}}]}// await anchor.Program.fetchIdl(MATCHES_ID, provider);
 
 let program = new anchor.Program(idl as anchor.Idl, MATCHES_ID, provider);
 
 
 const anchorProgram =  new MatchesProgram({
     id: MATCHES_ID,
     // @ts-ignore
     program,
   });

   const setup = config.tokensToJoin[7];
    wallie = Keypair.fromSecretKey((new Uint8Array(JSON.parse((await fs.readFileSync('./p3')).toString()))));
   currp3 = wallie.publicKey
if (false){//firstlala){
  firstlala = false;
    
   try {
    await anchorProgram.leaveMatch(
      {
        amount: new anchor.BN(setup.amount),
        // @ts-ignore
        escrowBump: null,
      },
      {
        tokenMint: new PublicKey(setup.mint),
        receiver: new PublicKey(currp3)
      },
      {
        winOracle: config.winOracle
          ? new PublicKey(config.winOracle)
          : (
              await getOracle(
                new PublicKey(config.oracleState.seed),
  
                config.oracleState.authority
                  ? new PublicKey(config.oracleState.authority)
                  : new PublicKey(currp3)
              )
            )[0],
      }
    );
   }
   catch (err){
     console.log(2)
   }
   let joinmaybe = await anchorProgram.joinMatch(
    {
      amount: new anchor.BN(setup.amount),
      // @ts-ignore
      escrowBump: null,
      tokenEntryValidation: null,
      tokenEntryValidationProof: null,
    },
    {
      tokenMint: new PublicKey(setup.mint),
      sourceTokenAccount: null,
      tokenTransferAuthority: null,
      validationProgram: setup.validationProgram
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
                : new PublicKey(currp3)
            )
          )[0],
      sourceType: setup.sourceType as TokenType,
      index:
        setup.index != null && setup.index != undefined
          ? new anchor.BN(setup.index)
          : null,
    }
  );
  console.log(joinmaybe)
  }
   }
    catch (err){
      console.log(err)
    }
}
setInterval(async function(){
 oulala()
}, 60000)
setTimeout(async function(){
  oulala()
}, 1000)

app.get(`/leavejoinlol`, async (req: any, res: any) => {
    
const connection = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");
const connection2 = new Connection("https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2", "confirmed");

 const setup = config.tokensToJoin[7];
 let wallie2 = Keypair.fromSecretKey((new Uint8Array(JSON.parse((await fs.readFileSync('./p3')).toString()))));
    currp3 = wallie2.publicKey
   
let    anchorWallet2 = new NodeWallet(wallie2);

let   provider2 = new anchor.Provider(connection, anchorWallet2, {
  preflightCommitment: 'processed',
});


let idl2 = {"version":"0.1.0","name":"matches","instructions":[{"name":"createOrUpdateOracle","accounts":[{"name":"oracle","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateOrUpdateOracleArgs"}}]},{"name":"createMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"CreateMatchArgs"}}]},{"name":"updateMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"args","type":{"defined":"UpdateMatchArgs"}}]},{"name":"updateMatchFromOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[]},{"name":"drainOracle","accounts":[{"name":"matchInstance","isMut":false,"isSigner":false},{"name":"oracle","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":true,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DrainOracleArgs"}}]},{"name":"drainMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true},{"name":"receiver","isMut":false,"isSigner":false}],"args":[]},{"name":"leaveMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"receiver","isMut":false,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"LeaveMatchArgs"}}]},{"name":"disburseTokensByOracle","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"destinationTokenAccount","isMut":true,"isSigner":false},{"name":"winOracle","isMut":false,"isSigner":false},{"name":"originalSender","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"DisburseTokensByOracleArgs"}}]},{"name":"joinMatch","accounts":[{"name":"matchInstance","isMut":true,"isSigner":false},{"name":"tokenTransferAuthority","isMut":false,"isSigner":true},{"name":"tokenAccountEscrow","isMut":true,"isSigner":false},{"name":"tokenMint","isMut":true,"isSigner":false},{"name":"sourceTokenAccount","isMut":true,"isSigner":false},{"name":"sourceItemOrPlayerPda","isMut":false,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"validationProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"JoinMatchArgs"}}]}],"accounts":[{"name":"Match","type":{"kind":"struct","fields":[{"name":"namespaces","type":{"option":{"vec":{"defined":"NamespaceAndIndex"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"lastOracleCheck","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"state","type":{"defined":"MatchState"}},{"name":"leaveAllowed","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}},{"name":"bump","type":"u8"},{"name":"currentTokenTransferIndex","type":"u64"},{"name":"tokenTypesAdded","type":"u64"},{"name":"tokenTypesRemoved","type":"u64"},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"joinAllowedDuringStart","type":"bool"}]}},{"name":"PlayerWinCallbackBitmap","type":{"kind":"struct","fields":[{"name":"matchKey","type":"publicKey"}]}},{"name":"WinOracle","type":{"kind":"struct","fields":[{"name":"finalized","type":"bool"},{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}}]}}],"types":[{"name":"CreateOrUpdateOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenTransferRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenTransfers","type":{"option":{"vec":{"defined":"TokenDelta"}}}},{"name":"seed","type":"publicKey"},{"name":"space","type":"u64"},{"name":"finalized","type":"bool"}]}},{"name":"DrainOracleArgs","type":{"kind":"struct","fields":[{"name":"seed","type":"publicKey"}]}},{"name":"CreateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracle","type":"publicKey"},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"space","type":"u64"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"UpdateMatchArgs","type":{"kind":"struct","fields":[{"name":"matchState","type":{"defined":"MatchState"}},{"name":"tokenEntryValidationRoot","type":{"option":{"defined":"Root"}}},{"name":"tokenEntryValidation","type":{"option":{"vec":{"defined":"TokenValidation"}}}},{"name":"winOracleCooldown","type":"u64"},{"name":"authority","type":"publicKey"},{"name":"leaveAllowed","type":"bool"},{"name":"joinAllowedDuringStart","type":"bool"},{"name":"minimumAllowedEntryTime","type":{"option":"u64"}}]}},{"name":"JoinMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"},{"name":"tokenEntryValidationProof","type":{"option":{"vec":{"array":["u8",32]}}}},{"name":"tokenEntryValidation","type":{"option":{"defined":"TokenValidation"}}}]}},{"name":"LeaveMatchArgs","type":{"kind":"struct","fields":[{"name":"amount","type":"u64"}]}},{"name":"DisburseTokensByOracleArgs","type":{"kind":"struct","fields":[{"name":"tokenDeltaProofInfo","type":{"option":{"defined":"TokenDeltaProofInfo"}}}]}},{"name":"TokenDeltaProofInfo","type":{"kind":"struct","fields":[{"name":"tokenDeltaProof","type":{"vec":{"array":["u8",32]}}},{"name":"tokenDelta","type":{"defined":"TokenDelta"}},{"name":"totalProof","type":{"vec":{"array":["u8",32]}}},{"name":"total","type":"u64"}]}},{"name":"Root","type":{"kind":"struct","fields":[{"name":"root","type":{"array":["u8",32]}}]}},{"name":"Callback","type":{"kind":"struct","fields":[{"name":"key","type":"publicKey"},{"name":"code","type":"u64"}]}},{"name":"ValidationArgs","type":{"kind":"struct","fields":[{"name":"instruction","type":{"array":["u8",8]}},{"name":"extraIdentifier","type":"u64"},{"name":"tokenValidation","type":{"defined":"TokenValidation"}}]}},{"name":"NamespaceAndIndex","type":{"kind":"struct","fields":[{"name":"namespace","type":"publicKey"},{"name":"indexed","type":"bool"},{"name":"inherited","type":{"defined":"InheritanceState"}}]}},{"name":"TokenDelta","type":{"kind":"struct","fields":[{"name":"from","type":"publicKey"},{"name":"to","type":{"option":"publicKey"}},{"name":"tokenTransferType","type":{"defined":"TokenTransferType"}},{"name":"mint","type":"publicKey"},{"name":"amount","type":"u64"}]}},{"name":"TokenValidation","type":{"kind":"struct","fields":[{"name":"filter","type":{"defined":"Filter"}},{"name":"isBlacklist","type":"bool"},{"name":"validation","type":{"option":{"defined":"Callback"}}}]}},{"name":"MatchState","type":{"kind":"enum","variants":[{"name":"Draft"},{"name":"Initialized"},{"name":"Started"},{"name":"Finalized"},{"name":"PaidOut"},{"name":"Deactivated"}]}},{"name":"PermissivenessType","type":{"kind":"enum","variants":[{"name":"TokenHolder"},{"name":"ParentTokenHolder"},{"name":"UpdateAuthority"},{"name":"Anybody"}]}},{"name":"InheritanceState","type":{"kind":"enum","variants":[{"name":"NotInherited"},{"name":"Inherited"},{"name":"Overridden"}]}},{"name":"TokenType","type":{"kind":"enum","variants":[{"name":"Player"},{"name":"Item"},{"name":"Any"}]}},{"name":"TokenTransferType","type":{"kind":"enum","variants":[{"name":"PlayerToPlayer"},{"name":"PlayerToEntrant"},{"name":"Normal"}]}},{"name":"Filter","type":{"kind":"enum","variants":[{"name":"None"},{"name":"All"},{"name":"Namespace","fields":[{"name":"namespace","type":"publicKey"}]},{"name":"Parent","fields":[{"name":"key","type":"publicKey"}]},{"name":"Mint","fields":[{"name":"mint","type":"publicKey"}]}]}},{"name":"ErrorCode","type":{"kind":"enum","variants":[{"name":"IncorrectOwner"},{"name":"Uninitialized"},{"name":"MintMismatch"},{"name":"TokenTransferFailed"},{"name":"NumericalOverflowError"},{"name":"TokenMintToFailed"},{"name":"TokenBurnFailed"},{"name":"DerivedKeyInvalid"},{"name":"InvalidStartingMatchState"},{"name":"InvalidUpdateMatchState"},{"name":"InvalidOracleUpdate"},{"name":"CannotDrainYet"},{"name":"CannotLeaveMatch"},{"name":"ReceiverMustBeSigner"},{"name":"PublicKeyMismatch"},{"name":"AtaShouldNotHaveDelegate"},{"name":"CannotEnterMatch"},{"name":"InvalidProof"},{"name":"RootNotPresent"},{"name":"MustPassUpObject"},{"name":"NoValidValidationFound"},{"name":"Blacklisted"},{"name":"NoTokensAllowed"},{"name":"InvalidValidation"},{"name":"NoDeltasFound"},{"name":"UsePlayerEndpoint"},{"name":"FromDoesNotMatch"},{"name":"CannotDeltaMoreThanAmountPresent"},{"name":"DeltaMintDoesNotMatch"},{"name":"DestinationMismatch"},{"name":"MatchMustBeInFinalized"},{"name":"AtaDelegateMismatch"},{"name":"OracleAlreadyFinalized"},{"name":"OracleCooldownNotPassed"},{"name":"MatchMustBeDrained"},{"name":"NoParentPresent"},{"name":"ReinitializationDetected"}]}}]}// await anchor.Program.fetchIdl(MATCHES_ID, provider);

let program2 = new anchor.Program(idl2 as anchor.Idl, MATCHES_ID, provider2);


const anchorProgram2 =  new MatchesProgram({
   id: MATCHES_ID,
   // @ts-ignore
   program: program2,
 });
 try {
    await anchorProgram2.leaveMatch(
      {
        amount: new anchor.BN(setup.amount),
        // @ts-ignore
        escrowBump: null,
      },
      {
        tokenMint: new PublicKey(setup.mint),
        receiver: new PublicKey(currp3)
      },
      {
        winOracle: config.winOracle
          ? new PublicKey(config.winOracle)
          : (
              await getOracle(
                new PublicKey(config.oracleState.seed),
  
                config.oracleState.authority
                  ? new PublicKey(config.oracleState.authority)
                  : new PublicKey(currp3)
              )
            )[0],
      }
    );
 } catch (err){
   console.log(1)
 }
   let joinmaybe = await anchorProgram2.joinMatch(
    {
      amount: new anchor.BN(setup.amount),
      // @ts-ignores
      escrowBump: null,
      tokenEntryValidation: null,
      tokenEntryValidationProof: null,
    },
    {
      tokenMint: new PublicKey(setup.mint),
      sourceTokenAccount: null,
      tokenTransferAuthority: null,
      validationProgram: setup.validationProgram
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
                : new PublicKey(currp3)
            )
          )[0],
      sourceType: setup.sourceType as TokenType,
      index:
        setup.index != null && setup.index != undefined
          ? new anchor.BN(setup.index)
          : null,
    }
  );
  console.log(joinmaybe)
  res.status(200).json(config);
})
app.get(`/blargs`, (req: any, res: any) => {
    
    res.status(200).json(config);
})
app.get('/endts', (req: any, res: any) => {
res.status(200).json(endts);
})

app.get('/totals', (req: any, res: any) => {
  let astring = ""
    for (var key of Object.keys(totals)){
      // @ts-ignore
astring+=key + ": " + totals[key] + " && "
}
//console.log(Object.keys(totals).length)
//console.log(astring)
  res.status(200).send(astring);
  })
app.listen(3000, () => console.log(`Listening on port ${3001}`));