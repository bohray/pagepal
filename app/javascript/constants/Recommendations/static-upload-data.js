export const initialFormData = {
  title: "",
  author: "",
  description: "",
  review: "",
  imageFile: null,
  image_url: "",
};

export const formFields = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
    placeholder: "Enter book title",
  },
  {
    label: "Author",
    name: "author",
    type: "text",
    required: true,
    placeholder: "Enter author name",
  },
  {
    label: "Genre",
    name: "genre",
    type: "text",
    required: true,
    placeholder: "Enter book genre",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    required: false,
    placeholder: "Enter book description",
    rows: 3,
  },
  {
    label: "Your Review (Max 250 characters)",
    name: "review",
    type: "textarea",
    required: true,
    placeholder: "Share your thoughts about this book...",
    rows: 4,
    maxLength: 250,
  },
  { label: "Cover Image", name: "image", type: "file", required: false },
];
