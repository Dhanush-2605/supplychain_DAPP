// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Ownable {
    address payable _owner;

    constructor() {
        _owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(isOwner(), "you are not allowed");
        _;
    }
    function getOwner() public view returns(address){
        return _owner;

    }

    function isOwner() public view returns (bool) {
        return (msg.sender == _owner);
    }
}
