const router = require('express').Router();
const { json } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint


router.get('/', (req, res) => {
  // find all tags
  try {
    const tag_Data = await Tag.FindAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
});

res.status(200).json(tag_Data);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tag_Data = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
});

if (!tag_Data) {
      res.status(404).json({ message: "Cannot find category with this ID!" });
      return;
    }

    res.status(200).json(tag_Data);
  } catch (err) {
    console.log(ERROR)
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new tag
try {
    const tag_Data = await Tag.create(req.body);
    res.status(200).json(tag_Data);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag_Data = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tag_Data) {
      res.status(404).json({ message: "Cannot update! No tag forund with this ID!" });
      return;
    }
    res.status(200).json(tag_Data);
  } catch (err) {
    console.log(ERROR)
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag_Data = await Tag.destroy(req.body, {
      where: { id: req.params.id },
    });
    if (!tag_Data) {
      res.status(404).json({ message: "Cannot delete! No tag found with this ID!" });
      return;
    }
    res.status(200).json(tag_Data);
  } catch (err) {
    console.log(ERROR);
    res.status(500).json(err);
  }
});


module.exports = router;
