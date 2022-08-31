const router = require("express").Router();
const { json } = require("express/lib/response");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
try {
  const catData = await Category.findAll();
  res.status(200),json(catData);
} 
catch (err) {
  res.status(500).json(err);
}
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product, attribute: ["product_name", "price", "stock"]},
      ],
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
