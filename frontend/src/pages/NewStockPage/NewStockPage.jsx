import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as stockService from '../../services/stockService';

export default function NewStockPage() {
  const [content, setContent] = useState({symbol: '', name: '', priceAddedAt:0});
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  async function handleChange(evt) {
    setContent({ ...content, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await stockService.create({ content });
      console.log('Stock Added');
      navigate('/stocks');
    } catch (err) {
      console.error('Add stock error:', err);
      setErrorMsg('Adding Stock Failed');
    }
  }

  return (
    <>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <label>Stock Symbol</label>
        <input
          type="text"
          value={content.symbol}
          onChange={handleChange}
          required
          name = "symbol"
        />
        <label>Stock Name</label>
        <input
          type="text"
          value={content.name}
          onChange={handleChange}
          required
          name = "name"
        />
        <label>Stock Price</label>
        <input
          type="number"
          value={content.priceAddedAt}
          onChange={handleChange}
          required
          name = "priceAddedAt"
          step="0.01"
          min="0"
        />

        <button type="submit">ADD STOCK</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  ); 
}