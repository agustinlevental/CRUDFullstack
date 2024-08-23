using Microsoft.EntityFrameworkCore;

namespace sample_crud_be.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<Employee>().HasData(
                new Employee { ID = 99, Name = "Agustín Levental", Age = 31, IsActive = 1 },
                new Employee { ID = 98, Name = "John Doe", Age = 30, IsActive = 0 },
                new Employee { ID =97, Name = "Jane Smith", Age = 25, IsActive = 0 },
                new Employee { ID = 96, Name = "Bob Johnson", Age = 40, IsActive = 1 }
            );
        }
    }
}
