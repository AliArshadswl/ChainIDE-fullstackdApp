pragma solidity ^0.8.0;

contract StoreGreetings {
  string private myGreeting;

  function getGreeting() public view returns (string memory) {
    return myGreeting;
  }

  function setGreeting(string memory _myString) public {
    myGreeting = _myString;
  }
}