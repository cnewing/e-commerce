const router = require("express").Router();
const { json } = require("express/lib/response");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll();
    res.status(200), json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// F I N D  B Y  I D
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [
        { model: Product, attribute: ["product_name", "price", "stock"] },
      ],
    });

    // E R R O R
    if (!catData) {
      res.status(404).json({ message: "ID could not find any categories!" });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// C R E A T E  C A T E G O R Y
router.post("/", async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// U P D A T E  C A T E G O R Y  B Y  I D
router.put("/:id", (req, res) => {
   try {
    const catData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!catData) {
      res.status(404).json({ message: "Cannot update! No category with this ID!" });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
