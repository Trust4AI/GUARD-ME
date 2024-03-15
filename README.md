## Trust4AI Bias Evaluator Component based on the use of LLMs

This project provides a evaluator of prompts/search strings for testing the bias of AI-enabled Search Engines using LLMs as sources of information.

## Index

1. [Usage](#usage)
2. [Deployment](#deployment)
   1. [Local deployment](#local-deployment)
   2. [Docker deployment](#docker-deployment)
3. [Repository structure](#repository-structure)
4. [License and funding](#license-and-funding)

## Usage

<p align="right">[<a href="#trust4ai-bias-evaluator-component-based-on-the-use-of-llms">Back to top</a>]</p>

## Deployment

For the correct operation, it is necessary to previously deploy the [executor component](https://github.com/Trust4AI/executor-component), in charge, as its name indicates, of executing the test cases on the models.

### Local deployment

To deploy the Bias Evaluator Component locally, please follow these steps carefully:

1. Prepare the necessary environment variables:
    1. Rename the `.env.local` file to `.env`.
    2. Open the `.env` file and update the following entries:
        1. `OPENAI_API_KEY`: Your OpenAI API key.
        2. `CANDIDATE_MODEL`: The name of the candidate model to be used. The available options are `gemma`.
        3. `EXECUTOR_COMPONENT_HOST`: The host where the executor component is running, to execute the prompts to the candidate model.

   The `.env` file should look like this:

   ```.env
   PORT=8001
   OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
   CANDIDATE_MODEL=gemma
   EXECUTOR_COMPONENT_HOST=http://localhost:8081/api
   NODE_ENV=local
   ```

2. Install the component dependencies:
    1. Ensure you have [Node.js](https://nodejs.org/en/download) installed on your system (version 16.x or newer is recommended). You can check your Node.js version by running `node -v` in your terminal.
    2. Navigate to the `src` directory and install the required dependencies:

        ```bash
        cd src
        npm install
        ```

3. Compile the source code and start the server:

    ```bash
    npm run build
    npm start
    ```

4. To verify that the Bias Evaluator Component is running, you can check the status of the server by running the following command:

    ```bash
    curl -X GET "http://localhost:8001/api/v1/metamorphic-tests/check" -H  "accept: application/json"
    ```

5. Finally, you can access the API documentation by visiting the following URL in your web browser:

    ```
    http://localhost:8001/api/v1/metamorphic-tests/docs
    ```

### Docker deployment

To deploy the Bias Evaluator Component using Docker, please follow these steps carefully:

1. Prepare the necessary environment variables:
    1. Rename the `.env.docker` file to `.env`.
    2. Open the `.env` file and update the following entries:
        1. `OPENAI_API_KEY`: Your OpenAI API key.
        2. `CANDIDATE_MODEL`: The name of the candidate model to be used. The available options are `gemma`.
        3. `EXECUTOR_COMPONENT_HOST`: The host where the executor component is running, to execute the prompts to the candidate model.

    The `.env` file should look like this:

    ```.env
    PORT=8001
    OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
    CANDIDATE_MODEL=gemma
    EXECUTOR_COMPONENT_HOST=http://localhost:8081/api
    NODE_ENV=docker
    ```

2. Execute the following Docker Compose instruction:

    ```bash
    docker-compose up -d
    ```

3. To verify that the Bias Evaluator Component is running, you can check the status of the server by running the following command:

    ```bash
    curl -X GET "http://localhost:8001/api/v1/metamorphic-tests/check" -H  "accept: application/json"
    ```

4. Finally, you can access the API documentation by visiting the following URL in your web browser:

    ```
    http://localhost:8001/api/v1/metamorphic-tests/docs
    ```

<p align="right">[<a href="#trust4ai-bias-evaluator-component-based-on-the-use-of-llms">Back to top</a>]</p>

## Repository structure

This repository is structured as follows:

- `docs/openapi/spec.yaml`: This file is used to describe the entire API, including available endpoints, operations on each endpoint, operation parameters, and the structure of the response objects. It's written in YAML format following the [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) (OAS).
- `docs/postman/collection.json`: This file is a collection of API requests saved in JSON format for use with Postman.
-  `src/`: This directory contains the source code for the project.
-  `.dockerignore`: This file tells Docker which files and directories to ignore when building an image.
-  `.gitignore`: This file is used by Git to exclude files and directories from version control.
-  `Dockerfile`: This file is a script containing a series of instructions and commands used to build a Docker image.
-  `docker-compose.yml`: This YAML file allows you to configure application services, networks, and volumes in a single file, facilitating the orchestration of containers.

<p align="right">[<a href="#trust4ai-bias-evaluator-component-based-on-the-use-of-llms">Back to top</a>]</p>

## License and funding

[Trust4AI](https://trust4ai.github.io/trust4ai/) is licensed under the terms of the GPL-3.0 license.

Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or European Commission. Neither the European Union nor the granting authority can be held responsible for them. Funded within the framework of the [NGI Search project](https://www.ngisearch.eu/) under grant agreement No 101069364.

<p align="center">
<img src="https://github.com/Trust4AI/trust4ai/blob/main/funding_logos/NGI_Search-rgb_Plan-de-travail-1-2048x410.png" width="400">
<img src="https://github.com/Trust4AI/trust4ai/blob/main/funding_logos/EU_funding_logo.png" width="200">
</p>
