provider "aws" {
  profile                 = "riccardo_aws"
  region                  = var.region
  shared_credentials_file = var.shared_credentials_file
}