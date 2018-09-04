const home = (req, res, next) => {
    res.status(200).send({msg: "Hello World!"})
}

module.exports = home;