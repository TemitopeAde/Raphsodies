import { NextResponse } from 'next/server';
import Joi from 'joi';
import { createProduct } from "@/actions/addProducts";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.string().uri().optional(),
  label: Joi.string().optional(),
  otherDetails: Joi.object().optional(),
  categoryName: Joi.string().optional().allow("").empty(""),
  attributes: Joi.array().optional(),
  priceDollar: Joi.number().positive().required()
});


export async function POST(request) {
  try {
    const parsedBody = await request.json();

    const { error } = productSchema.validate(parsedBody);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const { name, description, price, stock, imageUrl, label, otherDetails, categoryName, attributes, priceDollar } = parsedBody;

    const newProduct = await createProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      imageUrl,
      label,
      otherDetails,
      categoryName,
      attributes, 
      priceDollar
    });

    return NextResponse.json(
      { message: 'Product added successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
