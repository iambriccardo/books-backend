variable "elasticapp" {
    default = "books-app"
}

variable "elasticenv" {
    default = "books-env"
}

variable "region" {
    default = "eu-central-1"
}

variable "profile" {
    default = "default"
}

variable "solution_stack_name" {
    default = "64bit Amazon Linux 2 v3.4.8 running Docker"
}

variable "autoscaling_min" {
    default = 1
}

variable "autoscaling_max" {
    default = 1
}


# Terraform Cloud Variables:
variable "APP_NAME" {}
variable "PORT" {}
variable "MONGO_DB_URL" {}
variable "SESSION_SECRET_KEY" {}
variable "ENABLE_LOGGING" {}
variable "CLOUDINARY_URL" {}
variable "GCP_API_KEY" {}
variable "SECRET_KEY" {}
variable "SELL_BOOK_CONFIRM_BASE_URL" {}