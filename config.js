import convict from "convict";
import { email, url } from "convict-format-with-validator";
import { getConfig } from "convict-dotenv";

convict.addFormat(email);
convict.addFormat(url);

// Define a schema
const schema = {
  env: {
    doc:
      "The NODE_ENV environment variable specifies the environment in which an application is running.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  baseURL: {
    doc: "The Base URL is where users access Jira Cloud.",
    format: "url",
    default: null,
    env: "JIRA_BASE_URL",
    arg: "base_url",
  },
  username: {
    doc: "The username is the email used to login to Jira Cloud.",
    format: "email",
    default: null,
    env: "JIRA_USERNAME",
    arg: "username",
  },
  apiToken: {
    doc: "The API token is a secret that authenticates with Jira Cloud.",
    format: String,
    default: null,
    env: "JIRA_API_TOKEN",
    arg: "apiToken",
  },
  container: {
    doc:
      "The container is either a Jira project or service desk that will be the target.",
    format: String,
    default: "Teams in Space",
    env: "JIRA_CONTAINER",
    arg: "container",
  },
};

export const config = getConfig(schema);
// Alternative without convict-dotenv, missing .env:
// const loader = convict(schema);
// loader.validate({ allowed: "strict" });
// export const config = loader.getProperties();
