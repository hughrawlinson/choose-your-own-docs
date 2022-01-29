import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

export interface Edge {
  title: string;
}

export interface Block {
  title: string;
  content: string;
  edges: Edge[];
}

export interface Language {
  name: string;
}

export interface DynamicDocument {
  title: string;
  initialState: string;
  languages?: Language[];
  states: Block[];
}

const dynamicDocument: DynamicDocument = {
  title: "Get Started with our API",
  initialState: "Welcome",
  languages: [
    {
      name: "cURL",
    },
    {
      name: "Javascript",
    },
  ],
  states: [
    {
      title: "Welcome",
      content: `## Welcome to the API documentation
      
This tutorial will help you learn how to use our API. Our API handles many
usecases, including controlling the content in users spaces, and managing the
users in an organization.

Select your outcome below to get started.

_ignore below for just a second_

\`\`\`cURL
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your access token>" -d '{
\`\`\`

\`\`\`Javascript
const js = "A real good programming language"
\`\`\`


`,
      edges: [
        {
          title: "Manage content in spaces",
        },
        {
          title: "Manage users in an organization",
        },
      ],
    },
    {
      title: "Manage content in spaces",
      content: `To manage content in a public space, you will need an _app level_ access token. 

App level access tokens are availabe in any language. Which language are you using?
`,
      edges: [
        {
          title: "Client Credentials in Node.js",
        },
        {
          title: "Client Credentials in Swift",
        },
      ],
    },
    {
      title: "Manage users in an organization",
      content: `To manage users in an organization, you will need an _admin level_ access token.
      
Admin level access tokens are only available through the Authorization Code with PKCE oauth flow.
Since the Authorization Code with PKCE flow is only available to *Confidential clients*, you will
you must implement this on the server side only, and make sure to keep your client secret secret.`,
      edges: [
        {
          title: "What to do if your client secret leaks",
        },
        {
          title: "Authorization Code with PKCE flow in Node.js",
        },
      ],
    },
    {
      title: "What to do if your client secret leaks",
      content: `Recycle your client secret`,
      edges: [],
    },
    {
      title: "Client Credentials in Node.js",
      content: `1. Register your client
      2. Store your credentials in environmental variables
      3. Install our nodejs sdk
      4. Instantiate the client with the credentials`,
      edges: [
        {
          title: "Manage content in spaces - Node JS",
        },
        {
          title: "Manage users in an organization - Node JS",
        },
      ],
    },
    {
      title: "Client Credentials in Swift",
      content: `1. Register your client
      2. Store your credentials in a plist file
      3. Install our swift sdk
      4. Instantiate the client with the credentials`,
      edges: [
        {
          title: "Manage content in spaces - Swift",
        },
      ],
    },
    {
      title: "Authorization Code with PKCE flow in Node.js",
      content: `1. Register your client
      1. Register your redirect uri
      2. Store your credentials in environmental variables
      3. Install our nodejs sdk
      4. Instantiate the client with the credentials
      5. Grant access to your client in the popup window
      6. Check that you have an access token
      
You can use [our tool]() to check that your access token is valid`,
      edges: [
        {
          title: "Manage content in spaces - Node JS",
        },
        {
          title: "Manage users in an organization - Node JS",
        },
      ],
    },
    {
      title: "Manage content in spaces - Node JS",
      content: `1. Using the client, call the \`getSpace\` method
2. The response will contain the space information
3. To update the space information, call the \`createChangeRequest\` method
4. The change request is now ready to review in the GitBook UI, and a reviewer has been notified`,
      edges: [
        {
          title: "Congratulations",
        },
      ],
    },
    {
      title: "Manage content in spaces - Swift",
      content: `1. Using the client, call the \`getSpace\` method
2. The response will contain the space information
3. To update the space information, call the \`createChangeRequest\` method
4. The change request is now ready to review in the GitBook UI, and a reviewer has been notified`,
      edges: [
        {
          title: "Congratulations",
        },
      ],
    },
    {
      title: "Manage users in an organization - Node JS",
      content: `1. Using the client, call the \`getUsers\` method
2. The response will contain the list of your organization's users
3. To add a new user to your organization, call the \`createUser\` method
4. To remove a user from your organization call the \`deleteUser\` method`,
      edges: [
        {
          title: "Congratulations",
        },
      ],
    },
    {
      title: "Congratulations",
      content: `You completed the Getting Started tutorial!
## What's next?
Check out our [developer showcase](#), or browse our [reference documentation](#) to learn more about the API.

`,
      edges: [],
    },
  ],
};

ReactDOM.render(
  <App dynamicDocument={dynamicDocument} />,
  document.getElementById("root")
);
