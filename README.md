# COMSW4156 Project - GroupGrubUI

This is the GitHub repository for the UI portion of the Project associated with COMS 4156 Advanced Software Engineering. It also includes the link to the backend (service) repositories. The GroupGrub Service enables seamless group order 
management for food providers. The GroupGrub Client Application is designed to help organizing and placing group food 
orders more efficiently, saving time and reducing operational burdens.
Our team ByteBuilders (Name: Zhengwen Fu, UNI: zf2314 | Name: Marian Abuhazi, UNI: ma4107 | Name: Beijia Zhang, UNI: bz2527 
| Name: Chunyu Sui, UNI: cs4480) contributed to all the requirements individually.

## Repositories
1. Backend service: The backend provides a RESTful API for managing group orders and supports persistent data storage.
   https://github.com/capsfly556/ase-4156project
2. Frontend client: The frontend is a React-based web application that interacts with the backend to provide a user-friendly 
interface for the target audience.
   https://github.com/Foo2000/GroupGrubUI

## Viewing the GroupGrubUI Repository
Please use the following link to view the repository relevant to the service: https://github.com/Foo2000/GroupGrubUI

## Building and Running a Local Instance

In order to build and use this frontend UI, you must install the following:

1. Node.js (v22.11.0): https://nodejs.org/en Download and follow the installation instructions
2. npm (Included with Node.js): The project relies on npm to manage dependencies. Ensure npm is installed and available in your system PATH.
3. IntelliJ IDE: We recommend using IntelliJ but you are free to use any other IDE that you are comfortable with for React development:
https://www.jetbrains.com/idea/download/?section=mac

## Steps to Run:

### Local Development
Ensure the backend service is running. Follow the backend repository's README to set it up.
1. Clone the repository:
   Open your terminal and run: <code>git clone [Repository URL]</code>
2. `cd` to the repository folder in Terminal.
3. Install dependencies run: <code>npm install</code>
4. Start the development server run: <code>npm start</code>
The start script in the package.json includes HTTPS=true to enable secure connections during local development.
5. Access the app in your browser at https://localhost:3000. 

### Cloud Deployment
1. Before deploying the application to the cloud:
Modify the start script in package.json to remove HTTPS=true.
2. Deploy the application using the following command: <code>gcloud run deploy groupgrub-ui</code>

## Routes
The **GroupGrub Frontend UI** uses a React Router for client-side navigation. Below is an explanation of the routes 
used in the application:

### Homepage
* **Component:** `<Homepage />`
* **Description:** This is the landing page for the application, where users can view basic information, navigate to other parts of the app and log in. 
* **Access:** Public (no authentication required).

### Participant Dashboard
* **Component:**  `<Participant />` (wrapped in `<ProtectedRoute />`)
* **Description:** Displays a participant-specific dashboard. Participants can view their order history. After you logged in, you will be directed to this page.
* **Access:** Protected (authentication required).

###  Groups Overview
* **Component:**  `<Groups />` (wrapped in `<ProtectedRoute />`)
* **Description:** Shows a list of all groups. The participant can view the details of each group.
* **Access:** Protected (authentication required).

### Group Details
* **Component:**  `<Group />` (wrapped in `<ProtectedRoute />`)
* **Props Passed:**
  - `setSessionGroupId`: Updates the group session ID.
  - `setSessionGroupOrderId`: Updates the session order ID for the group.
  - `setOrderFoodProviderId`: Sets the food provider for group orders.
* **Description:**  Displays details of a specific group, allowing participants to join the specific group and start the group order. 
* **Access:** Protected (authentication required).

###  FoodProviders Overview
* **Component:**  `<FoodProviders />`
* **Description:** Displays a list of food providers.
* **Access:** Public (no authentication required).

###  FoodProvider Details
* **Component:**  `<FoodProvider />` (wrapped in `<ProtectedRoute />`)
* **Props Passed:**
   - `sessionGroupId`: The currently selected group ID.
   - `sessionGroupOrderId`: The currently selected group order ID.
* **Description:**  Displays details for a specific food provider like menu and allows participants to order items for their group.
* **Access:** Protected (authentication required).

###  Page Not Found
* **Component:** `<PageNotFound />` (wrapped in `<ProtectedRoute />`)
* **Description:**  A fallback route that handles undefined or invalid paths, displaying a "Page Not Found" text.
* **Access:** Protected (authentication required).

## What the Client App Does
The GroupGrub Frontend UI connects to the backend service and empowers users:
1. Simplifies group food order creation by enabling participants to join the group and manage group orders. 
2. Streamlines order management for participants and groups, making it easier to place and view orders.
3. Facilitates collaboration by allowing participants to join specific groups and start ordering from that group.
4. Faster communication with the backend service to retrieve real-time updates on groups and orders.
5. Improves Accessibility by providing a responsive, accessible interface for all participants.
6. Prevents Unauthorized Actions by only allowing authenticated participants to start group orders. 

## User Interface Design
The interface designed in Figma https://www.figma.com/design/gNpO7eEBUzSFU3JQrBEauj/GroupGrub?node-id=0-1&node-type=canvas&t=pVqZHb7Qz2tXbJYC-0
as a start point. It served as a blueprint for the React component structure. 
It ensured that the visual design aligned with functionality and usability requirements. 