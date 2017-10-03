pragma solidity ^0.4.8;

import "./Token.sol";

contract TokenSale {
    Token public token;
    address public owner;

    function TokenSale(address _token) public payable {
        token = Token(_token);
        owner = msg.sender;
    }


}