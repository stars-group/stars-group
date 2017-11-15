pragma solidity ^0.4.8;

import "./Token.sol";

contract TokenSale {
    Token public token;
    address public owner;

    uint256 public rate;
    uint256 public minimum;
    bool public released = false;
   
    uint256 public raised;
    uint256 public sold;
    mapping (address => uint256) balances;

    function TokenSale(address _token, uint256 _rate, uint256 _minimum) public payable {
        token = Token(_token);
        owner = msg.sender;
        setRate(_rate);
        setMinimum(_minimum);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setRate(uint256 _rate) public onlyOwner {
        rate = 1000000000000000000 / _rate;
    }

    function setMinimum(uint256 _minimum) public onlyOwner {
        minimum = _minimum;
    }

    function setRelease(bool value) public onlyOwner {
        released = value;
    }

    function balanceOf(address _from) constant public returns (uint256 balance) {
        return balances[_from];
    }

    function claim() public {
        require(released == true);
        uint256 balance = balances[msg.sender];
        token.transfer(msg.sender, balance);
        balances[msg.sender] = 0;
    }

    function () public payable {
        require(msg.value > 0);
        uint256 tokens = msg.value / rate;
        require(tokens > minimum);
        token.transferFrom(owner, this, tokens);
        balances[msg.sender] += tokens;
        owner.transfer(msg.value);
        raised = raised + msg.value;
        sold = sold + tokens;
    }

    function valid() internal constant returns (bool) {
        return msg.value != 0;
    }

}