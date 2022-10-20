<script>
const apiUrl = 'https://ebluemarket.herokuapp.com';


async function fetchProducts() {
      try{
      const response = await fetch(`${apiUrl}/products/`);
      if(!response.ok){
          throw new Error(`Failed to fetch:${response.status}`)
      }
      const products = response.json();
      console.log('products:',products);
      return await response.json();
  }catch(e){
      console.log(e);
  }

  let request = new XMLHttpRequest()
  request.open("GET", (`${apiUrl}/products/`));
  request.send(); request.onload = () => {
    if (request.status === 200) {
      console.log(JSON.parse(request.response))
      document.getElementById("containerId").innerHTML= request.response;
    }
  }
}

function listsProducts(contId) {
  contId = document.getElementById(contId);
  if (!contId) {
    return;
  } fetchProducts().then(products => {

    if (!products) {
      contId.innerHTML = 'No products';
      return;
    }
    for (const product of products) {
      contId.appendChild(productElement(products));
    }

  }).catch(e => {
    console.log(e);
  })
}

function productElement(products) {
  const anchorElement = document.createElement('a');
  anchorElement.setAttribute('href', `${apiUrl}/product/${product.id}`);
  anchorElement.setAttribute('target', '_blank');
  anchorElement.innerText = product.name;

  const productName = document.createAttribute('h3');
  productName.appendChild(anchorElement);
  return productName;
}
</script>