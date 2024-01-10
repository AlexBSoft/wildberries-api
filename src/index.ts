import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { WBPrivateAPI, Constants, WBProduct } from "wb-private-api";

const destination = Constants.DESTINATIONS.MOSCOW;
const wbapi = new WBPrivateAPI({ destination });

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/", () => "Hello parser")
  .get('/product/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    return product;
  })
  .get('/stocks/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    const stocks = await product.getStocks();
    return stocks;
  })
  .get('/promo/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    const promos = await product.getPromo();
    return promos;
  })
  .get('/questions/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    const questions = await product.getQuestions();
    return questions;
  })
  .get('/feedbacks/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    const feedbacks = await product.getFeedbacks();
    return feedbacks;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
