using System;
using System.Collections.Generic;
using Microsoft.Build.Framework;

namespace NotSecretRecipe.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public Category Category { get; set; }
        public DateTime CreateDate { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Direction> Preparations { get; set; }
        public List<Direction> Directions { get; set; }

    }

    public class Direction
    {
        public string Description { get; set; }
        public int Step { get; set; }
    }

    public class Ingredient
    {
        public string Name { get; set; }
    }
}
