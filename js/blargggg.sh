
yarn ts-node src/cli/matches.ts create_or_update_oracle -e mainnet-beta -l debug -k p0 -cp blarggg.json
#yarn ts-node src/cli/matches.ts update_match -e mainnet-beta -l debug -k p0 -cp blarggg.json
yarn ts-node src/cli/matches.ts update_match_from_oracle -e mainnet-beta -l debug -k p0 -cp blarggg.json
yarn ts-node src/cli/matches.ts disburse_tokens_by_oracle -e mainnet-beta  -l debug -k jare.json -cp blarggg.json
yarn ts-node src/cli/matches.ts leave_match -e mainnet-beta -l debug -k p3 -cp blarggg.json
#solana config set --keypair /Users/stacc/raindrops/js/p3
spl-token  transfer  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 0.01 H3QZjfiZLQdREFQxSjBxezSfiUvNFEPmnoWVi4R6dLnd --allow-unfunded-recipient

solana config set --keypair /Users/stacc/raindrops/js/jare.json 
solana transfer $p3 0.0138 --allow-unfunded-recipient
spl-token  transfer  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 0.01 $p3 --fund-recipient

yarn ts-node src/cli/matches.ts join_match -e mainnet-beta -l debug -k p3 -i 6 -cp blarggg.json
yarn ts-node src/cli/matches.ts show_match -e mainnet-beta -l debug -k p3 -cp blarggg.json

