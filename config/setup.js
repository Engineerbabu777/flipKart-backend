import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import * as AdminJSMongoose from "@adminjs/mongoose";
import Transaction from "../models/transaction.js";
import { User } from "../models/user.js";
import { Category } from "../models/category.js";
import Order from "../models/order.js";
import { Product } from "../models/product.js";
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
  name: "Admin",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }

  return null;
};

export const buildAdminJS = async (app) => {
  const admin = new AdminJS({
    resources: [
      {
        resource: User,
      },
      {
        resource: Category,
      },
      {
        resource: Order,
      },
      {
        resource: Product,
      },
      {
        resource: Transaction,
      },
    ],
    branding: {
      companyName: "Kart",
      withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminJs",
      cookiePassword: "5678yhji76543wsdfgh77",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "5678yhji76543wsdfgh77",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
