import { useEffect, useState } from "react";
import * as stockService from "../../services/stockService";

export default function StockListPage({ user }) {
  const [stocks, setStocks] = useState([]);

useEffect(() => {
  if (!user) return; // :no_entry: wait until user is available
  async function fetchStocks() {
    const data = await stockService.getAll(); // :white_check_mark: token is now ready
    setStocks(data);
  }
  fetchStocks();
}, [user]); // :white_check_mark: run effect after user is set

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