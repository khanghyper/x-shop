export default interface Product {
  name: string, 
  price: number, 
  _id: string, 
  images: {
    url: string,
    publicId: string,
    _id: string
  }[],
  description: string,
  promotion: number,
  isActive:boolean,
  categoryId: any,
  instock: number
}

export class ProductModel {
  static findById = async (id:string) => {
    return await fetch(`http://localhost:3000/products/${id}`).then(res => res.json())
  }
}
