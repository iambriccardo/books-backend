# The EB App's Name
variable "elasticapp" {
    default = "test-app"
}

# The EB Env's Name
variable "elasticenv" {
    default = "test-env"
}

variable "region" {
    default = "eu-central-1"
}

variable "solution_stack_name" {
    default = "64bit Amazon Linux 2 v3.4.8 running Docker"
}

variable "shared_credentials_file" {
    type = string
}

variable "autoscaling_min" {
    default = 1
}

variable "autoscaling_max" {
    default = 1
}