import User from "./user.model.js";
import Category from "./category.model.js";
import Transaction from "./transaction.model.js";


/**
 * User ↔ Transaction
 */
User.hasMany(Transaction,{
    foreignKey: "userId"
})

Transaction.belongsTo(User, {
    foreignKey: "userId",
});

/**
 * Category ↔ Transaction
 */
Category.hasMany(Transaction, {
    foreignKey: "categoryId",
});

Transaction.belongsTo(Category, {
    foreignKey: "categoryId",
});


export { User, Category, Transaction };