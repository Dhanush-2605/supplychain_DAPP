// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "./Item.sol";
import "./Ownable.sol";

contract ItemManager is Ownable {
    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        uint256 _index;       
        address _itemAdd;
        string _identifier;
        uint256 _priceInWei;
    }
    struct ProductDetails{       
        uint256 _count;
        uint256 _total;
    }
    mapping(address => ProductDetails) public productData;
    S_Item[] public indexArr;
    S_Item[] public productArr;
    // ProductDetails[] public productDetailsArr;

   
    
    mapping(uint256 => S_Item) public items;

    uint256 index;

    enum SupplyChainSteps {
        Created,
        Paid,
        Delivered
    }

    event SupplyChainStep(
        uint256 _itemIndex,
        uint256 _step,
        address _itemAddress
    );

    function createItem(string memory _identifier, uint256 _priceInWei) public {
        Item item = new Item(this, _priceInWei, index);
        items[index]._priceInWei = _priceInWei;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;
        items[index]._itemAdd = address(item);
        items[index]._index=index;
        productArr.push(items[index]);
        emit SupplyChainStep(index, uint256(items[index]._step), address(item));

        index++;
    }
    

    function getProducts(uint256 ind) public view returns (string memory) {
        return items[ind]._identifier;
    }

    function getProduct(address _address) public view returns(ProductDetails memory){
        return productData[_address];

    }

    function getIndic() public view returns (S_Item[] memory) {
        return productArr;
    }
    function getIndex() public view returns (uint){
        return index;
    }

    function triggerPayment(uint256 _index,address _address) public payable {
        require(items[_index]._priceInWei == msg.value, "not fully paid");

        require(
            items[_index]._step == SupplyChainSteps.Created,
            "Item is further in the supply chain"
        );
        items[_index]._step = SupplyChainSteps.Paid;
        productData[_address]._count+=1;
        productData[_address]._total+=msg.value;
        emit SupplyChainStep(
            _index,
            uint256(items[_index]._step),
            address(items[_index]._item)
        );
    }

    function triggerDelivery(uint256 _index) public {
        require(
            items[_index]._step == SupplyChainSteps.Paid,
            "Item is further in the supply chain"
        );
        items[_index]._step = SupplyChainSteps.Delivered;
        emit SupplyChainStep(
            _index,
            uint256(items[_index]._step),
            address(items[_index]._item)
        );
    }
}
