terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  profile                 = "default"
  region                  = var.region
  shared_credentials_file = var.shared_credentials_file
}

variable "region" {
  default = "eu-central-1"
}

variable "shared_credentials_file" {
    type = string
}