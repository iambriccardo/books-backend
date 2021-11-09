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

variable "region" {
  default = "eu-central-1" 
}

variable "profile" {
    default = "default"
}

# variable "shared_credentials_file" {
#     type = string
# }