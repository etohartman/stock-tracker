import { useState } from "react";

export default function NoteForm({ onSave }) {
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onSave(content);
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Note</h3>
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Save Note</button>
    </form>
  );
}