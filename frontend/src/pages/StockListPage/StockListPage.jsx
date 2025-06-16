import { useEffect, useState } from "react";
import * as stockService from "../../services/stockService";

export default function StockListPage({ user }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      const data = await stockService.getAll();
      setStocks(data);
    }
    fetchStocks();
  }, []);

  return (
    <div>
      <h2>{user ? `${user.name}'s Stocks` : "Stocks"}</h2>
      {stocks.length ? (
        <ul>
          {stocks.map((stock) => (
            <li key={stock._id}>
              {stock.symbol} - {stock.name} ({stock.shares} shares)
            </li>
          ))}
        </ul>
      ) : (
        <p>No stocks found.</p>
      )}
    </div>
  );
}