const logger = require("../utils/loggers");
const { ContainerOrders } = require("../negocio/orders");
const environmentVars = require("../utils/environmentVar");
const containerOrders = new ContainerOrders();

const getAllOrdersSistem = async (req, res) => {
  try {
    logger.log("info", { route: req.originalUrl, method: req.route.methods });
    const ordesCatchs = await containerOrders.getAllOrders();
    console.log(ordesCatchs);
    switch (environmentVars.typeInRes) {
      case "resJson":
        res.status(202).json({
          ordesCatchs,
        });
        break;
      case "":
        res.status(202).render("pages/todasLasOrdenes", { allOrders: ordesCatchs });
        break;
    }
  } catch (err) {
    logger.log("error", `Error en orders Controller${err}`);
  }
};
const getOrderClient = async (req, res) => {
  try {
    const orderCatch = await containerOrders.ordersUser(req.user._id);
    switch (environmentVars.typeInRes) {
      case "resJson":
        res.status(201).json({
          orderCatch,
        });
        break;
      case "":
        res.status(202).render("pages/ordersClient", { ordersByStatus: orderCatch });
        break;
    }
  } catch (err) {
    logger.log("error", `Error en orders Controller${err}`);
  }
};

module.exports = { getAllOrdersSistem, getOrderClient };
