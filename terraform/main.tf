terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}


provider "aws" {
  profile = var.profile
  region  = var.region
  # credentials are taken from env vars!
}
