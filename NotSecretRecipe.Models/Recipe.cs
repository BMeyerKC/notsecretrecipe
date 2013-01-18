﻿using System.Collections.Generic;

namespace NotSecretRecipe.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public Category Category { get; set; }
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