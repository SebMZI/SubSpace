import Content from "./content.model";
import User from "./user.model";
import Tag from "./tag.model";

User.hasMany(Content, {foreignKey: "userId"});
Content.belongsTo(User, {foreignKey: "userId"});

Tag.belongsToMany(Content, {through: "ContentTag", foreignKey: "tagId", otherKey: "id"});
Content.belongsToMany(Tag, {through: "ContentTag", foreignKey: "id", otherKey: "tagId"});

User.hasMany(Tag, {foreignKey: "userId"});
Tag.belongsTo(User, {foreignKey: "userId"});