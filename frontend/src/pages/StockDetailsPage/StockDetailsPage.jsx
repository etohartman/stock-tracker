import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as stockService from "../../services/stockService";
import NoteForm from "../../components/NoteForm/NoteForm";

export default function StockDetailsPage({ user, handleDeleteStock }) {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ symbol: "", name: "", priceAddedAt: 0 });
  const navigate = useNavigate();
const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchStock() {
      try {
        const data = await stockService.getById(stockId);
        setStock(data);
        setNotes(data.notes || []);
        setForm({
          symbol: data.symbol,
          name: data.name,
          priceAddedAt: data.priceAddedAt,
        });
      } catch (err) {
        setError("Failed to load stock details.");
      }
    }
    fetchStock();
  }, [stockId]);

  async function handleAddNote(noteContent) {
    try {
      const newNote = await stockService.addNote(stockId, noteContent);
      setNotes([...notes, newNote]);
    } catch (err) {
      setError("Failed to add note.");
    }
  }

  useEffect(() => {
    async function fetchStock() {
      try {
        const data = await stockService.getById(stockId);
        setStock(data);
        setForm({
          symbol: data.symbol,
          name: data.name,
          priceAddedAt: data.priceAddedAt,
        });
      } catch (err) {
        setError("Failed to load stock details.");
      }
    }
    fetchStock();
  }, [stockId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const updated = await stockService.update(stockId, form);
      setStock(updated);
      setEditing(false);
    } catch (err) {
      setError("Failed to update stock.");
    }
  }

  if (error) return <p>{error}</p>;
  if (!stock) return <p>Loading...</p>;

  return (
    <div>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <label>
            Symbol:
            <input
              name="symbol"
              value={form.symbol}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price When Added:
            <input
              name="priceAddedAt"
              type="number"
              value={form.priceAddedAt}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>
            {stock.symbol} - {stock.name}
          </h2>
          <p>
            <strong>Price When Added:</strong> ${stock.priceAddedAt}
          </p>
          {stock.currentPrice !== undefined && (
            <p>
              <strong>Current Price:</strong> ${stock.currentPrice}
            </p>
          )}
          <button onClick={() => setEditing(true)}>Edit</button>
          <button
            onClick={() => {
              handleDeleteStock(stock._id);
            }}
            style={{ background: "#b22222", color: "#fff", marginLeft: "1rem" }}
          >
            Delete Stock
          </button>
 <h3>Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.content}</li>
        ))}
      </ul>
      <NoteForm onSave={handleAddNote} />

        </>
      )}
    </div>
  );
}