import { PurchaseDto } from '@/dtos/transaction.dto';
import { Item } from '@/entities/item.entity';
import { Transaction } from '@/entities/transaction.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { IUser } from '@/interfaces/users.interface';
import { Status } from '@/utils/constants';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    async addToCart(user: IUser, treeId: number) {
        let cartExist = await Transaction.findOne({
            where: {
                userId: user.id,
                status: Status.CART,
            },
        });

        if (!cartExist) {
            cartExist = await Transaction.create({
                userId: user.id,
                status: Status.CART,
            });

            const item = new Item();
            item.transactionId = cartExist.id;
            item.quantity = 1;
            item.treeId = treeId;

            await item.save();

            return cartExist;
        }

        const inCart = await Item.findOne({
            where: {
                transactionId: cartExist.id,
                treeId: treeId,
            },
        });

        if (inCart) {
            await Item.update(
                {
                    quantity: inCart.quantity + 1,
                },
                {
                    where: {
                        id: inCart.id,
                    },
                },
            );
            return cartExist;
        }

        const item = new Item();
        item.transactionId = cartExist.id;
        item.quantity = 1;
        item.treeId = treeId;

        await item.save();

        return cartExist;
    }

    async removeFromCart(user: IUser, treeId: number) {
        const cartExist = await Transaction.findOne({
            where: {
                userId: user.id,
                status: Status.CART,
            },
        });

        if (!cartExist) {
            throw new ExceptionWithMessage(errors.NOTHING_IN_CART, 400);
        }

        const inCart = await Item.findOne({
            where: {
                transactionId: cartExist.id,
                treeId: treeId,
            },
        });

        if (inCart.quantity > 1) {
            await Item.update(
                {
                    quantity: inCart.quantity - 1,
                },
                {
                    where: {
                        id: inCart.id,
                    },
                },
            );
            return cartExist;
        }

        await Item.destroy({
            where: {
                treeId: treeId,
                transactionId: cartExist.id,
            },
        });

        return cartExist;
    }

    async purchase(user: IUser, cartId: number, body: PurchaseDto) {
        const cart = await Transaction.findOne({
            where: {
                userId: user.id,
                id: cartId,
            },
        });

        if (!cart) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }

        cart.status = Status.PENDING;
        cart.address = body.address;
        await cart.save();

        return cart;
    }

    async comfirmDelivering(cartId: number) {
        const cart = await Transaction.findOne({
            where: {
                id: cartId,
            },
        });

        if (!cart) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }

        cart.status = Status.DELIVERING;
        await cart.save();

        return cart;
    }

    async comfirmDone(cartId: number) {
        const cart = await Transaction.findOne({
            where: {
                id: cartId,
            },
        });

        if (!cart) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }

        cart.status = Status.DONE;
        await cart.save();

        return cart;
    }
}
