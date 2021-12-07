# Systems Engineering 2021 Project

# Introduction

The need for an automated CI/CD solution becomes everyday more important for any project aiming at frequent and qualitative releases to the users or customers.

In this document we propose our implementation of a CI/CD solution that aims at scalability and modularity while still preserving simplicity. We will try to describe in details our work with a focus on the ideas that led us to implement our solution. Furthermore, we will emphasize the assumptions and considerations behind the system’s development, in order to justify all of our choices to the reader.

# The Application

This pipeline’s ultimate goal is to deploy an application composed by a NodeJS backend service written in TypeScript. The application provides a set of RESTFul endpoints that power a possible frontend application consisting of a platform for buying and selling books. Moreover, the service is connected to a MongoDB-based data layer, responsible for holding all data powering the application.

The application code can be found on the [GitHub repository](https://github.com/RiccardoBusetti/books-backend).

*Initially, the application was developed without a containerized approach: it was later adapted for the scope of this project to a Docker based application. The document will discuss the Docker port in details.*

# Goals

The goal of this project is to develop an end-to-end CI/CD solution aiming at automating as much as possible the release process of the aforementioned application.

While thinking about our solution, we decided to set our goals in terms of the characteristics a good CI/CD solution should have. A good CI/CD solution should be:

To define the basic goals of our solution, we starting by reasoning about the prerequisites of a good CI/CD solution, which we identified in following characteristics:

- **Scalability** → we wanted our solution to be scalable meaning that it should adapt well to changes in the requirements, it should not require many changes even for complex tasks and most importantly many of the changes can be applied in a centralized manner.
- **Simplicity** → we wanted our solution to be simple, meaning that no esoteric technologies should be used and most importantly the whole CI/CD flow should be straightforward to understand and as a consequence modify.
- **Agnostic Deployment** → we wanted our solution to be as much independent as possible from the deployment environment, aka the infrastructure. Even though this is impossible to do, because there will always be even a small dependency on the infrastructure the solution should try to abstract it.
- **Automaticity** → we wanted our solution to be as automatic as possible, meaning that for every new release of the application most of the steps from the commit to the deployment should be done automatically. This is a very important requirement that is key to a successful, safe and extensible CI/CD solution.
- **Observability** → we wanted our solution to offer observability to the development team, meaning that at any point in time anyone can check the status of the CI/CD process and also get notified when new state changes occur.

# Technologies

The CI/CD was built with different technologies chosen for their specific strengths and features. The next sections of this document will explain all involved technologies, along with the motivation behind their adoption.

It is important to note that this document doesn’t aim at explaining in detail how everything was implemented but it wants to provide a comprehensive high level overview on how the CI/CD solution was implemented with a special emphasis on the reasons behind all implementation choices.

## Docker

- [Docker](https://www.docker.com/)
- [DockerHub](https://hub.docker.com/)

### Motivations

- The application we used has been built without any containerization, thus the deployment process was more complicated because we needed to find a platform which had the NodeJS runtime supported and understand how to properly configure it.
- The application we used had a MongoDB database which needed to be deployed separately with complex configurations that were environment specific.
- The application and the database should run in separate environments, which without containers required complex VM orchestration, whereas  Docker enables free, built in isolation.

### Usage

In order to use Docker for the application, we needed to create all necessary files such as `Dockerfile` and `docker-compose`. We also needed to add a reverse proxy container in order to orchestrate all the requests to the actual backend container, which will be better explained later in this document.

To simplify the configuration of our three-tier architecture we decided to use Docker Compose and build a docker network of interconnected containers. Usage of docker compose allowed us to completely abstract the networking complexity and enabled us to define the containers of our system in a declarative and centralized fashion.

The interconnected docker containers used in our architecture are the following:

- **Reverse proxy** → we created a custom docker image from the `nginx` image with a custom configuration that will redirect the traffic to the appropriate containers within the docker network. This container is needed for AWS Beanstalk but also helps the scalability of the application by acting as a load balancer in case of multiple backend instances.
- **Backend** → we created a custom docker image from the `node:14` image with all the necessary application dependencies and code.
- **Database** → we used the original `mongo` docker image.

In order to guarantee data persistence of the Mongo container we created a named volume. This volume is stored on the filesystem of the host machine and will persist between different container initializations. It is important to note that without volumes all data stored by the database would be lost in the event of a container’s deletion or restart. This behavior is distinctive of docker, where each container is created out of a base image and thus each new restart will start from that same base.

## GitHub

- [GitHub](https://github.com/)
- [GitHub Actions](https://github.com/features/actions)

### Motivations

- We decided to use GitHub both because we were already comfortable with the tool but also because it is by far the most used VCS service in the industry.
- We also used GitHub for GitHub Actions, an amazing feature which enables repository owners to design CI/CD pipelines with ease. These pipelines are triggered by specific events such as commits or pull requests. Additionally, there is a marketplace of actions that enabled the creation of very advanced and feature rich pipelines

### Usage

In order to use GitHub we had to initialize our application’s folder under git and create a remote repository on GitHub. We then pushed our code and we had the repository up and running.

The other important step was to design the CI/CD pipeline with the help of GitHub Actions. Each action is specified by a `.yml` file located in the `.github/workflows` folder in the repository and is characterized by a set of jobs which are divided in different steps. All the jobs run in parallel by default and the steps inside each job are sequential in nature. This results in a Direct Acyclic Graph (DAG) of jobs which can be modeled via the many different properties supported by GitHub. In our case we created one single action in the file `main.yml` which consists of many different jobs where some are dependent on each other and some can freely run in parallel. The steps within each job will be more comprehensively described in the appropriate section.

In order to decide which jobs to include we analyzed what were the most important steps that a CI/CD pipeline should have and we decided for the following:

- **Setup** → the setup job is responsible of preparing the pipeline environment.
- **Test** → the test job is responsible of setting up the test environment and running the all the tests in the test suite.
- **Provision** → the provision job is responsible of setting up all the required infrastructure and networking on which our application will run.
- **Build** → the build job is responsible of building and pushing on docker hub the docker images of the components of our three tier architecture.
- **Deploy** → the deploy job is responsible of deploying the latest changes to an AWS Beanstalk instance.

It is important to note that all the aforementioned phases are sequential, except for the build and deploy phases which run in parallel due to their independent nature. This can be seen with the image below.

![Image.png](https://res.craft.do/user/full/2e0f2ba1-80cc-31ce-f08c-a4f04b42bc41/doc/859F3C6D-CDD2-44CB-8AEB-C315246E97F8/FB6C255F-DC89-4945-A579-DA2C4B06E70B_2/Image.png)

To enhance the already great observability properties offered by the GitHub actions we decided to implement an integration with a Telegram Bot called [https://t.me/books_cicd_bot](https://t.me/books_cicd_bot) which is responsible of sending real time updates of the pipeline to the subscribers.

## Terraform

- [Terraform](https://www.terraform.io/)
- [Terraform Cloud](https://app.terraform.io/app)

### Motivations

- The provisioning of any system is a complicated and intricate process that requires a lot of time. Even though in most of the use cases the provisioning of a system occurs one time, in modern scenarios it is very common to spin up different instances of the same infrastructure for different purposes (e.g. development, staging and production). For this reason we decided to use Terraform to describe our infrastructure with a declarative language that helped us to provision the infrastructure with a single command and also to keep track of the changes of the infrastructure during time.
- The choice of Terraform was also made because it had a very useful state concept, which enabled Terraform to remember thanks to its state all the current provisioning details. This allows Terraform to provide idempotency to the creation and deletion of the infrastructure, which are key features for our pipeline to successfully work.
- We wanted also a way to abstract as much as possible the provisioning step from the pipeline itself, which allowed us to modify the provisioning system without actually touching the delicate pipeline. Thanks to Terraform we were able to reach this goal in making the pipeline as independent from the infrastructure as possible.

### Usage

### Structure

The structure of the terraform directory follows Hashicorps' guidelines for Module Development. The only differences are the exclusion of the [*outputs.tf*](http://outputs.tf) file, since it is not needed, and the creation of two dedicated files for the IAM and Elastic Beanstalk services. This choice was made to follow modular approach for easier maintenance of the system.

```other
├── backend.tf # Definition of the remote backend on Terraform Cloud
├── elastic_beanstalk.tf # Configuration of Elastic Beanstalk Environment and App
├── iam_role.tf # Configuration of IAM Roles, Profiles and Policies
├── main.tf # Definition and configuration of AWS provider
└── variables.tf # Initialization of required variables (including those from Terraform Cloud)
```

### Infrastructure Definition

The configuration contained in this Terraform Setup defines an AWS Infrastructure composed by the following resources and services:

- **Elastic Beanstalk**
- An *Elastic Beanstalk Application*
- An *Elastic Beanstalk Environment*, configured with 64bit Amazon Linux 2 v3.4.8 running Docker
- **IAM**
- A *IAM Instance Profile*, to manage the EC2 Instance within Elastic Beanstalk
- A *IAM Role* associated to the Instance Profile
- 3 *IAM Policy Attachments*, to define the IAM Role's Permissions

### Backend and Remote State

#### Old Approach

The first approach to remote Terraform State saving exploited AWS's **S3 Buckets**. The initial approach contained a dedicated *./remote-state* folder, with a Terraform configuration used to initialize the S3 Bucket and the KMS Encryption, and the [*backend.tf*](http://backend.tf) file was configured to use that S3 Bucket. This old configuration exploited following resources:

- **S3**
- An *S3 Bucket*, to store the Terraform State remotely
- A *S3 Bucket Public Access Block* to ensure that the S3 Bucket is private
- **KMS**
- A *KMS Key* to encrypt the S3 Bucket
- A *KMS Alias* to access the encrypted bucket
- **DynamoDB**
- A *DynamoDB Table*, to prevent multiple users from modifying Terraform State in the S3 Bucket

#### Current Approach

In order to integrate Terraform with Github Actions, the aforementioned approach was replaced with **Terraform Cloud**. Currently, the [*backend.tf*](http://backend.tf) file is configured to save the state remotely on Terraform Cloud. This approach allows to define Elastic Beanstalk's Environment Variables inside Terraform (without having to define them from AWS UI or CLI) and to retrieve their values from Terraform Cloud.

### AWS Authentication

Different approaches were tested to implement AWS Authentication. The current approach exploits **Terraform Cloud's Environment Variables**: to ensure the correct execution, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be defined as Environment Variables from within Terraform Cloud.

Before using Terraform Cloud, AWS Authentication was performed using the local *~/.aws/credentials* file

### Elastic Beanstalk Environment Settings

The configuration of Elastic Beanstalk is entirely defined in the *elastic_beanstalk.tf* file. The settings of the Elastic Beanstalk Environment are divided into two main categories, each defined using a dedicated *dynamic setting* block.

The first set of settings defines the general Environment's configuration parameters, namely *autoscaling boundaries* and *IAM Instance Profile*, by taking the attributes from a local value. Since these are general configuration parameters, they can be hard-coded within the repository.

The second set of settings defines all the Environment Variables, by looping on a local map. These variables contain sensitive information which should not be hard-coded in the repository: for this reason, their values are defined in Terraform Cloud, and referred to simply as `var.` inside the repository.

### Cross Platform Deployment

A possible future improvement is the support of different cloud providers. For reasons stated in the upcoming section, this project was deployed using AWS, and Terraform was configured to build an infrastructure on said cloud provider. However, it is possible to further generalize the current pipeline in order for it to support multiple providers.

First, the pipeline should provide a way to choose the cloud provider: the most basic approach would be to define some keywords to be specified in commits' messages (eg: *AWS*, *Azure*, *Google*).

Next, it is necessary to configure Terraform so that it can behave differently according to the required cloud provider.

A first approach to this was to restructure the Terraform directory using modules: by creating a new module for each provider, and configuring the root module to coordinate those modules, this could be possible. However, every execution of `terraform apply` would trigger every module, and therefore deploy on all cloud providers. There exists a `-target=` parameter, but it can only be used to target a specific resource to be planned or applied (eg: *elastic_beanstalk_environment*), and it is not applicable to target a whole module.

The simpler approach would be to define different Terraform directories, one per different cloud provider. Then, the *provision stage* in the `main.yml` should be modified, by having the `working-directory:` parameter point towards the directory related to the chosen cloud provider.

## AWS

### Motivations

- The amount of cloud providers in the industry is growing exponentially but there are still 3 major players, which are AWS, GCP, Azure. We decided to use AWS because it is the most used cloud provider in the world and it is well know for the convenient free tier offering.
- The amount of services offered by AWS is countless, you can basically build everything you want and the transparency of the services enables the developers to focus on the application instead of the infrastructure.

### Usage

We decided to use for our solution the AWS Elastic Beanstalk which is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS. You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the Amazon Web Services resources powering your application and can access the underlying resources at any time. For these reasons AWS offered the best solution for us, especially because it has recently launched a new environment called *Docker running on 64bit Amazon Linux 2/3.4.8* which added out of the box support for docker compose. In our case the three-tier architecture was designed entirely with docker compose thus the deployment on AWS was basically plug and play.

The way in which AWS Elastic Beanstalk is provisioned is completely handled by Terraform, the only important thing is to understand the concept of applications and environments. An *environment* is a collection of AWS resources running an application version. Whereas an *application* is a logical collection of Elastic Beanstalk components, including *environments*, *application versions*, and *saved configurations*. Each environment can deploy a specific application version which has to be supplied a `.zip` file. This `.zip` file is provided automatically by the pipeline and it is deployed automatically.

An important detail is that in the docker compose file we specify that we want to build locally 2 images out of the three, respectively `nginx` and the `backend`, even though via the pipeline we push both of the images to Docker Hub. This was done in order to reduce the load on Docker Hub and speed up the deployment on AWS. The push of the images on Docker Hub was mainly done in order to provide the users a way to freely run the images on their own machines without needing to build them manually. This explains why the pipeline has the *build* and *deploy* stages defined in parallel.

# CI/CD Execution Flow

![se_pipeline.png](https://res.craft.do/user/full/2e0f2ba1-80cc-31ce-f08c-a4f04b42bc41/doc/859F3C6D-CDD2-44CB-8AEB-C315246E97F8/990CCCC9-4422-4426-B97A-4661BD3E97BD_2/se_pipeline.png)

The CI/CD system is composed by many different interconnected components which follow a very specific execution flow.

It is important to note that whenever any step in the pipeline fails, all the next steps will not be executed, except for the step where the Telegram bot sends a notification signaling the actual failure.

1. The pipeline is triggered whenever a commit is made on the `main` branch or a pull request is created. The different between the trigger from a commit or a pull request will just affect the steps of the pipeline.
2. The code is checkout out by GitHub and a notification is sent by the Telegram bot.
3. A MongoDB instance is initialized and the unit tests and integration tests are run by the application. Once finished a notification is sent by the Telegram bot.
4. If there is a commit the infrastructure is provisioned by Terraform and the pipeline will continue, otherwise if there is a pull request, the infrastructure is only planned by Terraform and a message in the pull request is made signaling the plan which Terraform would apply in case the PR will be accepted. In case of pull request the next jobs will not be executed, therefore no deployments are performed. Once finished a notification is sent by the Telegram bot.
5. The docker images are built, tagged and pushed to their respective repositories on Docker Hub. Once finished a notification is sent by the Telegram bot.
6. The source code is zipped into a file called `deploy.zip` which will be deployed on AWS Beanstalk by using the same configuration as applied in the previous step via Terraform. Once finished a notification is sent by the Telegram bot.
7. All the artifacts will be cleaned up and the pipeline will successfully complete.

# Links

- [DockerHub backend repository](https://hub.docker.com/repository/docker/riccardobusetti/books-backend)
- [DockerHub nginx repository](https://hub.docker.com/repository/docker/riccardobusetti/books-nginx)
- [GitHub repository](https://github.com/RiccardoBusetti/books-backend)
- [AWS Elastic Beanstalk instance](http://books-env.eba-hp2pbwfr.eu-central-1.elasticbeanstalk.com/)