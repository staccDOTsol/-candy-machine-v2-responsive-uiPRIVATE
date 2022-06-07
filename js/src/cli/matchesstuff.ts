// @ts-nocheck
import * as fs from "fs";
import { program } from "commander";
import log from "loglevel";
import { loadWalletKey } from "../utils/file";
import { Keypair } from "@solana/web3.js";
import BN from "bn.js";
import { web3 } from "@project-serum/anchor";
import { getMatchesProgram } from "../contract/matches";
import { getAtaForMint, getMatch, getOracle } from "../utils/pda";
import { MatchState, TokenTransferType, TokenType } from "../state/matches";
import { InheritanceState } from "../state/common";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

  export async function create_match(blarg: PublicKey){
setTimeout(async function(){
    const { keypair, env } = {keypair:'/Users/stacc/.config/solana/newnew.json',
    env: 'mainnet-beta', 
    }
    const rpcUrl = "https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2"
    
        const walletKeyPair = loadWalletKey(keypair);
        const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);
    
        let actualOracle = null//oracle ? new web3.PublicKey(oracle) : null;
        
        const configString = {
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
              "seed": blarg.toBase58(),
              "authority": "8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy",
              "finalized": false,
              "tokenTransferRoot": null,
              "tokenTransfers": [
              
              ]
            },
            "tokensToJoin": [
              
            ]
          }
          const someToks = ["AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq","Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG",("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
                                  ("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"),
                                  ("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),
                                  ("PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x")
                                  ,"openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"  ]
          const someDecs = [9,9,6,
                                6,
                                6,
                                6, 9
                              ]
        for (var tok in someToks){
            configString.tokensToJoin.push({
                "mint": someToks[tok],
                "amount": 1 * 10 ** someDecs[tok],
              "sourceType": 1,
              "index": parseInt(tok),
              "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
           })
        }
          //fs.readFileSync(configPath);
    
          //@ts-ignore
          const config = configString//JSON.parse(configString);


    await anchorProgram.createMatch(
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),

                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
        matchBump: null,
        matchState: config.matchState || { draft: true },
        tokenEntryValidationRoot: null,
        tokenEntryValidation: config.tokenEntryValidation
          ? config.tokenEntryValidation
          : null,
        winOracleCooldown: new BN(config.winOracleCooldown || 0),
        authority: config.authority
          ? new web3.PublicKey(config.authority)
          : walletKeyPair.publicKey,
        space: config.space ? new BN(config.space) : new BN(150),
        leaveAllowed: config.leaveAllowed,
        joinAllowedDuringStart: config.joinAllowedDuringStart,
        minimumAllowedEntryTime: config.minimumAllowedEntryTime
          ? new BN(config.minimumAllowedEntryTime)
          : null,
      },
      {},
      config.oracleState
    );
  });

programCommand("update_match")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    await anchorProgram.updateMatch(
      {
        matchState: config.matchState || { draft: true },
        tokenEntryValidationRoot: null,
        tokenEntryValidation: config.tokenEntryValidation
          ? config.tokenEntryValidation
          : null,
        winOracleCooldown: new BN(config.winOracleCooldown || 0),
        authority: config.authority
          ? new web3.PublicKey(config.authority)
          : walletKeyPair.publicKey,
        leaveAllowed: config.leaveAllowed,
        joinAllowedDuringStart: config.joinAllowedDuringStart,
        minimumAllowedEntryTime: config.minimumAllowedEntryTime
          ? new BN(config.minimumAllowedEntryTime)
          : null,
      },
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),

                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
      },
      {}
    );
  });

programCommand("join_match")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .option(
    "-i, --index <string>",
    "Index of token you want to join with in settings file"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl, index } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    //@ts-ignore
    const config = {
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
          "seed": blarg.toBase58(),
          "authority": "8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy",
          "finalized": false,
          "tokenTransferRoot": null,
          "tokenTransfers": [
          
          ]
        },
        "tokensToJoin": [
          
        ]
      }
     // actualOracle = new web3.PublicKey(configString.oracleState.seed)
      const someToks = ["AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq","Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG",("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
                              ("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"),
                              ("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),
                              ("PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x")
                              ,"openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"   ]
      const someDecs = [9,9,6,
                            6,
                            6,
                            
                            6, 9
                          ]
    for (var tok in someToks){
        configString.tokensToJoin.push({
            "mint": someToks[tok],
            "amount": 1 * 10 ** someDecs[tok],
          "sourceType": 1,
          "index": parseInt(tok),
          "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
       })
    }

    const indices = [];

    if (index != undefined && index != null) indices.push(index);
    else config.tokensToJoin.forEach((_, i) => indices.push(i));

    for (let i = 0; i < indices.length; i++) {
      const setup = config.tokensToJoin[indices[i]];
      await anchorProgram.joinMatch(
        {
          amount: new BN(setup.amount),
          escrowBump: null,
          tokenEntryValidation: null,
          tokenEntryValidationProof: null,
        },
        {
          tokenMint: new web3.PublicKey(setup.mint),
          sourceTokenAccount: null,
          tokenTransferAuthority: null,
          validationProgram: setup.validationProgram
            ? new web3.PublicKey(setup.validationProgram)
            : null,
        },
        {
          winOracle: config.winOracle
            ? new web3.PublicKey(config.winOracle)
            : (
                await getOracle(
                  new web3.PublicKey(config.oracleState.seed),

                  config.oracleState.authority
                    ? new web3.PublicKey(config.oracleState.authority)
                    : walletKeyPair.publicKey
                )
              )[0],
          sourceType: setup.sourceType as TokenType,
          index:
            setup.index != null && setup.index != undefined
              ? new BN(setup.index)
              : null,
        }
      );
    }
  });

  programCommand("join_match_for_hydra")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  ) .requiredOption(
    "-h, --hydra <string>",
    "gib to the ppl sers"
  )
  .option(
    "-i, --index <string>",
    "Index of token you want to join with in settings file"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl, index, hydra } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    const indices = [];

    if (index != undefined && index != null) indices.push(index);
    else config.tokensToJoin.forEach((_, i) => indices.push(i));

    for (let i = 0; i < indices.length; i++) {
      const setup = config.tokensToJoin[indices[i]];
      await anchorProgram.joinMatch(
        {
          amount: new BN(setup.amount),
          escrowBump: null,
          tokenEntryValidation: null,
          tokenEntryValidationProof: null,
        },
        {
          tokenMint: new web3.PublicKey(setup.mint),
          sourceTokenAccount: null,
          tokenTransferAuthority: null,
          validationProgram: setup.validationProgram
            ? new web3.PublicKey(setup.validationProgram)
            : null,
        },
        {
          winOracle: config.winOracle
            ? new web3.PublicKey(config.winOracle)
            : (
                await getOracle(
                  new web3.PublicKey(config.oracleState.seed),

                  config.oracleState.authority
                    ? new web3.PublicKey(config.oracleState.authority)
                    : walletKeyPair.publicKey
                )
              )[0],
          sourceType: setup.sourceType as TokenType,
          index:
            setup.index != null && setup.index != undefined
              ? new BN(setup.index)
              : null,
        }
      );
    }
  });
programCommand("leave_match")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .option(
    "-i, --index <string>",
    "Index of token you want to join with in settings file"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl, index } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    const indices = [];

    if (index != undefined && index != null) indices.push(index);
    else config.tokensToJoin.forEach((_, i) => indices.push(i));

    for (let i = 0; i < indices.length; i++) {
      const setup = config.tokensToJoin[indices[i]];
      await anchorProgram.leaveMatch(
        {
          amount: new BN(setup.amount),
          escrowBump: null,
        },
        {
          tokenMint: new web3.PublicKey(setup.mint),
          receiver: walletKeyPair.publicKey,
        },
        {
          winOracle: config.winOracle
            ? new web3.PublicKey(config.winOracle)
            : (
                await getOracle(
                  new web3.PublicKey(config.oracleState.seed),

                  config.oracleState.authority
                    ? new web3.PublicKey(config.oracleState.authority)
                    : walletKeyPair.publicKey
                )
              )[0],
        }
      );
    }
  });

programCommand("update_match_from_oracle")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    await anchorProgram.updateMatchFromOracle(
      {},
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),

                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
      },
      {}
    );
  });

programCommand("disburse_tokens_by_oracle")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    const winOracle = config.winOracle
      ? new web3.PublicKey(config.winOracle)
      : (
          await getOracle(
            new web3.PublicKey(config.oracleState.seed),

            config.oracleState.authority
              ? new web3.PublicKey(config.oracleState.authority)
              : walletKeyPair.publicKey
          )
        )[0];
    const oracleInstance = await anchorProgram.fetchOracle(winOracle);
    for (let i = 0; i < oracleInstance.object.tokenTransfers.length; i++) {
      const tfer = oracleInstance.object.tokenTransfers[i];

      await anchorProgram.disburseTokensByOracle(
        {
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
    }
  });

programCommand("drain_match")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    await anchorProgram.drainMatch(
      {},
      {
        receiver: walletKeyPair.publicKey,
      },
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),

                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
      }
    );
  });

programCommand("drain_oracle")
  .requiredOption(
    "-cp, --config-path <string>",
    "JSON file with match settings"
  )
  .action(async (files: string[], cmd) => {
    const { keypair, env, configPath, rpcUrl } = cmd.opts();

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

    await anchorProgram.drainOracle(
      {
        seed: config.oracleState.seed,
        authority: config.oracleState.authority
          ? new web3.PublicKey(config.oracleState.authority)
          : walletKeyPair.publicKey,
        oracleBump: null,
        matchBump: null,
      },
      {
        receiver: walletKeyPair.publicKey,
      }
    );
  });

  }
  // @ts-ignore
export async function create_or_update_oracle(keypair, env, rpcUrl, config){

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    await anchorProgram.createOrUpdateOracle({
      seed: config.oracleState.seed,
      oracleBump: null,
      authority: config.oracleState.authority
        ? new web3.PublicKey(config.oracleState.authority)
        : walletKeyPair.publicKey,
      tokenTransferRoot: config.oracleState.tokenTransferRoot,
      tokenTransfers: config.oracleState.tokenTransfers,
      space: config.space ? new BN(config.space) : new BN(150),
      finalized: config.oracleState.finalized,
    });
  
  }
 export async function show_match(blarg: PublicKey){

setTimeout(async function(){
    const { keypair, env } = {keypair:'/Users/stacc/.config/solana/newnew.json',
env: 'mainnet-beta', 
}
const rpcUrl = "https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2"

    const walletKeyPair = loadWalletKey(keypair);
    const anchorProgram = await getMatchesProgram(walletKeyPair, env, rpcUrl);

    let actualOracle = null//oracle ? new web3.PublicKey(oracle) : null;
    const configString = {
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
          "seed": blarg.toBase58(),
          "authority": "8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy",
          "finalized": false,
          "tokenTransferRoot": null,
          "tokenTransfers": [
          
          ]
        },
        "tokensToJoin": [
          
        ]
      }
      actualOracle = new web3.PublicKey(configString.oracleState.seed)
      const someToks = ["AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq","Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG",("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
                              ("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"),
                              ("8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA"),
                              ("PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x")
                              ,"openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"  ]
      const someDecs = [9,9,6,
                            6,
                            6,
                         
                            6, 9
                          ]
    for (var tok in someToks){
        configString.tokensToJoin.push({
            "mint": someToks[tok],
            "amount": 1 * 10 ** someDecs[tok],
          "sourceType": 1,
          "index": parseInt(tok),
          "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
       })
    }
      //fs.readFileSync(configPath);

      //@ts-ignore
      const config = configString//JSON.parse(configString);
  //    await create_or_update_oracle(keypair, env, rpcUrl, config)
      actualOracle = config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0];
    
console.log(actualOracle)
    const matchInstance = await anchorProgram.fetchMatch(actualOracle);

    const oracleInstance = await anchorProgram.fetchOracle(actualOracle);

    const u = matchInstance.object;
    const o = oracleInstance.object;
    log.setLevel("info");
    log.info("Match ", matchInstance.key.toBase58());
    log.info(
      "Namespaces:",
      u.namespaces
        ? u.namespaces.map((u) => {
            if (!u.namespace.equals(web3.SystemProgram.programId))
              log.info(
                `--> ${
                  InheritanceState[u.inherited]
                } ${u.namespace.toBase58()} Indexed: ${u.indexed}`
              );
          })
        : "Not Set"
    );
    log.info("State:", Object.keys(u.state)[0]);
    log.info("Win Oracle:", actualOracle);
    log.info("Oracle Cooldown:", u.winOracleCooldown.toNumber());
    log.info(
      "Last Oracle Check:",
      u.lastOracleCheck.toNumber() > 0
        ? new Date(u.lastOracleCheck.toNumber() * 1000)
        : "Never Checked"
    );
    log.info("Oracle Finalized:", o.finalized);
    log.info(
      "Oracle Token Transfer Root:",
      o.tokenTransferRoot ? o.tokenTransferRoot.root.toBase58() : "Unset"
    );
    log.info("Oracle Token Transfers:");
    if (o.tokenTransfers) {
      o.tokenTransfers.map((k) => {
        log.info("--> From:", k.from.toBase58());
        log.info("--> To:", k.to ? k.to.toBase58() : "Burn");
        log.info("--> Transfer Type:", TokenTransferType[k.tokenTransferType]);
        log.info("--> Mint:", k.mint.toBase58());
        log.info("--> Amount:", k.amount.toNumber());
      });
    }
    log.info("Authority:", u.authority.toBase58());
    log.info("Leaving Match Allowed?:", u.leaveAllowed ? "Yes" : "No");

    log.info(
      "Joining Match Allowed?:",
      u.joinAllowedDuringStart ? "Yes" : "No"
    );

    log.info(
      "Minimum Allowed Entry Time:",
      u.minimumAllowedEntryTime
        ? new Date(u.minimumAllowedEntryTime.toNumber() * 1000)
        : "Unset"
    );
    log.info(
      "Current token transfer index:",
      u.currentTokenTransferIndex.toNumber()
    );
    console.log(u)
    log.info("Token Types Added:", u.tokenTypesAdded.toNumber());
    log.info("Token Types Removed:", u.tokenTypesRemoved.toNumber());
    log.info("Token Entry Validations:");
    if (u.tokenEntryValidation) {
      u.tokenEntryValidation.map((k) => {
        log.info("--> Filter:");
        if (k.filter.mint)
          log.info("----> Mint:", k.filter.mint.mint.toBase58());
        if (k.filter.namespace)
          log.info("----> Namespace:", k.filter.namespace.namespace.toBase58());
        if (k.filter.parent)
          log.info("----> Parent:", k.filter.parent.key.toBase58());
        if (k.filter.all) log.info("----> All allowed");
        if (k.filter.none) log.info("----> None allowed");

        log.info("--> Blacklist?:", k.isBlacklist);
        log.info(
          "--> Validation:",
          k.validation
            ? `Call ${k.validation.key.toBase58()} with ${k.validation.code}`
            : "Not Set"
        );
      });
    }
    log.info(
      "Token Entry Validation Root:",
      u.tokenEntryValidationRoot
        ? u.tokenEntryValidationRoot.root.toBase58()
        : "Unset"
    );
 })
  };

function programCommand(name: string) {
  return program
    .command(name)
    .option(
      "-e, --env <string>",
      "Solana cluster env name",
      "devnet" //mainnet-beta, testnet, devnet
    )
    .requiredOption("-k, --keypair <path>", `Solana wallet location`)
    .option("-l, --log-level <string>", "log level", setLogLevel);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
  if (value === undefined || value === null) {
    return;
  }
  log.info("setting the log value to: " + value);
  log.setLevel(value);
}

program.parse(process.argv);
