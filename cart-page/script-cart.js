let cartitemslist=document.getElementsByClassName('cartitems-list')[0];

let cartelemsarr=JSON.parse(localStorage.getItem('cartelems'));

for(let i=0;i<cartelemsarr.length;i++)
{
    let currentobj=JSON.parse(cartelemsarr[i]);
    let div=document.createElement('div');
    div.innerHTML=JSON.parse(currentobj.elem);
    cartitemslist.append(div);
}
