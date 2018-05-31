# Angular Shopping Cart

Simple Angular app with Shopping Cart functionality done with Angular and AngularCLI.

Simple Json Server is providing the data with simple RESTapi. Also all purchases are saved in server/data.json file as "purchase".

Angular and JsonServer is running at the same time thanks to Concurrently (execute multiple nodes commands at the same time and run them as separate processes). 


## Task

Task is to create a shopping cart.

Display the following information:
* List of items
  - Image
  - Label
  - Reference
  - Cost
* Description of item
  - Image
  - Label
  - Reference
  - Cost
  - Brand
  - Model
  - Description
  - Items available
- Cart (list of items selected)
  - Items selected
    - Image
    - Label
    - Cost
    - Quantity of item
  - Total cost
  - Total items

Create the following pages:
* `/items`
* `/items/:ref`
* `/checkout`

Implement the following functionality:
* View a list of items
* View full description of individual item
* Add item to cart
* Remove item from cart
* Increase/Decrease quantity of item in the cart
* Display total cost & total number of items
* Delete All items
* Purchase items / Checkout

## Environment Setup

### Install global packages

> Install [Node](https://nodejs.org/en/download/)


> Install [Angular CLI](https://cli.angular.io/) as global package
>
> `npm install -g @angular/cli`


> Install local packages
>
> `npm install`

---

### Start Development

> Run Local Server
`npm start`

---

## API

Get and send all information via the below API endpoints.

> ###### Base API url
> ```
> http://localhost:3001/api
> ```

> List of items
> ```
> GET /items
> ```

> Description of item
> ```
> GET /items/[:ref]
> ```

> Purchase list of items
> ```
> POST /purchase
> ```

> Resquest parameters
> ```
> {
>  total_cost: 10,
>  total_items: 3,
>  items_ref: [10001,10003,10003]
> }
> ```

---