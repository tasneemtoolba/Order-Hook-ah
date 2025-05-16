// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title KYCRegistry
 * @dev A simple KYC registry contract that allows an owner to approve or revoke KYC status for addresses
 */
contract KYCRegistry is Ownable {
    // Mapping from address to KYC status
    mapping(address => bool) private _kycApproved;
    
    // Events
    event KYCApproved(address indexed user);
    event KYCRevoked(address indexed user);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Checks if an address has been KYC approved
     * @param user The address to check
     * @return bool True if the address is KYC approved, false otherwise
     */
    function isKYCApproved(address user) public view returns (bool) {
        return _kycApproved[user];
    }
    
    /**
     * @dev Approves KYC for a single address
     * @param user The address to approve
     */
    function approveKYC(address user) external onlyOwner {
        _kycApproved[user] = true;
        emit KYCApproved(user);
    }
    
    /**
     * @dev Approves KYC for multiple addresses at once
     * @param users Array of addresses to approve
     */
    function batchApproveKYC(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            _kycApproved[users[i]] = true;
            emit KYCApproved(users[i]);
        }
    }
    
    /**
     * @dev Revokes KYC for a single address
     * @param user The address to revoke
     */
    function revokeKYC(address user) external onlyOwner {
        _kycApproved[user] = false;
        emit KYCRevoked(user);
    }
    
    /**
     * @dev Revokes KYC for multiple addresses at once
     * @param users Array of addresses to revoke
     */
    function batchRevokeKYC(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            _kycApproved[users[i]] = false;
            emit KYCRevoked(users[i]);
        }
    }
}
