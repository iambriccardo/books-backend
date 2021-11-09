terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}


provider "aws" {
  profile                 = var.profile
  region                  = var.region
  # shared_credentials_file = var.shared_credentials_file
  # credentials are taken from env vars!
}


# Note: Alternative to Shared Credentials File
# use environment variables, such as AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
# or hard-code the path to the shared credentials file (although this is platform-dependent!)
