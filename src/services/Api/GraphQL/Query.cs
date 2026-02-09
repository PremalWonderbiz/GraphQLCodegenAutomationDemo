namespace Api.GraphQL
{
    public class Query
    {
        public string Hello() => "Hello from .NET GraphQL 👋";

        public User GetUser() =>
            new User { Id = 1, Name = "Prem" };
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }
}
