import { Application, Router } from 'express';
import discountController from './discount.controller';
import { } from '@core/middleware';

const discountRouter = (app: Application) => {
    const path = 'discounts';

    app.post(`/${path}/create-discount`,

        discountController.createDiscountController
    );

    app.delete(`/${path}/:id`,

        discountController.deleteDiscountController
    );

    app.get(`/${path}/with-products`,

        discountController.getAllDiscountCodesWithProductsController
    );

    app.get(`/${path}`,

        discountController.getAllDiscountController
    );

    app.post(`/${path}/apply`,

        discountController.getDiscountAmountController
    );
};

export default discountRouter;
