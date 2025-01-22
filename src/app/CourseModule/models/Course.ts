export class Course{
    id:number;
    name:string;
    description:string;
    category:string;
    published:Date
    level:string;


   
   constructor(id: number,name: string,description:string,
    category:string,
    published:Date,
    level:string

    ){
    this.id=id;
    this.name=name;
    this.description=description;
    this.category=category
    this.published=published
    this.level=level
   }

}