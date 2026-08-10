import Content from "./content.model";
import User from "./user.model";
import Tag from "./tag.model";

User.hasMany(Content, {foreignKey: "userId"});
Content.belongsTo(User, {foreignKey: "userId"});

Tag.belongsToMany(Content, {through: "ContentTag", foreignKey: "tagId", otherKey: "contentId"});
Content.belongsToMany(Tag, {through: "ContentTag", foreignKey: "contentId", otherKey: "tagId"});