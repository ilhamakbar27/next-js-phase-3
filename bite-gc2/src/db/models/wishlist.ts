import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type WishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date,
  updatedAt: Date
};

export type WishlistModelCreate = Omit<WishlistModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_WISHLIST = "wishlist";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getWishlists = async () => {
  const db = await getDb();
  const agg = [
    {
      '$lookup': {
        'from': 'products', 
        'localField': 'productId', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }
  ];
  const wishlists = (await db
    .collection(COLLECTION_WISHLIST).aggregate(agg)
    .toArray()) as WishlistModel[];

  return wishlists;
};

export const createWishlist = async (wishlist: WishlistModelCreate) => {
  const modifiedWishlist: WishlistModelCreate = {
    ...wishlist,
  };

  const db = await getDb();
  const result = await db
    .collection(COLLECTION_WISHLIST)
    .insertOne(modifiedWishlist);

  return result;
};
