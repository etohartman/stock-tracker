import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import * as stockService from "../../services/stockService";

export default function StockListPage({ user }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function fetchStocks() {
      const data = await stockService.getAll();
      setStocks(data);
    }
    fetchStocks();
  }, [user]);

  return (
    <div>
      <h2>{user ? `${user.name}'s Stocks` : "Stocks"}</h2>
      {stocks.length ? (
        <ul>
          {stocks.map((stock) => (
            <li key={stock._id}>
              <NavLink to={`/stocks/${stock._id}`}>
                {stock.symbol} - {stock.name}
              </NavLink>
              {/* Optionally display shares or other info here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No stocks found.</p>
      )}
    </div>
  );
}