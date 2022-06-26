import {
    Account,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import fs from 'fs'
  import * as matches from './src/cli/matchesstuff'
  import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

  import BN from "bn.js";
  import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
  import { PublicKey } from "@solana/web3.js"
  import * as anchor from "@project-serum/anchor";
  let tokenCollectiveSdk, tokenBondingSdk, tokenMetadataSdk;
  setTimeout(async function(){
let derm = await matches.show_match(new PublicKey("B2shfZUYv4o39WkrDBhhgwAmp32azWpSpGZtFj1nNEyj"))
console.log(derm)
                          })
  