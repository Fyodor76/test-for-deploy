import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import { baseURL } from '../../const/baseUrl';

export const Cart = () => {
    const { items, removeItem, updateItemQuantity, fetchCartItems } = useCart();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
  
    useEffect(() => {
      fetchCartItems();
    }, []);
  
    useEffect(() => {
      setSelectAll(items.length > 0 && selectedItems.length === items.length);
    }, [items, selectedItems]);
  
    const handleRemoveItem = (itemId: string) => {
      removeItem(itemId);
      setSelectedItems(prevSelected => prevSelected.filter(id => id !== itemId));
    };
  
    const handleQuantityChange = (itemId: string, quantity: number) => {
      updateItemQuantity(itemId, quantity);
    };
  
    const handleSelectItem = (itemId: string) => {
      setSelectedItems(prevSelected =>
        prevSelected.includes(itemId)
          ? prevSelected.filter(id => id !== itemId)
          : [...prevSelected, itemId]
      );
    };
  
    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedItems([]);
      } else {
        setSelectedItems(items.map(item => item.id));
      }
      setSelectAll(!selectAll);
    };
  
    const handleRemoveSelectedItems = async () => {
      await Promise.all(selectedItems.map(itemId => removeItem(itemId)));
      setSelectedItems([]);
    };
  
    return (
      <div className="cart">
        <h2>Корзина</h2>
        {items.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          <>
            <div className="cart-header">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="select-all-checkbox"
              />
              <span>Выбрать все</span>
            </div>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item?.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="cart-item-checkbox"
                  />
                  <img src={`${baseURL}${item?.Product?.imageUrl}`} alt={item?.Product?.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item?.Product?.name}</span>
                    <span className="cart-item-price">{item?.price * item.quantity} Р</span>
                  </div>
                  <input
                    type="number"
                    value={item?.quantity}
                    min="1"
                    onChange={e => handleQuantityChange(item?.id, parseInt(e.target.value, 10))}
                    className="cart-item-quantity"
                  />
                  <button onClick={() => handleRemoveItem(item?.id)} className="cart-item-remove">
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              {selectedItems.length > 0 && (
                <button onClick={handleRemoveSelectedItems} className="remove-selected-button">Удалить выбранные</button>
              )}
            </div>
          </>
        )}
      </div>
    );
  };