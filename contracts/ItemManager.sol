// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "./Item.sol";
import "./Ownable.sol";

contract ItemManager {
    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        address _itemAdd;
        string _identifier;
        uint256 _priceInWei;
    }
    S_Item[] public indexArr;
    S_Item[] public productArr;

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
        productArr.push(items[index]);
        emit SupplyChainStep(index, uint256(items[index]._step), address(item));

        index++;
    }

    function getProducts(uint256 ind) public view returns (string memory) {
        return items[ind]._identifier;
    }

    function getIndic() public view returns (S_Item[] memory) {
        return productArr;
    }

    function triggerPayment(uint256 _index) public payable {
        require(items[_index]._priceInWei <= msg.value, "not fully paid");

        require(
            items[_index]._step == SupplyChainSteps.Created,
            "Item is further in the supply chain"
        );
        items[_index]._step = SupplyChainSteps.Paid;
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
