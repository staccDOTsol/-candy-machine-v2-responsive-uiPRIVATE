import { PublicKey } from "@solana/web3.js";
import { BondingHierarchy } from ".";
export declare class BondingPricing {
    hierarchy: BondingHierarchy;
    constructor(args: {
        hierarchy: BondingHierarchy;
    });
    current(baseMint?: PublicKey, unixTime?: number): number;
    locked(baseMint?: PublicKey): number;
    swap(baseAmount: number, baseMint: PublicKey, targetMint: PublicKey, ignoreFrozen?: boolean, unixTime?: number): number;
    swapTargetAmount(targetAmount: number, baseMint: PublicKey, targetMint: PublicKey, 
    /** Ignore frozen curves, just compute the value. */
    ignoreFreeze?: boolean, unixTime?: number): number;
    sellTargetAmount(targetAmountNum: number, baseMint?: PublicKey, unixTime?: number): number;
    buyTargetAmount(targetAmountNum: number, baseMint?: PublicKey, unixTime?: number): number;
    buyWithBaseAmount(baseAmountNum: number, baseMint?: PublicKey, unixTime?: number): number;
}
//# sourceMappingURL=pricing.d.ts.map