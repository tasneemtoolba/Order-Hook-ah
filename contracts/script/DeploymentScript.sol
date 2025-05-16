// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";
import {Currency, CurrencyLibrary} from "v4-core/types/Currency.sol";

import {TakeProfitsHook} from "../src/TakeProfitsHook.sol";

/// @notice Mines the address and deploys the PointsHook.sol Hook contract
contract TakeProfitsHookcript is Script, Deployers {
  function setUp() public {}
 
    function run() public {    // Deploy PoolManager and Router contracts
        deployFreshManagerAndRouters();
        deployMintAndApprove2Currencies();

    // Deploy our TOKEN contract
    // token = new ERC1155("Test Token", "TEST", 18);
    // tokenCurrency = Currency.wrap(address(token));

    // Mint a bunch of TOKEN to ourselves and to address(1)
    // token.mint(address(this), 1000 ether);
    // token.mint(address(1), 1000 ether);

    // Mine an address that has flags set for
    // the hook functions we want
    uint160 flags = uint160(
        Hooks.AFTER_ADD_LIQUIDITY_FLAG | Hooks.AFTER_SWAP_FLAG
    );
    (address hookAddress, bytes32 salt) =
        HookMiner.find(address(this),
        flags,
        type(TakeProfitsHook).creationCode,
        abi.encode(manager, ""));

    // (address hookAddress, bytes32 salt) = HookMiner.find(
    //     address(this),
    //     flags,
    //     0,
    //     type(TakeProfitsHook).creationCode,
    //     abi.encode(manager, "TEST_POINTS")
    // );

    // Deploy our hook
    TakeProfitsHook hook = new TakeProfitsHook{salt: salt}(
        manager,"" );

    // Approve our TOKEN for spending on the swap router and modify liquidity router
    // These variables are coming from the `Deployers` contract
      // Approve our hook address to spend these tokens as well
    ERC20(Currency.unwrap(currency0)).approve(
        address(hook),
        type(uint256).max
    );
    ERC20(Currency.unwrap(currency1)).approve(
        address(hook),
        type(uint256).max
    );

    // Initialize a pool
    (key, ) = initPool(currency0, currency1, hook, 3000, SQRT_PRICE_1_1);

}
}