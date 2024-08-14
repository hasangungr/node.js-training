
const connection = require('../utility/database');



module.exports = class Category {
    constructor(name, description) {
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory() {
        // categories.push(this);
        return connection.execute('insert into categories(name,description) values(?,?)', [this.name, this.description])
    }

    static getAll() {
        return connection.execute('select * from categories');
    }


    static getById(id) {
        // return categories.find(i => i.id === id);
        return connection.execute('select * from categories where id=?', [id]);


    }

    static update(category) {
        // const index = categories.findIndex(i => i.id === id);

        // categories[index].name = category.name;
        // categories[index].description = category.description;


        return connection.execute('update categories set categories.name=?,categories.description=?'[category.name, category.description]);


    }

    static deleteById(id) {
        // const index = categories.findIndex(i => i.id === id);
        // categories.splice(index, 1);


        return connection.execute('delete from categories where id=?'[id]);

    }
}