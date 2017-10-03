import "./StandardToken.sol";

pragma solidity ^0.4.8;

contract StarsToken is StandardToken {
    function StarsToken() StandardToken(1000000, 0, "STARS Token", "STARS") public {

    }
}
