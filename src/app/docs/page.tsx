"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DocsPage() {
  useEffect(() => {
    // Force a light theme for this specific page to mimic a PDF/Academic paper
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    return () => {
      // Revert to dark theme when leaving
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-serif px-6 py-12 md:px-20 lg:px-40 xl:px-64 selection:bg-blue-200">
      <div className="mb-12 no-print">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-sans text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <header className="mb-16 border-b-2 border-black pb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider">Bitcoin Blue (BTCBLUE)</h1>
        <h2 className="text-xl md:text-2xl text-gray-700 mb-6 italic">Technical Documentation & Institutional Protocol Architecture</h2>
        <div className="flex justify-center gap-8 text-sm font-sans text-gray-600">
          <span>Version: 1.0.0</span>
          <span>Date: May 2026</span>
          <span>Status: Mainnet Ready</span>
        </div>
      </header>

      <main className="space-y-12 text-justify leading-relaxed text-lg">
        
        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">1. Abstract</h3>
          <p className="mb-4">
            The Bitcoin Blue (BTCBLUE) protocol introduces a highly optimized, deflationary digital asset engineered on the Binance Smart Chain (BSC). 
            Designed to accommodate institutional capital and retail liquidity simultaneously, the architecture prioritizes uncompromised security, 
            mathematical scarcity, and automated value-accrual mechanisms. By enforcing a strict hardcap and eliminating upgradeable proxy vulnerabilities, 
            Bitcoin Blue establishes a trustless ecosystem immune to centralized manipulation.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">2. Core Smart Contract Architecture</h3>
          <p className="mb-4">
            The primary asset, <code>Btcblue.sol</code>, is a standard BEP-20 / ERC-20 implementation extending OpenZeppelin's rigorously audited libraries. 
            The contract diverges from standard implementations by integrating natively executed algorithmic tax policies.
          </p>
          <h4 className="text-xl font-bold mt-6 mb-2 font-sans">2.1 Absolute Hardcap</h4>
          <p className="mb-4">
            The total supply is mathematically constrained at contract genesis to exactly <strong>2,100,000 BTCBLUE</strong>. 
            The protocol possesses zero minting functions (<code>_mint</code> is omitted post-deployment). It is cryptographically impossible 
            for the developer, owner, or any external entity to inflate the supply.
          </p>
          <h4 className="text-xl font-bold mt-6 mb-2 font-sans">2.2 Immutable Logic (Zero Proxies)</h4>
          <p className="mb-4">
            To satisfy institutional compliance standards regarding smart contract risk, Bitcoin Blue does not utilize proxy patterns 
            (e.g., EIP-1967 Transparent or UUPS proxies). The contract logic is permanently immutable upon deployment. No backdoors exist to pause trading or blacklist wallets.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">3. Algorithmic Value Accrual (Tax Mechanics)</h3>
          <p className="mb-4">
            The protocol employs an asymmetrical taxation model designed to disincentivize market manipulation while funding continuous ecosystem growth.
          </p>
          <ul className="list-disc pl-8 space-y-2 mb-4 font-sans text-base">
            <li><strong>Buy Tax (3%):</strong> Redirected efficiently to the Marketing & Development multi-sig wallet to sustain protocol operations.</li>
            <li><strong>Sell Tax (3%):</strong> Automatically routed to a liquidity-backing mechanism.</li>
          </ul>
          <h4 className="text-xl font-bold mt-6 mb-2 font-sans">3.1 The <code>_swapBack</code> Routine</h4>
          <p className="mb-4">
            To prevent excessive gas consumption during user transactions, taxes are accrued internally within the contract. 
            Once the contract balance exceeds a predefined threshold (<code>swapTokensAtAmount</code>), the next non-buy transaction triggers the internal <code>_swapBack</code> function. 
            This function autonomously swaps accrued BTCBLUE for BNB using the Uniswap/PancakeSwap V2 Router and deposits the yield into operational wallets without disrupting the trader's gas limit.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">4. MEV Protection & Market Integrity</h3>
          <p className="mb-4">
            Institutional participants require protection against predatory Miner Extractable Value (MEV) attacks, specifically front-running and sandwich attacks.
          </p>
          <p className="mb-4">
            Bitcoin Blue incorporates an embedded <code>maxTxAmount</code> algorithm, restricting any single transaction from exceeding 1% of the total supply (21,000 BTCBLUE) during the initial liquidity bootstrapping phase. 
            This completely neutralizes whale manipulation and prevents flash-loan sandwich bots from extracting liquidity from retail traders.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">5. The Presale Architecture (Presale.sol)</h3>
          <p className="mb-4">
            The <code>Presale.sol</code> contract governs the initial distribution of the 15% (315,000 BTCBLUE) institutional allocation. 
            It is designed as a trustless escrow holding the uncirculating supply until the Generation Event.
          </p>
          <ul className="list-disc pl-8 space-y-2 mb-4 font-sans text-base">
            <li><strong>Hardcoded Conversion Rates:</strong> 1 BNB = 150 BTCBLUE. This rate is immutable inside the contract state, guaranteeing price parity for all participants.</li>
            <li><strong>Contribution Limits:</strong> To enforce decentralization, the contract enforces a <code>minContribution</code> (0.5 BNB) and a <code>maxContribution</code> (5 BNB).</li>
            <li><strong>State-Driven Execution:</strong> Funds cannot be claimed until the owner toggles <code>isClaimEnabled = true</code>, ensuring all participants receive tokens simultaneously, neutralizing early-claim dumping.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">6. Zero-Gas Airdrop Protocol (Airdrop.sol)</h3>
          <p className="mb-4">
            To distribute the 7% community allocation without subjecting the protocol to Sybil attacks or high on-chain gas costs, Bitcoin Blue utilizes an advanced <strong>Off-Chain Verification, On-Chain Execution (ECDSA)</strong> model.
          </p>
          <p className="mb-4">
            Participants verify their identities via a centralized Oracle (the API). Upon successful verification, the Oracle generates an ECDSA signature over the payload <code>keccak256(abi.encodePacked(msg.sender, amount))</code> using a secured private key. 
            The user submits this signature to the <code>Airdrop.sol</code> contract via the <code>claimAirdrop</code> function. 
            The contract recovers the signer's address via <code>MessageHashUtils.toEthSignedMessageHash</code> and validates it against the authorized protocol Oracle. 
            This mathematical verification guarantees that tokens can only be claimed by legitimate, verified users without requiring the protocol to pay gas fees.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 font-sans uppercase">7. Macro Tokenomics</h3>
          <table className="w-full text-left font-sans text-sm border-collapse mt-4">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3">Allocation Sector</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">Volume (BTCBLUE)</th>
                <th className="p-3">Vesting / Lock Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-semibold">Institutional Presale</td>
                <td className="p-3">40%</td>
                <td className="p-3 font-mono">840,000</td>
                <td className="p-3">Distributed via Presale.sol</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-semibold">PancakeSwap Liquidity</td>
                <td className="p-3">28%</td>
                <td className="p-3 font-mono">588,000</td>
                <td className="p-3">Locked Permanently (LP Burned)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-semibold">CEX Listings & Marketing</td>
                <td className="p-3">15%</td>
                <td className="p-3 font-mono">315,000</td>
                <td className="p-3">Multi-Sig Secured</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-semibold">Ecosystem & Dev</td>
                <td className="p-3">10%</td>
                <td className="p-3 font-mono">210,000</td>
                <td className="p-3">Smart Contract Controlled</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Staking & Airdrop (Community)</td>
                <td className="p-3">7%</td>
                <td className="p-3 font-mono">147,000</td>
                <td className="p-3">Claimable via ECDSA</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-300 text-center font-sans text-sm text-gray-500">
          <p>
            This document represents the technical specifications of the Bitcoin Blue protocol. Smart contracts are immutable and self-executing. 
            Entities are encouraged to independently verify the source code published on the blockchain explorer.
          </p>
        </section>

      </main>
    </div>
  );
}
