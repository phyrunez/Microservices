# Ticketing

A multi-service application. Details are listed below:

- Deploy a multi-service app to the Google Cloud with Docker and Kubernetes
- Build a Server-Side-Rendered React app using Hooks and Next.js
- Solve concurrency issues in a distributed systems environment
- Share reusable code between multiple Express servers using custom NPM packages
- Write comprehensive tests to ensure each service works as designed
- Communicate data between services using a lightning-fast event bus
- Limit access to APIs using JWT-based authentication

## Services

**auth**: everything related to user signup/signin/signout

**tickets**: ticket creation/editing/showing, knows whether a ticket can be updated

- listeners:
  - order-cancelled-listener
  - order-created-listener
- publishers
  - ticket-created-publisher
  - ticket-updated-publisher

**orders**: order creation/editing/showing

- listeners:
  - expiration-complete-listener
  - payment-created-listener
  - ticket-created-listener
  - ticket-updated-listener
- publishers
  - order-cancelled-publisher
  - order-created-publisher

**expiration**: watches for orders to be created, cancels them after 15 minutes

- listeners:
  - order-created-listener
- publishers
  - expiration-complete-publisher

**payments**: handles credit card payments, cancels orders if payments fails, completes if payment succeeds.

- listeners:
  - order-cancelled-listener
  - order-created-listener
- publishers
  - payment-created-publisher

## Architecture:

> 
> <p align="center">
>   <img src="https://github.com/victorchennn/Microservices/blob/master/ticketing/diagram.png" width="700" height="350">
> </p>
