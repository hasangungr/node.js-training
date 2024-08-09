exports.get404page = (req, res) => {
    res.status(404).render('./error/404', {
        title: "Error"
    });
}