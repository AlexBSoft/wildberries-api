import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { WBPrivateAPI, Constants, WBProduct } from "wb-private-api";

const destination = Constants.DESTINATIONS.MOSCOW;
const wbapi = new WBPrivateAPI({ destination });

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello parser").
  get('/feedbacks/:id', async ({ params: { id } }) => {
    const product = await WBProduct.create(Number(id));
    const feedbacks = await product.getFeedbacks();
    return feedbacks;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
