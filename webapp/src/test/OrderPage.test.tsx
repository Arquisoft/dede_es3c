import { render, screen } from "@testing-library/react";
import LangState from "../lang";
import UserState from "../User";
import React from "react";
import OrdersPage from "../pages/OrdersPage";
import DisplayOrders from "../components/DisplayOrders";
import { Order, Product, ProductInOrder } from "../shared/shareddtypes";

test('check orders page text renders properly when the user has no orders', async () => {
  localStorage.setItem("currentUser", "user");
    render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <OrdersPage setUser={() => "user"}/>
        </LangState>
        </UserState>
      </React.StrictMode>,
   )
    const linkElement = screen.getByText(/My orders/i);
    const noOrders = screen.getByText(/Go Shopping/i);
    expect(linkElement).toBeInTheDocument();
    expect(noOrders).toBeInTheDocument();
});

test('check orders page text renders properly when the user has orders', async () => {
  localStorage.setItem("currentUser", "Wardell Stephen Curry II");
  const product: Product = {
    amount: 2,
    description: "test",
    name: "product-test",
    category: "test",
    price: 20,
    urlPhoto: "nan"
  }
  const productsOrder: ProductInOrder[] = [{id: "monitor", 
                                            product: product,
                                            quantity: 1}];
  const orders: Order[] = [{ id: "123",
                            price: 50,
                            priceIVA: 70,
                            products: productsOrder,
                            user: "chef@gmail.com" }];
    render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <DisplayOrders orders={orders}/>
        </LangState>
        </UserState>
      </React.StrictMode>,
   )
    const linkElement = screen.getByText(/123/i);
    const noOrders = screen.getByText(/product-test/i);
    expect(linkElement).toBeInTheDocument();
    expect(noOrders).toBeInTheDocument();
});