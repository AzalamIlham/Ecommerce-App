
export class Product{

    id : number=0 ;
    thumbnail: string = '';
    description: string = '';
    category :string ='';
    price: number = 0;
    stock :number =0;

    constructor(id : number ,thumbnail:string ,description: string ,category :string,price: number,stock:number){
        this.id =id ;
        this.thumbnail=thumbnail;
        this.description = description;
        this.category=category;
        this.price=price;
        this.stock=stock;
    }
  
}

