import app from "./controller/app";

import { productRouter } from "./controller/routes/productRouter";

app.use("/products", productRouter);