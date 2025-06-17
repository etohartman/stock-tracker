import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as stockService from '../../services/stockService';

export default function NewStockPage() {
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await stockService.create({ content });
      console.log('Stock Added');
      navigate('/stocks');
    } catch (err) {
      setErrorMsg('Adding Stock Failed');
    }
  }



  return (
    <>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <label>Stock Content</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">ADD STOCK</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  ); 
}