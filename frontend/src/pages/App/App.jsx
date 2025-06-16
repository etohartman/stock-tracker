import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import * as stockService from "../../services/stockService";
import HomePage from "../HomePage/HomePage";
import StockListPage from "../StockListPage/StockListPage";
import NewStockPage from "../NewStockPage/NewStockPage";
import StockDetailsPage from "../StockDetailsPage/StockDetailsPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../components/NavBar/NavBar";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const handleDeleteStock = async (stockId) => {
    const deletedStock = await stockService.deleteStock(stockId);
    setStocks(stocks.filter((stock) => stock._id !== deletedStock._id));
    navigate("/stocks");
  };

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks" element={<StockListPage user={user} />} />
            <Route
              path="/stocks/:stockId"
              element={
                <StockDetailsPage
                  user={user}
                  handleDeleteStock={handleDeleteStock}
                />
              }
            />
            <Route path="/stocks/new" element={<NewStockPage />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}

