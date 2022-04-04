import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';
import { Order } from '../entities/Order';
import { OrderService } from '../services/Order_Service';
import { ProductService } from '../services/Product_Service';
import { DistributionCenterService } from '../services/DistributionCenter_Service';
import axios from 'axios'

export class OrderController {

    /**
     * Get all orders
     * @param req Request
     * @param res Response
     * @returns All orders with status 200 or error 500
     */
    public async getOrders(req: Request, res: Response) {
        try {
            res.status(200).json(await OrderService.getOrders(req.app));
        } catch (error) {
            res.status(500).json({ error: "Error on get all Orders" });
        }
    }

    /**
     * Get all orders
     * @param req Request
     * @param res Response
     * @returns All orders with status 200 or error 500
     */
     public async getOrdersByUserEmail(req: Request, res: Response) {
        try {
            res.status(200).json(await OrderService.getOrdersByUserEmail(req.app, String(req.params.email)));
        } catch (error) {
            res.status(500).json({ error: "Error on get all Orders" });
        }
    }

    /**
     * Get order by id
     * @param req Request
     * @param res Response
     * @returns Order with status 200 or error 500
     */
    public async getOrderById(req: Request, res: Response) {
        try {
            const user = await OrderService.getOrderById(req.app, String(req.params.id));
            user ? res.status(200).json(user) : res.status(404).json({ error: "Order not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on get Order by id" })
        }
    }
    /**
     * Update order
     * @param req Request
     * @param res Response
     * @returns Order with status 200 or error 500
     */
    public async updateOrder(req: Request, res: Response) {
        try {
            let orderServiceBody = new Order(req.body.user,req.body.products);
            const order = await OrderService.updateOrder(req.app, String(req.params.id), orderServiceBody);
            order ? res.status(200).json(order.raw) : res.status(404).json({ error: "Order not found" });
        } catch (error) {
            res.status(500).json({ error: "Error on update Order: " + error })
        }
    }

    /**
     * Delete order
     * @param req Request
     * @param res Response
     * @returns Order with status 200 or error 500
     */
    public async deleteOrder(req: Request, res: Response) {
        try {
            const order: DeleteResult = await OrderService.deleteOrder(req.app, String(req.params.id));
            order ? res.status(200).json(order.raw) : res.status(404).json({ error: "Order not found" });
        } catch (error) {
            res.status(500).json({ delete: false, error: "Error on delete Order: " + error})
        }
    }

    /**
     * Create order
     * @param req Request
     * @param res Response
     * @returns Order with status 200 or error 500
     */
    public async addOrder(req: Request, res: Response) {
        try {
            let orderBody = new Order(req.body.user,req.body.products);
            var price = 0.0;
            for (var p of orderBody.products) {
                ProductService.decrementProductStock(req.app, p.product.id, p.quantity);
                price+=p.product.price*p.quantity;
            }
            
            //var source = "Calle Valdes Salas, 11, 33007 Oviedo, Asturias";
            var source;
            var destination = "AvenidadelaConstitucion,10,Gijon"; //TODO: get address from user pod
            const distributioncenters = await DistributionCenterService.getDistributionCenters(req.app);
            var addressNearbyDS;
            var distanceToNearbyDS = 0;
            var url;
            var response;
            var d;
            for (var distributioncenter of distributioncenters) {
                source = distributioncenter.address;
                url = 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations='+destination+'&origins='+source+'&key=AIzaSyANy46m-FN8Sa9aSpIiLpSWx3xl7M2oX3s'
                response = await axios.get(url)
                d = response.data.rows[0].elements[0].distance.value;
                if (d<distanceToNearbyDS){
                    distanceToNearbyDS = d
                    addressNearbyDS = distributioncenter
                }
            }
            //TODO: Falta comprobación si hay productos en ese centro
            price+=calculateShippingPrice(distanceToNearbyDS);
            orderBody.price = price;
            orderBody.priceBeforeIVA = price/1.21;

            const order = await OrderService.addOrder(req.app, orderBody);
            order ? res.status(200).json(order) : res.status(500).json({ error: "Error add Order" });
        } catch (error) {
            res.status(500).json({ error: "Error add Order: " + error})
        }
    }

}

function calculateShippingPrice(distance:number):number {
    var shippingPrice = 0;
    if (distance < 20000) {
        shippingPrice = 1;
    } else if (distance < 50000) {
        shippingPrice = 3;
    } else if (distance < 100000) {
        shippingPrice = 5;
    } else if (distance >= 100000) {
        shippingPrice = 10;
    }

    return shippingPrice;
}