import { PurchaseDto } from '@/dtos/transaction.dto';
import { Item } from '@/entities/item.entity';
import { Transaction } from '@/entities/transaction.entity';
import { Tree } from '@/entities/tree.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import { Status } from '@/utils/constants';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    async myCart(user: IUser) {
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

            return cartExist;
        }
        return cartExist;
    }

    async addToCart(user: IUser, treeId: number) {
        let cartExist = await Transaction.findOne({
            where: {
                userId: user.id,
                status: Status.CART,
            },
        });

        const tree = await Tree.findByPk(treeId);
        if (!tree) {
            throw new ExceptionWithMessage(errors.RECORD_NOT_FOUND, 404);
        }

        if (!cartExist) {
            cartExist = await Transaction.create({
                userId: user.id,
                status: Status.CART,
            });

            if (tree.inStock < 1) {
                throw new ExceptionWithMessage(errors.NOT_ENOUGH, 400);
            }

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

        if (tree.inStock < inCart.quantity + 1) {
            throw new ExceptionWithMessage(errors.NOT_ENOUGH, 400);
        }

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

    async purchase(user: IUser, body: PurchaseDto) {
        const cart = await Transaction.findOne({
            where: {
                userId: user.id,
                status: Status.CART,
            },
        });

        if (!cart) {
            throw new ExceptionWithMessage(errors.NOTHING_IN_CART, 400);
        }

        cart.status = Status.PENDING;
        cart.address = body.address;
        cart.price = 0;
        await cart.save();

        const items = await Item.findAll({
            where: {
                transactionId: cart.id,
            },
        });

        for (const iterator of items) {
            const tree = await Tree.findByPk(iterator.treeId);

            tree.inStock = tree.inStock - iterator.quantity;
            cart.price += tree.price * iterator.quantity;
            await tree.save();
        }

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

    async list(options: Options) {
        const list = await Transaction.findAndCountAll({
            ...options,
            include: [{ model: User }, { model: Tree }],
        });

        return list;
    }

    async detail(id: number) {
        const detail = await Transaction.findByPk(id, {
            include: [{ model: User }, { model: Tree }],
        });

        return detail;
    }
}
