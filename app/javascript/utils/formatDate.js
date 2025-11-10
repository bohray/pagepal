export function formatDate(dateString) {
  if (!dateString) {
    console.error("No date present");
    return " ";
  } // handle undefined/null safely
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
