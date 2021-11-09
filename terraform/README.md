# Terraform Configuration

## AWS Authentication
The credentials for AWS Authentication are currently taken from the machine's environment variables. To work successfully, ensure to have following variables declared:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

## Remote State
The Terraform state is saved remotely using an AWS S3 Bucket. To initialize the remote state, head to the /remote-state folder and run `terraform init && terraform apply`. This will create the resources required to store the state remotely. 
NOTE: this has to be done BEFORE running `terraform init` from the ~/terraform directory!

## Infrastructure Definition
The configuration contained in this Terraform Setup defines an AWS Infrastructure composed by the following resources and services:
- **Elastic Beanstalk**
    - An *Elastic Beanstalk Application*
    - An *Elastic Beanstalk Environment*, configured with 64bit Amazon Linux 2 v3.4.8 running Docker
- **IAM**
    - A *IAM Instance Profile*, to manage the EC2 Instance within Elastic Beanstalk
    - A *IAM Role* associated to the Instance Profile
    - 3 *IAM Policy Attachments*, to define the IAM Role's Permissions
- **S3**
    - An *S3 Bucket*, to store the Terraform State remotely
    - A *S3 Bucket Public Access Block* to ensure that the S3 Bucket is private

### Note on KMS Encryption
For further security, the S3 Bucket containing the remote state can be encrypted using AWS's KMS Service. This exploits following resources:
- **KMS**
    - A *KMS Key* to encrypt the S3 Bucket
    - A *KMS Alias* to access the encrypted bucket

Since these resources are not included in the Free Tier, the related lines are currently commented. Affected lines are *backend.tf:[6-7]* and *remote-state/state.tf:{[1-12], [24-31]}*


## AWS Credentials
To avoid publishing credentials, every terraform action for the project requires the path to a shared credentials file. Ensure to have AWS CLI installed, then head to the ~/.aws/credentials path, to find the credentials file. This file is generated when running the `aws configure` command