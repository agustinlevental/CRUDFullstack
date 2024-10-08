﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using sample_crud_be.Models;

#nullable disable

namespace sample_crud_be.Migrations
{
    [DbContext(typeof(EmployeeContext))]
    [Migration("20240823131816_dataSeeds")]
    partial class dataSeeds
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("sample_crud_be.Models.Employee", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<int>("IsActive")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Employees");

                    b.HasData(
                        new
                        {
                            ID = 99,
                            Age = 31,
                            IsActive = 1,
                            Name = "Agustín Levental"
                        },
                        new
                        {
                            ID = 98,
                            Age = 30,
                            IsActive = 0,
                            Name = "John Doe"
                        },
                        new
                        {
                            ID = 97,
                            Age = 25,
                            IsActive = 0,
                            Name = "Jane Smith"
                        },
                        new
                        {
                            ID = 96,
                            Age = 40,
                            IsActive = 1,
                            Name = "Bob Johnson"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
