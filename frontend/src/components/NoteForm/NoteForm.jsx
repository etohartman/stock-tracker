export default function NoteForm() {
  return (
    <form>
      <h3>Add a Note</h3>
      <textarea placeholder="Write your note here..." />
      <button type="submit">Save Note</button>
    </form>
  );
}