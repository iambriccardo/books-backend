# Terraform Configuration

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
The first approach to remote Terraform State saving exploited AWS's **S3 Buckets**. The initial approach contained a dedicated `./remote-state` folder, with a Terraform configuration used to initialize the S3 Bucket and the KMS Encryption, and the `backend.tf` file was configured to use that S3 Bucket. This old configuration exploited following resources:
- **S3**
    - An *S3 Bucket*, to store the Terraform State remotely
    - A *S3 Bucket Public Access Block* to ensure that the S3 Bucket is private
- **KMS**
    - A *KMS Key* to encrypt the S3 Bucket
    - A *KMS Alias* to access the encrypted bucket
- **DynamoDB**
    - A *DynamoDB Table*, to prevent multiple users from modifying Terraform State in the S3 Bucket

### Current Approach
In order to integrate Terraform with Github Actions, the aforementioned approach was replaced with **Terraform Cloud**. Currently, the `backend.tf` file is configured to save the state remotely on Terraform Cloud. This approach allows to define Elastic Beanstalk's Environment Variables inside Terraform (without having to define them from AWS UI or CLI) and to retrieve their values from Terraform Cloud.

## AWS Authentication
Different approaches were tested to implement AWS Authentication. The current approach exploits **Terraform Cloud's Environment Variables**: to ensure the correct execution, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be defined as Environment Variables from within Terraform Cloud.
Before using Terraform Cloud, AWS Authentication was performed using the local *~/.aws/credentials* file