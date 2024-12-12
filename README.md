# COMSW4156 Project - GroupGrubUI

This is the GitHub repository for the UI portion of the Project associated with COMS 4156 Advanced Software Engineering. It also includes the link to the backend (service) repositories. The GroupGrub Service enables seamless group order 
management for food providers. The GroupGrub Client Application is designed to help event organizes place group food orders more efficiently, saving time and reducing operational burdens. It is a great application for large organizations to make orders on behalf of a group of people. For example, homeless shelters, disaster relief groups, and more.

## Our team: ByteBuilders 
- Zhengwen Fu, UNI: zf2314 
- Marian Abuhazi, UNI: ma4107
- Beijia Zhang, UNI: bz2527 
- Chunyu Sui, UNI: cs4480

## Repositories
### Backend service 
The backend provides a RESTful API for managing group orders and supports persistent data storage. 
The repository can be 
found here: https://github.com/capsfly556/ase-4156project.

### Frontend client
The frontend is a React-based web application that interacts with the backend to provide a user-friendly 
interface for the target audience. It supports user authentication, allowing users to make individual orders as part of their order group. 
The repository for the React interface can be found here: https://github.com/Foo2000/GroupGrubUI.

## Prerequisites

In order to build and use this frontend UI, you must install the following:

1. Node.js (v22.11.0): Download and follow the [installation instructions](https://nodejs.org/en).
2. npm (Included with Node.js): The project relies on npm to manage dependencies. Ensure [npm is installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) and available in your system PATH.
3. IntelliJ IDE: We recommend using IntelliJ but you are free to use any other IDE that you are comfortable with for React development. Download and follow the [installation instructions](https://www.jetbrains.com/idea/download/?section=mac).

## Running a local instance of GroupGrubUI

### Local development
First, you must ensure that the backend service is running. 
Follow the backend repository's README to set it up. Then, you may proceed with the next steps.

1. Clone the repository:
   Open your terminal and run:`git clone https://github.com/Foo2000/GroupGrubUI`
2. `cd` to the repository folder in your terminal.
3. Install dependencies by running: <code>npm install</code>
4. Start the development server by running: <code>npm start</code>. Note: the start script in the package.json includes HTTPS=true to enable secure connections during local development.

5. Access the app in your browser at https://localhost:3000. 

### Cloud deployment
1. Before deploying the application to the cloud modify the start script in package.json to remove HTTPS=true.
2. Deploy the application using the following command: <code>gcloud run deploy groupgrub-ui</code>

## Routes
The **GroupGrub Frontend UI** uses a React Router for client-side navigation. Below is an explanation of the routes 
used in the application:

### Homepage
* **Component:** `<Homepage />`
* **Description:** This is the landing page for the application, where users can view basic information, navigate to other parts of the app and log in. 
* **Access:** Public (no authentication required).

### Participant dashboard
* **Component:**  `<Participant />` (wrapped in `<ProtectedRoute />`)
* **Description:** Displays a participant-specific dashboard. Participants can view their order history. After you logged in, you will be directed to this page.
* **Access:** Protected (authentication required).

###  Groups overview
* **Component:**  `<Groups />` (wrapped in `<ProtectedRoute />`)
* **Description:** Shows a list of all groups. The participant can view the details of each group.
* **Access:** Protected (authentication required).

### Group details
* **Component:**  `<Group />` (wrapped in `<ProtectedRoute />`)
* **Props Passed:**
  - `setSessionGroupId`: Updates the group session ID.
  - `setSessionGroupOrderId`: Updates the session order ID for the group.
  - `setOrderFoodProviderId`: Sets the food provider for group orders.
* **Description:**  Displays details of a specific group, allowing participants to join the specific group and start the group order. 
* **Access:** Protected (authentication required).

###  FoodProviders overview
* **Component:**  `<FoodProviders />`
* **Description:** Displays a list of food providers.
* **Access:** Public (no authentication required).

###  FoodProvider details
* **Component:**  `<FoodProvider />` (wrapped in `<ProtectedRoute />`)
* **Props Passed:**
   - `sessionGroupId`: The currently selected group ID.
   - `sessionGroupOrderId`: The currently selected group order ID.
* **Description:**  Displays details for a specific food provider like menu and allows participants to order items for their group.
* **Access:** Protected (authentication required).

###  Page not found
* **Component:** `<PageNotFound />` (wrapped in `<ProtectedRoute />`)
* **Description:**  A fallback route that handles undefined or invalid paths, displaying a "Page Not Found" text.
* **Access:** Protected (authentication required).

## What our client app aoes
The GroupGrub Frontend UI connects to the backend service and simplifies the use of the service by providing an easy-to-use interface. 

The client application does the following:
1. Simplifies group food order creation by enabling participants to join the group and manage group orders. 
2. Streamlines order management for participants and groups, making it easier to place and view orders.
3. Facilitates collaboration by allowing participants to join specific groups and start ordering from that group.
4. Faster communication with the backend service to retrieve real-time updates on groups and orders.
5. Improves Accessibility by providing a responsive, accessible interface for all participants.
6. Prevents Unauthorized Actions by only allowing authenticated participants to start group orders. 

## User interface design
Prior to implementing our UI in React, we created a [mockup](https://www.figma.com/design/gNpO7eEBUzSFU3JQrBEauj/GroupGrub?node-id=0-1&node-type=canvas&t=pVqZHb7Qz2tXbJYC-0) using Figma. It helped our team separate implementation tasks, and more-easily collaborate on the design together. It alsoensured that the visual design aligned with functionality and usability requirements. 

## Live site
You will be able to access our site online for a limited time. [GroupGrub UI](https://groupgrub-ui-626742743841.us-east1.run.app/)'s live site.
Meanwhile, the service is live here: [GroupGrub Service](https://35.185.18.94:8081/swagger-ui/index.html)