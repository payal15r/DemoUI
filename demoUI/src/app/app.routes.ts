import { Routes } from '@angular/router';
import { ProductlistComponent } from './Components/Product/productlist/productlist.component';
import { ProductaddComponent } from './Components/Product/productadd/productadd.component';
import { EditproductComponent } from './Components/Product/editproduct/editproduct.component';

export const routes: Routes = [
    {
        path:'',component:ProductlistComponent
    },
    {
        path:'',component:ProductlistComponent
    },{
        path:'add',component:ProductaddComponent
    }
    ,{
        path:'edit/:id',component:EditproductComponent
    }
];
