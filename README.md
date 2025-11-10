Sure! Here's a complete copy-paste README file you can use directly:

````markdown
# PagePal

PagePal is a book recommendation platform where users can discover, share, and vote on their favorite books.

---

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd pagepal
```
````

2. Install dependencies:

```bash
bundle install
yarn install
```

3. Set up environment variables in a `.env` file:

```
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_local_password
DATABASE_HOST=localhost
```

4. Set up the database:

```bash
rails db:create
rails db:migrate
rails db:seed
```

**Demo Account:**

- Email: `user1@example.com`
- Password: `password123`

5. Start the app:

```bash
rails server
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```

You can save this as `README.md` and it’s ready to go.
```
