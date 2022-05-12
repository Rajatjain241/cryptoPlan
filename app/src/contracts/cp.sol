// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;
contract NewWill {
    address public owner;
    string public model;
    address public carAddr;
    mapping(address => uint) private _state;
    mapping(address => address[]) private _addresses;
    mapping(address => mapping(address => string)) public _aliases;
    uint public Fixedpercentage = 50;
    constructor(address _owner, string memory _model) payable {
        owner = _owner;
        model = _model;
        carAddr = address(this);
    }
    function setOwner (address newOwner) public {
        owner = newOwner;
    }
    function setModel(string memory newModel) public {
        model = newModel;
    }
    function setCommonPercentage(uint _userInput) public {
        Fixedpercentage = _userInput;
    }
    function getAddresses() public view returns (address[] memory) {
        return _addresses[msg.sender];
    }
    function addBeneficiaries(address beneficiary, string memory _aliase) public {
        _addresses[msg.sender].push(beneficiary);
        _aliases[msg.sender][beneficiary] = _aliase;
        _state[msg.sender]++;
    }
    function removeBeneficiary(address beneficiary) public {
        uint length = _addresses[msg.sender].length;
        for(uint i = 0; i < length; i++) {
            if (beneficiary == _addresses[msg.sender][i]) {
                // if (1 < _addresses[msg.sender].length && i < length-1) {
                //     _addresses[msg.sender][i] = _addresses[msg.sender][length-1];
                // }
                delete _addresses[msg.sender][i];
                // _addresses[msg.sender].length--;
                delete _aliases[msg.sender][beneficiary];
                _state[msg.sender]++;
                break;
            }
        }
    }
    function getAlias(address beneficiary) public view returns (string memory) {
        return _aliases[msg.sender][beneficiary];
    }
    function getState() public view returns (uint) {
        return _state[msg.sender];
    }
}
contract WillFactory {
    NewWill[] public wills;
    function create(address _owner, string memory _model) public returns(address){
        NewWill newwill = new NewWill(_owner, _model);
        wills.push(newwill);
        return address(newwill);
    }
    // function createAndSendEther(address _owner, string memory _model) public payable {
    //     Car car = (new Car){value: msg.value}(_owner, _model);
    //     cars.push(car);
    // }
    // function create2AndSendEther(
    //     address _owner,
    //     string memory _model,
    //     bytes32 _salt
    // ) public payable {
    //     Car car = (new Car){value: msg.value, salt: _salt}(_owner, _model);
    //     cars.push(car);
    // }
    function getWillDetails(uint _index)
        public
        view
        returns (
            address owner,
            string memory model,
            address carAddr,
            uint balance
        )
    {
        NewWill newwill = wills[_index];
        return (newwill.owner(), newwill.model(), newwill.carAddr(), address(newwill).balance);
    }
}