# 💨 Order Hookah 🧞‍♂️  
**Uniswap v4 Hook + Farcaster Miniapp on Base**  

## 🧠 Intro  

Order Hookah is a UX-first miniapp that allows users to place **limit orders** on Uniswap v4 in exchange for potential profits.  
Built with a Uniswap v4 **custom hook**, it wraps powerful DeFi infrastructure into a sleek **Farcaster miniapp** using [MiniKit](https://docs.farcaster.xyz/developers/minikits/intro) and [Coinbase's Developer Kit](https://docs.wallet.coinbase.com/wallet-sdk/overview).

Our mission is simple:  
**Empower users to schedule profitable trades with the least amount of friction.**  

---

## 🚀 How It Works  

1. **The user opens Order Hookah** on Farcaster (via Frames).
2. **They place a limit order** (e.g., Buy ETH at 2900).
3. The custom **Uniswap v4 Hook** holds the order securely.
4. When market conditions match the user’s price:
   - A swap is triggered.
   - The user earns their target asset.
5. Users can **claim profits** or **view active orders** in-app.

This all happens in a **gas-efficient**, **non-custodial**, and **mobile-first** way—right from social feeds.

---

## 🌐 Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| Protocol      | Uniswap v4 Hook (Limit Order)     |
| Frontend      | Farcaster Miniapp via MiniKit     |
| Wallet        | Coinbase Wallet SDK               |
| Chain         | 🟦 Base (L2) - Fast & Cheap        |

---

## 🛠 Setup Instructions

### 🔧 Contracts

> Requires [Foundry](https://book.getfoundry.sh/)

```bash
forge install
forge build
forge test -vvvv --via-ir
```

## 🌐 Frontend (Farcaster Miniapp)

> Requires bun or npm and access to Warpcast Developer tools

```bash
bun install
bun run dev
```

## 📁 Project Structure

```bash
/src/OrderHookah.sol        - The Uniswap v4 Hook logic
/src/OrderRegistry.sol      - Tracks user orders
/frontend/                  - Farcaster MiniApp (MiniKit + Coinbase SDK)
/script/Deploy.s.sol        - Deployment script for the hook
/test/OrderHookah.t.sol     - Hook unit tests
/assets/                    - UX mocks, hook flow diagrams
```


---

## 📸 UX Preview  

![OrderHookah UX](./assets/OrderHookahUX.png)

*Simple, mobile-first limit order flow inside Warpcast.*

---

## 🤝 Integrations

- [Uniswap v4 Core](https://github.com/uniswap/v4-core)
- [v4 Periphery](https://github.com/uniswap/v4-periphery)
- [MiniKit (Farcaster Dev)](https://docs.farcaster.xyz/developers/minikits/intro)
- [Coinbase Developer Kit](https://docs.wallet.coinbase.com/wallet-sdk/overview)
- [Base Docs](https://docs.base.org/)

---

## 🌍 Deployed On

- **Base L2 (Mainnet)** – Contracts deployed  
- **Farcaster Frame** – Live miniapp inside Warpcast  
- **Frontend** – Integrated with Coinbase Wallet  

> More deployment details coming soon in `/deployments/` folder.

---

## 🧩 Future Improvements

- [ ] Add cancel/modify order functionality  
- [ ] Cross-chain support using intents  
- [ ] Support for gasless UX with ERC-4337  

---

## 🔗 Links & Resources

- [Uniswap v4 Docs](https://docs.uniswap.org/contracts/v4/overview)
- [Uniswap v4 by Example](https://v4-by-example.org/)
- [Farcaster Developer Docs](https://docs.farcaster.xyz/)
- [Coinbase Wallet SDK](https://docs.wallet.coinbase.com/wallet-sdk/overview)
- [Base Documentation](https://docs.base.org/)

---

**Built with love at Base Batch Hackathon**  
*Hook smarter, not harder.*
