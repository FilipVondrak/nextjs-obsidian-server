export default function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-2xl text-red-500 font-bold">Note not found</h1>
      <p className="mt-2 text-gray-600">
        The note you are looking for doesn’t exist in your vault.
      </p>
    </div>
  );
}