import sequelize from "./connection";

const connectDB = async () => {
  return sequelize.authenticate().then(async () => {
    await sequelize
      // .sync({ alter: true }) // for automatic migrate
      .sync()
      .then(() => {
        console.log("Database synchronized successfully.");
        console.log("DB connected successfully!");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  });
};

export default connectDB;
