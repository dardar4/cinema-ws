# :tv: Cinema Rest API server :tv:

## Login Credentials
The server is accessible using the following site: [tv-shows-subscriptions site](https://dardar4-tv-shows-subscriptions.herokuapp.com/)

- user name: **guest**

- password: **guest2020**

Please feel free to login using the above credentials and play with the data!

Here is a link to the client (build in React) repository  [tv-shows-subscriptions](https://github.com/dardar4/tv-shows-subscriptions))


## Description 

**Rest API server** to handle all CRUD operations for a cinema DB. this includes

- Add, get, update and delete **shows** from DB

- Add, get, update and delete **members** (subscribers) from DB

- Add, get, update and delete **users** from DB

- Create and Login operations

- **MVC architecture using Express** (Router, Controllers and Dal layers)

- **MongoDB** and **Mongoose** (including Validators)

- **JWT Authentication** (TBD)


### External API

Members and shows were taken from the following APIs:

Members: https://jsonplaceholder.typicode.com/users

Shows: https://api.tvmaze.com/shows?page=0
