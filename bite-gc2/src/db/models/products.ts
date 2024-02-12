import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type ProductsModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  price: number;
  tag: [string];
  thumbnail: string;
  images: [string];
};

export type ProductModelCreateInput = Omit<ProductsModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_PRODUCTS = "products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getProducts = async (
  search?: string,
  page: number = 1
): Promise<ProductsModel[]> => {
  if (!search) {
    search = "";
  }
  const db = await getDb();
  const itemLimit = 8;
  const pageNumber = page || 1;

  const products = (await db
    .collection(COLLECTION_PRODUCTS)
    .find({ name: { $regex: `.*${search}.*`, $options: "i" } })
    .limit(8*page)
    .toArray()) as ProductsModel[];

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();
  const product = (await db
    .collection(COLLECTION_PRODUCTS)
    .findOne({ slug: slug })) as ProductsModel;
  return product;
};
