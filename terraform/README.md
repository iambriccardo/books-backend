# Terraform Configuration

## Structure
The structure of the terraform directory follows Hashicorps' guidelines for Module Development. The only differences are the exclusion of the *outputs<span>.tf</span>* file, since it is not needed, and the creation of two dedicated files for the IAM and Elastic Beanstalk services. This choice was made to follow modular approach for easier maintenance of the system.
```
├── backend.tf                  # Definition of the remote backend on Terraform Cloud
├── elastic_beanstalk.tf        # Configuration of Elastic Beanstalk Environment and App
├── iam_role.tf                 # Configuration of IAM Roles, Profiles and Policies
├── main.tf                     # Definition and configuration of AWS provider
└── variables.tf                # Initialization of required variables (including those from Terraform Cloud)
```

## Infrastructure Definition
The configuration contained in this Terraform Setup defines an AWS Infrastructure composed by the following resources and services:
- **Elastic Beanstalk**
    - An *Elastic Beanstalk Application*
    - An *Elastic Beanstalk Environment*, configured with 64bit Amazon Linux 2 v3.4.8 running Docker
- **IAM**
    - A *IAM Instance Profile*, to manage the EC2 Instance within Elastic Beanstalk
    - A *IAM Role* associated to the Instance Profile
    - 3 *IAM Policy Attachments*, to define the IAM Role's Permissions

## Backend and Remote State
### Old Approach
The first approach to remote Terraform State saving exploited AWS's **S3 Buckets**. The initial approach contained a dedicated *./remote-state* folder, with a Terraform configuration used to initialize the S3 Bucket and the KMS Encryption, and the *backend<span>.tf</span>* file was configured to use that S3 Bucket. This old configuration exploited following resources:
- **S3**
    - An *S3 Bucket*, to store the Terraform State remotely
    - A *S3 Bucket Public Access Block* to ensure that the S3 Bucket is private
- **KMS**
    - A *KMS Key* to encrypt the S3 Bucket
    - A *KMS Alias* to access the encrypted bucket
- **DynamoDB**
    - A *DynamoDB Table*, to prevent multiple users from modifying Terraform State in the S3 Bucket

### Current Approach
In order to integrate Terraform with Github Actions, the aforementioned approach was replaced with **Terraform Cloud**. Currently, the *backend<span>.tf</span>* file is configured to save the state remotely on Terraform Cloud. This approach allows to define Elastic Beanstalk's Environment Variables inside Terraform (without having to define them from AWS UI or CLI) and to retrieve their values from Terraform Cloud.

## AWS Authentication
Different approaches were tested to implement AWS Authentication. The current approach exploits **Terraform Cloud's Environment Variables**: to ensure the correct execution, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be defined as Environment Variables from within Terraform Cloud.
Before using Terraform Cloud, AWS Authentication was performed using the local *~/.aws/credentials* file

## Elastic Beanstalk Environment Settings
The configuration of Elastic Beanstalk is entirely defined in the *elastic_beanstalk<span>.tf</span>* file. The settings of the Elastic Beanstalk Environment are divided into two main categories, each defined using a dedicated *dynamic setting* block. <br> The first set of settings defines the general Environment's configuration parameters, namely *autoscaling boundaries* and *IAM Instance Profile*, by taking the attributes from a local value. Since these are general configuration parameters, they can be hard-coded within the repository. <br> The second set of settings defines all the Environment Variables, by looping on a local map. These variables contain sensitive information which should not be hard-coded in the repository: for this reason, their values are defined in Terraform Cloud, and referred to simply as `var.<ENV_VAR_NAME>` inside the repository.