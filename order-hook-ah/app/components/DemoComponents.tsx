"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";
import { encodeFunctionData } from "viem";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
        <Button variant="outline" onClick={() => setActiveTab("home")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <LimitOrderForm token0Name="HOOKah" token1Name="USDC" />
      {/* <TransactionCard /> */}
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type LimitOrderFormProps = {
  token0Name: string;
  token1Name: string;
}
const placeOrderABI = [{
  "type": "function",
  "name": "placeOrder",
  "inputs": [
    {
      "name": "key",
      "type": "tuple",
      "internalType": "struct PoolKey",
      "components": [
        {
          "name": "currency0",
          "type": "address",
          "internalType": "Currency"
        },
        {
          "name": "currency1",
          "type": "address",
          "internalType": "Currency"
        },
        {
          "name": "fee",
          "type": "uint24",
          "internalType": "uint24"
        },
        {
          "name": "tickSpacing",
          "type": "int24",
          "internalType": "int24"
        },
        {
          "name": "hooks",
          "type": "address",
          "internalType": "contract IHooks"
        }
      ]
    },
    {
      "name": "tickToSellAt",
      "type": "int24",
      "internalType": "int24"
    },
    {
      "name": "zeroForOne",
      "type": "bool",
      "internalType": "bool"
    },
    {
      "name": "inputAmount",
      "type": "uint256",
      "internalType": "uint256"
    }
  ],
  "outputs": [
    {
      "name": "",
      "type": "int24",
      "internalType": "int24"
    }
  ],
  "stateMutability": "nonpayable"
}] as const;
function LimitOrderForm({ token0Name = "WETH", token1Name = "USDC" }: LimitOrderFormProps) {
  const [tickAmount, setTickAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(token0Name);
  const { address } = useAccount();
  const sendNotification = useNotification();

  // Example transaction call - This should be replaced with actual limit order contract call
  const calls = useMemo(() => address
    ? [
      {
        to: "0x256c1e930D23174cBad9A0c96099fb35bB531040", // This should be your limit order hook contract address
        data: encodeFunctionData({
          abi: placeOrderABI,
          functionName: "placeOrder",
          args: [{
            "currency0": "0x04A7879B5bDc08Fd0cf232DCf0ccB1dB7AE86abf",
            "currency1": "0x8683B74A60f2c6Eb8215Eb88416B745E86DDbE2d",
            "fee": 0x800000,  // swapFee
            "tickSpacing": 60,
            "hooks": "0x256c1e930D23174cBad9A0c96099fb35bB531040"

          },
            121,
            false,
          BigInt(1)]
        }),
        value: BigInt(0),
      },
    ]
    : [], [address]);

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;
    console.log(`Limit order placed successfully: ${transactionHash}`);
    await sendNotification({
      title: "Limit Order Placed!",
      body: `Your limit order has been placed successfully. Hash: ${transactionHash}`,
    });
  }, [sendNotification]);

  return (
    <Card title="Place Limit Order">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Tick Amount
            </label>
            <input
              type="number"
              value={tickAmount}
              onChange={(e) => setTickAmount(e.target.value)}
              placeholder="Enter tick amount..."
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Token Amount
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                placeholder="Enter token amount..."
                className="flex-1 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              >
                <option value={token0Name}>{token0Name}</option>
                <option value={token1Name}>{token1Name}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {address ? (
              <Transaction
                calls={calls}
                onSuccess={handleSuccess}
                onError={(error: TransactionError) =>
                  console.error("Limit order failed:", error)
                }
              >
                <TransactionButton
                  className="w-full text-white text-md bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] px-4 py-2 rounded-lg"
                  text="Place Limit Order"
                />
                <TransactionStatus>
                  <TransactionStatusAction />
                  <TransactionStatusLabel />
                </TransactionStatus>
                <TransactionToast className="mb-4">
                  <TransactionToastIcon />
                  <TransactionToastLabel />
                  <TransactionToastAction />
                </TransactionToast>
              </Transaction>
            ) : (
              <p className="text-yellow-400 text-sm text-center mt-2">
                Connect your wallet to place a limit order
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)]">
          <h4 className="text-sm font-medium text-[var(--app-foreground)] mb-2">Order Summary</h4>
          <p className="text-sm text-[var(--app-foreground-muted)]">
            You will swap {tokenAmount || '0'} {selectedToken} at tick {tickAmount || '0'}
          </p>
        </div>
      </div>
    </Card>
  );
}

// function TransactionCard() {
//   const { address } = useAccount();

//   // Example transaction call - sending 0 ETH to self
//   const calls = useMemo(() => address
//     ? [
//       {
//         to: address,
//         data: "0x" as `0x${string}`,
//         value: BigInt(0),
//       },
//     ]
//     : [], [address]);

//   const sendNotification = useNotification();

//   const handleSuccess = useCallback(async (response: TransactionResponse) => {
//     const transactionHash = response.transactionReceipts[0].transactionHash;

//     console.log(`Transaction successful: ${transactionHash}`);

//     await sendNotification({
//       title: "Congratulations!",
//       body: `You sent your a transaction, ${transactionHash}!`,
//     });
//   }, [sendNotification]);

//   return (
//     <Card title="Make Your First Transaction">
//       <div className="space-y-4">
//         <p className="text-[var(--app-foreground-muted)] mb-4">
//           Experience the power of seamless sponsored transactions with{" "}
//           <a
//             href="https://onchainkit.xyz"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-[#0052FF] hover:underline"
//           >
//             OnchainKit
//           </a>
//           .
//         </p>

//         <div className="flex flex-col items-center">
//           {address ? (
//             <Transaction
//               calls={calls}
//               onSuccess={handleSuccess}
//               onError={(error: TransactionError) =>
//                 console.error("Transaction failed:", error)
//               }
//             >
//               <TransactionButton className="text-white text-md" />
//               <TransactionStatus>
//                 <TransactionStatusAction />
//                 <TransactionStatusLabel />
//               </TransactionStatus>
//               <TransactionToast className="mb-4">
//                 <TransactionToastIcon />
//                 <TransactionToastLabel />
//                 <TransactionToastAction />
//               </TransactionToast>
//             </Transaction>
//           ) : (
//             <p className="text-yellow-400 text-sm text-center mt-2">
//               Connect your wallet to send a transaction
//             </p>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }
