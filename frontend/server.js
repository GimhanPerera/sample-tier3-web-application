import express from "express";
import fetch from "node-fetch";

const app = express();

// Use env variable or fallback
const API = process.env.BACKEND_API || "http://localhost:5000/api/fruits";

app.use(express.urlencoded({ extended: true }));

// Render page
app.get("/", async (req, res) => {
    const response = await fetch(API);
    const fruits = await response.json();

    const rows = fruits.map(fruit => `
        <tr>
            <td>${fruit.id}</td>
            <td>${fruit.name}</td>
            <td>${fruit.price}</td>
            <td>
                <form method="POST" action="/edit/${fruit.id}">
                    <input name="name" value="${fruit.name}" />
                    <input name="price" value="${fruit.price}" />
                    <button type="submit">Update</button>
                </form>
            </td>
        </tr>
    `).join("");

    res.send(`
        <html>
        <head><title>Fruit Store</title></head>
        <body>
            <h2>Fruit List</h2>

            <form method="POST" action="/add">
                <input name="name" placeholder="Fruit name" required />
                <input name="price" placeholder="Price" required />
                <button type="submit">Add Fruit</button>
            </form>

            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                ${rows}
            </table>
        </body>
        </html>
    `);
});

// Add fruit
app.post("/add", async (req, res) => {
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
    });

    res.redirect("/");
});

// Edit fruit
app.post("/edit/:id", async (req, res) => {
    await fetch(`${API}/${req.params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
    });

    res.redirect("/");
});

app.listen(80, () => {
    console.log("SSR app running on port 80");
});
