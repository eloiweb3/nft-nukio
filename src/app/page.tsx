"use client"
import Image from "next/image";
import { ConnectButton, MediaRenderer, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { defineChain, getContract, toEther } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getActiveClaimCondition, getTotalClaimedSupply, nextTokenIdToMint } from "thirdweb/extensions/erc721";

export default function Home() {
  const chain = defineChain(sepolia);

  const contract = getContract({
    client,
    chain,
    address: "0xBb1d78c8799b33c5791ED6e49B84429c7106759E"
  });

  const {data: contractMetadata, isLoading: isContractMetadataLoading} = useReadContract( getContractMetadata , {contract:contract });
  const {data: claimSupply} = useReadContract(getTotalClaimedSupply, {contract:contract });
  const {data: totalNftSupply} = useReadContract(nextTokenIdToMint, {contract:contract });
  const {data: claimCondition} = useReadContract(getActiveClaimCondition, {contract:contract });
console.log('contractMetadata', contractMetadata);
const getPrice = (quantity: number) => {
  const total = quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");

  return toEther(BigInt(total))
} ;

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 text-center">
        <Header />
        <ConnectButton
            client={client}
            chain={chain}
          />
  <div className="flex flex-column items-center mt-4"></div>
    {isContractMetadataLoading ? (
      <span>Loading.....</span>
    ): (
      <>
      <MediaRenderer client={client} src={contractMetadata?.image}></MediaRenderer>

      </>
    )  }

      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-row items-center">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
       NFT Claim
      </h1>


    </header>
  );
}

