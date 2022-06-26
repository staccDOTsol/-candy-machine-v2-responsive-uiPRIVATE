# assumes solana-cli (eh but an old enuff version for raindrops to work, I actually replaced raindrops occurrences of _recentBlockhash with getLastBlockHash iirc)
# you have cloned https://github.com/raindrops-protocol/raindrops
# you are in raindrops/js
# gl; hf; mb

yarn add @project-serum/anchor  ts-node '@strata-foundation/spl-utils' "@glasseaters/hydra-sdk" "@project-serum/common"
solana-keygen new -o bla --force -s  --no-bip39-passphrase
export blarg=$(solana address -k bla)
export blarg="B2shfZUYv4o39WkrDBhhgwAmp32azWpSpGZtFj1nNEyj"
#solana-keygen new -o p1 --force -s  --no-bip39-passphrase
export p1=$(solana address -k p1)
#solana-keygen new -o p2 --force -s  --no-bip39-passphrase
export p2=$(solana address -k p2)
#solana-keygen new -o p3 --force -s  --no-bip39-passphrase
export p3=$(solana address -k p3)
#solana-keygen new -o p0 --force -s  --no-bip39-passphrase
export p0=$(solana address -k p0)
export fanout="AikxLiLHSuvw6Q68rQB62RR6a8pPf1ME8mKzJpSQzE1H"
#solana airdrop 1 $p1
#solana airdrop 1 $p2
#solana airdrop 1 $p0
#spl-token wrap 0.4 p2
#spl-token wrap 0.4 p1
rm -rf createMatch.js
echo '''{"winOracle":null,"matchState":{"initialized":true},"winOracleCooldown":10,"space":300,"minimumAllowedEntryTime":null,"tokenEntryValidation":null,"authority":"","leaveAllowed":true,"joinAllowedDuringStart":true,"oracleState":{"seed":"B2shfZUYv4o39WkrDBhhgwAmp32azWpSpGZtFj1nNEyj","authority":"8QEKNRBovF4YggpGtKk8qaErWv7NcWM7AboZkKBipszy","finalized":false,"tokenTransferRoot":null,"tokenTransfers":[]},"tokensToJoin":[{"mint":"AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq","amount":1000000000,"sourceType":1,"index":0,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG","amount":1000000000,"sourceType":1,"index":1,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","amount":1000000,"sourceType":1,"index":2,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh","amount":1000000,"sourceType":1,"index":3,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA","amount":1000000,"sourceType":1,"index":4,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x","amount":1000000,"sourceType":1,"index":5,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"},{"mint":"openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79","amount":1000000000,"sourceType":1,"index":6,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"}]}''' >> createMatch.js
 echo 1
  #yarn ts-node src/cli/matches.ts create_or_update_oracle -e mainnet-beta -l debug -k p0 -cp createMatch.js
  echo 12
  yarn ts-node src/cli/matches.ts show_match -e mainnet-beta -l debug -k p0 -cp createMatch.js
  echo 123
  #yarn ts-node src/cli/matches.ts join_match  -e mainnet-beta -l debug -k p1 -i 0 -cp createMatch.js 
  echo 1234
  #yarn ts-node src/cli/matches.ts join_match -e mainnet-beta -l debug -k p3 -i 3 -cp createMatch.js 
  echo 1234
 # yarn ts-node src/cli/matches.ts join_match  -e mainnet-beta -l debug -k p2 -i 0 -cp createMatch.js 
 echo 12345
 