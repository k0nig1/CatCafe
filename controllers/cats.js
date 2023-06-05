const Cat = require('../models/cat');

module.exports.index = async (req, res) => {
    const cats = await Cat.find({});
    res.render('cats/index', { cats });
}

module.exports.createCat = async (req, res) => {
    const cat = new Cat(req.body.cat)
    await cat.save();
    res.redirect(`/cats/${cat._id}`);
}

module.exports.renderNewForm = (req, res) => {
    res.render('cats/new');
}

module.exports.showCat = async (req, res) => {
    const cat = await Cat.findById(req.params.id);
    res.render('cats/show', { cat });
}

module.exports.updateCat = async (req, res) => {
    const { id } = req.params;
    const cat = await Cat.findByIdAndUpdate(id, { ...req.body.cat });
    res.redirect(`/cats/${cat._id}`);
}

module.exports.deleteCat = async (req, res) => {
    const { id } = req.params;
    await Cat.findByIdAndDelete(id);
    res.redirect('/cats');
}

module.exports.renderEditForm = async (req, res) => {
    const cat = await Cat.findById(req.params.id);
    res.render('cats/edit', { cat });
}