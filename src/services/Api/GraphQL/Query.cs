namespace Api.GraphQL
{
    public class Query
    {
        // Simple string query
        public string Hello() => "Hello from .NET GraphQL 👋";

        // Single user query
        public User GetUser() => new User
        {
            Id = 1,
            Name = "Prem",
            Email = "prem@example.com",
            Age = 25,
            IsActive = true
        };

        // List of users
        public List<User> GetUsers() => new List<User>
        {
            new User { Id = 1, Name = "Prem", Email = "prem@example.com", Age = 25, IsActive = true },
            new User { Id = 2, Name = "John", Email = "john@example.com", Age = 30, IsActive = true },
            new User { Id = 3, Name = "Jane", Email = "jane@example.com", Age = 28, IsActive = false }
        };

        // User by ID
        public User? GetUserById(int id)
        {
            var users = GetUsers();
            return users.FirstOrDefault(u => u.Id == id);
        }

        // Products
        public List<Product> GetProducts() => new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Price = 999.99m, InStock = true, Category = "Electronics" },
            new Product { Id = 2, Name = "Mouse", Price = 25.50m, InStock = true, Category = "Electronics" },
            new Product { Id = 3, Name = "Keyboard", Price = 75.00m, InStock = false, Category = "Electronics" },
            new Product { Id = 4, Name = "Monitor", Price = 299.99m, InStock = true, Category = "Electronics" }
        };

        // Product by ID
        public Product? GetProductById(int id)
        {
            var products = GetProducts();
            return products.FirstOrDefault(p => p.Id == id);
        }

        // Search products by name
        public List<Product> SearchProducts(string searchTerm)
        {
            var products = GetProducts();
            return products.Where(p => p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        // Stats
        public Stats GetStats() => new Stats
        {
            TotalUsers = GetUsers().Count,
            ActiveUsers = GetUsers().Count(u => u.IsActive),
            TotalProducts = GetProducts().Count,
            ProductsInStock = GetProducts().Count(p => p.InStock)
        };
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public int Age { get; set; }
        public bool IsActive { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public string Category { get; set; } = "";
    }

    public class Stats
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int TotalProducts { get; set; }
        public int ProductsInStock { get; set; }
    }
}