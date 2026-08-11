import Content from "./content.model";
import User from "./user.model";
import Tag from "./tag.model";

User.hasMany(Content, {foreignKey: "userId"});
Content.belongsTo(User, {foreignKey: "userId"});

Tag.belongsToMany(Content, {through: "ContentTags", foreignKey: "tagId", otherKey: "contentId", onDelete: "CASCADE", onUpdate: "CASCADE", timestamps: true});
Content.belongsToMany(Tag, {through: "ContentTags", foreignKey: "contentId", otherKey: "tagId", onDelete: "CASCADE", onUpdate: "CASCADE", timestamps: true});

User.hasMany(Tag, {foreignKey: "userId"});
Tag.belongsTo(User, {foreignKey: "userId"});