<h1 align="center">
  kenzie-kars-api
</h1>

<p align="center">
 The Kenzie Kars API is the backend for the Kenzie Kars application. It has been developed using Node.js, Express, TypeORM, and PostgreSQL. This API provides a set of endpoints that allow you to perform various operations related to the Kenzie Kars application.
</p>

<hr>

<h2 id="top">Table of Contents</h2>

<ol>
  <li><a href="#1-overview">Overview</a></li>
  <li><a href="#2-er-diagram">ER Diagram</a></li>
  <li><a href="#3-quick-start">Quick Start</a>
    <ol>
      <li><a href="#31-installing-dependencies">Installing Dependencies</a></li>
      <li><a href="#32-environment-variables">Environment Variables</a></li>
      <li><a href="#33-migrations">Migrations</a></li>
      <li><a href="#34-running-the-api">Running the API</a></li>
      <li><a href="#35-seeding-and-mocking-database">Seeding and Mocking Database</a></li>
    </ol>
  </li>
  <li><a href="#4-api-documentation">API Documentation</a></li>
  <li><a href="#5-database-schema">Database Schema</a></li>
</ol>

<hr>

<h2 id="1-overview">Overview</h2>

<p>
  The project was developed entirely in TypeScript, using Node.js as the runtime environment, and Express as the chosen framework. Data serialization for requests was handled using the Zod library, while the PostgreSQL relational database was used for data storage, managed by TypeORM.
</p>

<p>
  Here are the links for more information about the technologies used:
</p>

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  <li><a href="https://typeorm.io/">TypeORM</a></li>
  <li><a href="https://zod.dev/">Zod</a></li>
</ul>

<hr>

<h2 id="2-er-diagram">ER Diagram</h2>

<p>
  ER diagram of the API defining the relationships between database tables.
</p>

<p align="center">
  <img src="./DER-kenzie-kars-conceitual.png" alt="Project diagram with its relationships" title="kenzie-kars-diagram">
</p>

<hr>

<h2 id="3-quick-start">Quick Start</h2>

<p><a href="#top">Back to Top</a></p>

<h3 id="31-installing-dependencies">3.1. Installing Dependencies</h3>

<p>
  Before proceeding, ensure that <strong>PostgreSQL</strong> and <strong>Node.js</strong> are installed on your machine.
</p>

<p>
  Clone the project to your machine and install the dependencies using the command:
</p>

<pre><code>yarn
</code></pre>

<p>
  Using npm:
</p>

<pre><code>npm install
</code></pre>

<h3 id="32-environment-variables">3.2. Environment Variables</h3>

<p>
  Next, create a <strong>.env</strong> file by copying the format from the <strong>.env.example</strong> file:
</p>

<pre><code>cp .env.example .env</code></pre>

<p>
  Configure your environment variables with your Postgres credentials.
</p>

<h3 id="33-migrations">3.3. Migrations</h3>

<p>
  Run the migrations using the command:
</p>

<pre><code>yarn typeorm migration:run -- -d ./src/data-source
</code></pre>

<p>
  Using npm:
</p>

<pre><code>npm run typeorm migration:run -- -d ./src/data-source
</code></pre>

<h3 id="34-running-the-api">3.4. Running the API</h3>

<p>
  To run the API locally, use the command:
</p>

<pre><code>yarn dev
</code></pre>

<p>
  Using npm:
</p>

<pre><code>npm run dev
</code></pre>

<p>
  Below are the commands for building the project:
</p>

<pre><code>yarn build
yarn typeorm migration:run -d dist/data-source
yarn start
</code></pre>

<p>
  Using npm:
</p>

<pre><code>npm run build
npm run typeorm migration:run -d dist/data-source
npm run start
</code></pre>

<h3 id="35-seeding-and-mocking-database">3.5. Seeding and Mocking Database</h3>

<p>
  To populate the database with seed data for testing purposes, run the following command:
</p>

<pre><code>yarn seed
</code></pre>

<p>
  Using npm:
</p>

<pre><code>npm run seed
</code></pre>

<p>
  This will insert predefined seed data into your database, ideal for testing.
</p>

<hr>

<h2 id="4-api-documentation">API Documentation</h2>

<p><a href="#top">Back to Top</a></p>

<p>
  You can access the API documentation created with Swagger using the endpoint <strong>/api-docs/</strong>. This documentation describes the resources that the API possesses, such as endpoints, request examples, response examples, and authentication methods.
</p>

<p>
  To import the workspace into Insomnia:
</p>

<a href="https://insomnia.rest/run/?label=&uri=https://gist.githubusercontent.com/eduschwert/cf5a1e2009bcb8ba8489b9eb2bb92ca1/raw/d118a72b1ffdf615e016576cdb314eb34497badb/kenzie-kars-workspace" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<hr>

<h2 id="5-database-schema">Database Schema</h2>

<p><a href="#top">Back to Top</a></p>

<h3>Index</h3>

<ul>
  <li><a href="#1-users">Users</a></li>
  <li><a href="#2-addresses">Addresses</a></li>
  <li><a href="#3-vehicles">Vehicles</a></li>
  <li><a href="#4-images">Images</a></li>
  <li><a href="#5-comments">Comments</a></li>
</ul>

<h3 id="1-users">1. Users</h3>

<p>The "User" object is defined as follows:</p>

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Unique identifier for the user</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>The name of the user</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>The email address of the user</td>
    </tr>
    <tr>
      <td>password</td>
      <td>string</td>
      <td>The user's access password</td>
    </tr>
    <tr>
      <td>cpf</td>
      <td>string</td>
      <td>The CPF of the user</td>
    </tr>
    <tr>
      <td>phone</td>
      <td>string</td>
      <td>The phone number of the user</td>
    </tr>
    <tr>
      <td>birthdate</td>
      <td>date</td>
      <td>The birthdate of the user</td>
    </tr>
    <tr>
      <td>description</td>
      <td>string</td>
      <td>The description of the user (optional)</td>
    </tr>
    <tr>
      <td>isSeller</td>
      <td>boolean</td>
      <td>Specifies if the user is a seller</td>
    </tr>
    <tr>
      <td>tokenResetPassword</td>
      <td>string</td>
      <td>A token used for resetting the user's password (optional)</td>
    </tr>
    <tr>
      <td>tokenResetPasswordExpiresAt</td>
      <td>date</td>
      <td>The expiration date and time for the password reset token (optional)</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>date</td>
      <td>The registration date of the user</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>date</td>
      <td>The date of the user's last update</td>
    </tr>
    <tr>
      <td>address</td>
      <td>Address</td>
      <td>The address of the user</td>
    </tr>
  </tbody>
</table>

<h3 id="2-addresses">2. Addresses</h3>

<p>The "Address" object is defined as follows:</p>

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Unique identifier for the address</td>
    </tr>
    <tr>
      <td>cep</td>
      <td>string</td>
      <td>The ZIP code of the address</td>
    </tr>
    <tr>
      <td>state</td>
      <td>string</td>
      <td>The state of the address</td>
    </tr>
    <tr>
      <td>city</td>
      <td>string</td>
      <td>The city of the address</td>
    </tr>
    <tr>
      <td>street</td>
      <td>string</td>
      <td>The street of the address</td>
    </tr>
     <tr>
      <td>number</td>
      <td>string</td>
      <td>The street number of the address</td>
    </tr>
    <tr>
      <td>complement</td>
      <td>string</td>
      <td>The complement of the address (optional)</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>date</td>
      <td>The registration date of the address</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>date</td>
      <td>The date of the address's last update</td>
    </tr>
  </tbody>
</table>

<h3 id="3-vehicles">3. Vehicles</h3>

<p>The "Vehicle" object is defined as follows:</p>

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Unique identifier of the vehicle</td>
    </tr>
    <tr>
      <td>brand</td>
      <td>string</td>
      <td>The brand of the vehicle</td>
    </tr>
    <tr>
      <td>model</td>
      <td>string</td>
      <td>The model of the vehicle</td>
    </tr>
    <tr>
      <td>year</td>
      <td>string</td>
      <td>The manufacturing year of the vehicle</td>
    </tr>
    <tr>
    <tr>
      <td>fuel</td>
      <td>integer</td>
      <td>The fuel type of the vehicle. It can be one of the following options:</td>
    </tr>
    <tr>
    <td colspan="3">
      <ul>
        <li>1: Flex</li>
        <li>2: Híbrido</li>
        <li>3: Elétrico</li>
      </ul>
    </td>
    </tr>
    <tr>
      <td>mileage</td>
      <td>integer</td>
      <td>The mileage of the vehicle</td>
    </tr>
    <tr>
      <td>color</td>
      <td>string</td>
      <td>The color of the vehicle. Allowed values are: "Branco", "Preto", "Cinza", "Prata", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja", "Roxo", "Marrom".</td>
    </tr>
    <tr>
      <td>fipePrice</td>
      <td>integer</td>
      <td>The FIPE price of the vehicle. It represents the market value of the vehicle</td>
    </tr>
    <tr>
      <td>price</td>
      <td>integer</td>
      <td>The price of the vehicle</td>
    </tr>
    <tr>
      <td>description</td>
      <td>string</td>
      <td>The description of the vehicle (optional)</td>
    </tr>
    <tr>
      <td>coverImage</td>
      <td>string</td>
      <td>The cover image of the vehicle</td>
    </tr>
    <tr>
      <td>isActive</td>
      <td>boolean</td>
      <td>Specifies whether the vehicle is active and visible to other users</td>
    </tr>
    <tr>
      <td>isGoodBuy</td>
      <td>boolean</td>
      <td>Specifies whether the price of the vehicle is 5% below the FIPE price</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>date</td>
      <td>The registration date of the vehicle</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>date</td>
      <td>The date of the vehicle's last update</td>
    </tr>
    <tr>
      <td>images</td>
      <td>Images</td>
      <td>The images of the vehicle (optional)</td>
    </tr>
  </tbody>
</table>

<h3 id="4-images">4. Images</h3>

<p>The "Image" object is defined as follows:</p>

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Unique identifier of the image</td>
    </tr>
    <tr>
      <td>imageUrl</td>
      <td>string</td>
      <td>The URL of the image</td>
    </tr>
    <tr>
      <td>imageNumber</td>
      <td>number</td>
      <td>The order number of the image</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>date</td>
      <td>The registration date of the image</td>
    </tr>
  </tbody>
</table>

<h3 id="5-comments">5. Comments</h3>

<p>The "Comment" object is defined as follows:</p>

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Unique identifier of the comment</td>
    </tr>
    <tr>
      <td>content</td>
      <td>string</td>
      <td>The content of the comment</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>date</td>
      <td>The registration date of the comment</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>date</td>
      <td>The date of the comment's last update</td>
    </tr>
  </tbody>
</table>

<h2>Author</h2>

<br/>

<p>Eduardo Schwert de Freitas</p>
<img style="border-radius: 50%" width="50" src="https://avatars.githubusercontent.com/u/106620111?s=400&u=d29e7cd5bdcadc0a09721f69115d267054018be7&v=4"/>
<a href="https://www.linkedin.com/in/eduardoschwert/"><img src="https://img.shields.io/badge/-Eduardo-%230A66C2?logo=linkedin"/></a>
<a href="mailto:eduardoschwert@yahoo.com.br"><img src="https://img.shields.io/badge/-eduardoschwert%40yahoo.com.br-%236001D2?logo=yahoo" alt="eduardoschwert@yahoo.com.br"/></a>
