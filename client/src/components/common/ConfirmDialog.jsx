// export default function ConfirmDialog({
//   open,
//   title = "Confirm Delete",
//   message = "Are you sure you want to delete this item?",
//   onConfirm,
//   onCancel,
//   loading = false,
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//       <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
//         <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

//         <p className="mt-2 text-sm text-gray-600">{message}</p>

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={loading}
//             className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={loading}
//             className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ConfirmDialog({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">!</div>

        <h2 className="confirm-title">{title}</h2>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button
            type="button"
            className="confirm-cancel-btn"
            onClick={onCancel}
            disabled={loading}>
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-btn"
            onClick={onConfirm}
            disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
