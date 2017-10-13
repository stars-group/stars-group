pragma solidity ^0.4.8;

import "./Token.sol";

contract TokenSale {
    Token public token;
    address public owner;
    uint256 public rate;
    uint256 public raised;
    uint256 public sold;

    function TokenSale(address _token, uint256 _rate) public payable {
        token = Token(_token);
        owner = msg.sender;
        setRate(_rate);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setRate(uint256 _rate) public onlyOwner {
        rate = 1000000000000000000 / _rate;
    }

    function () payable {
        require(valid());
        uint256 tokens = msg.value / rate;
        require(tokens > 0);
        token.transferFrom(owner, msg.sender, tokens);
        owner.transfer(msg.value);
        raised = raised + msg.value;
        sold = sold + tokens;
    }

    function valid() internal constant returns (bool) {
        return msg.value != 0;
    }

}