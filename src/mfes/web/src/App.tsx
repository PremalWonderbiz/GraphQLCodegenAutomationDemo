import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import "./App.css";
import {
  GetProductByIdQuery,
  GetProductsQuery,
  getSdk,
  GetStatsQuery,
  GetUserByIdQuery,
  GetUsersQuery,
  SearchProductsQuery,
} from "./graphql/generated";

const client = new GraphQLClient("http://localhost:8080/graphql");
const sdk = getSdk(client);

function App() {
  const [hello, setHello] = useState<string>("");
  const [users, setUsers] = useState<GetUsersQuery["users"]>([]);
  const [products, setProducts] = useState<GetProductsQuery["products"]>([]);
  const [stats, setStats] = useState<GetStatsQuery["stats"] | null>(null);
  const [selectedUser, setSelectedUser] = useState<
    GetUserByIdQuery["userById"] | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<
    GetProductByIdQuery["productById"] | null
  >(null);
  const [searchResults, setSearchResults] = useState<
    SearchProductsQuery["searchProducts"]
  >([]);
  const [loading, setLoading] = useState<string>("");

  const fetchHello = async () => {
    setLoading("hello");
    try {
      const data = await sdk.Hello();
      setHello(data.hello);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
    setLoading("");
  };

  const fetchUsers = async () => {
    setLoading("users");
    try {
      const data = await sdk.GetUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading("");
  };

  const fetchUserById = async (id: number) => {
    setLoading("userById");
    try {
      const data = await sdk.GetUserById({ id });
      setSelectedUser(data.userById);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading("");
  };

  const fetchProducts = async () => {
    setLoading("products");
    try {
      const data = await sdk.GetProducts();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading("");
  };

  const fetchProductById = async (id: number) => {
    setLoading("productById");
    try {
      const data = await sdk.GetProductById({ id });
      setSelectedProduct(data.productById);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading("");
  };

  const searchProducts = async (searchTerm: string) => {
    setLoading("search");
    try {
      const data = await sdk.SearchProducts({ searchTerm });
      setSearchResults(data.searchProducts);
    } catch (error) {
      console.error("Error searching products:", error);
    }
    setLoading("");
  };

  const fetchStats = async () => {
    setLoading("stats");
    try {
      const data = await sdk.GetStats();
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading("");
  };

  return (
    <div className="App">
      <h1>GraphQL API Tester</h1>

      {/* Hello Query */}
      <section>
        <h2>Simple Query</h2>
        <button onClick={fetchHello} disabled={loading === "hello"}>
          {loading === "hello" ? "Loading..." : "Fetch Hello"}
        </button>
        {hello && (
          <p>
            <strong>Response:</strong> {hello}
          </p>
        )}
      </section>

      {/* Users */}
      <section>
        <h2>Users</h2>
        <button onClick={fetchUsers} disabled={loading === "users"}>
          {loading === "users" ? "Loading..." : "Fetch All Users"}
        </button>
        {users.length > 0 && (
          <div>
            <h3>All Users ({users.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.isActive ? "✅" : "❌"}</td>
                    <td>
                      <button onClick={() => fetchUserById(user.id)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedUser && (
          <div className="detail-card">
            <h3>Selected User</h3>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Age:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        )}
      </section>

      {/* Products */}
      <section>
        <h2>Products</h2>
        <button onClick={fetchProducts} disabled={loading === "products"}>
          {loading === "products" ? "Loading..." : "Fetch All Products"}
        </button>
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Search products..."
            onKeyUp={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 2) {
                searchProducts(target.value);
              }
            }}
          />
        </div>
        {products.length > 0 && (
          <div>
            <h3>All Products ({products.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>In Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>{product.inStock ? "✅" : "❌"}</td>
                    <td>
                      <button onClick={() => fetchProductById(product.id)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {searchResults.length > 0 && (
          <div>
            <h3>Search Results ({searchResults.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.inStock ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedProduct && (
          <div className="detail-card">
            <h3>Selected Product</h3>
            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
            </p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>In Stock:</strong>{" "}
              {selectedProduct.inStock ? "Yes" : "No"}
            </p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section>
        <h2>Statistics</h2>
        <button onClick={fetchStats} disabled={loading === "stats"}>
          {loading === "stats" ? "Loading..." : "Fetch Stats"}
        </button>
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-value">{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p className="stat-value">{stats.activeUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
            <div className="stat-card">
              <h3>In Stock</h3>
              <p className="stat-value">{stats.productsInStock}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
