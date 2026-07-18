import { Order } from "../types";

export const orderAgain = (

  order: Order

) => {

  localStorage.setItem(

    "cart",

    JSON.stringify(

      order.items

    )

  );

  window.location.href = "/cart";

};