
export interface ProductModel{
    Id: number,
    Name: string,
    BasePrice: number,
    SKU: string,
    MRP:number,
    Description: string,
    CategoryId: number,
    Category: {
      CategoryId: number,
      CategoryName: string,
      IsActive: boolean
    },
    Currency: number,
    ManufacturedDate: any,
    ExpireDate: any
}
export interface Category{
    CategoryName:string,
    CategoryId:number,
    IsActive:number
}
