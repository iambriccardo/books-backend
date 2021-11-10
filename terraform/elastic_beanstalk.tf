resource "aws_elastic_beanstalk_application" "EB_application" {
  name = var.elasticapp
}

resource "aws_elastic_beanstalk_environment" "EB_environment" {
  name                = var.elasticenv
  application         = aws_elastic_beanstalk_application.EB_application.name
  solution_stack_name = var.solution_stack_name

  dynamic "setting" {
    for_each = local.EB_configuration
    content {
      namespace = setting.value.namespace
      name      = setting.value.name
      value     = setting.value.value
    }
  }

  dynamic "setting" {
    for_each = local.EB_env_variables
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
    }
  }
}

locals {
  EB_env_variables = {
    APP_NAME                   = var.APP_NAME
    PORT                       = var.PORT
    MONGO_DB_URL               = var.MONGO_DB_URL
    SESSION_SECRET_KEY         = var.SESSION_SECRET_KEY
    ENABLE_LOGGING             = var.ENABLE_LOGGING
    CLOUDINARY_URL             = var.CLOUDINARY_URL
    GCP_API_KEY                = var.GCP_API_KEY
    SECRET_KEY                 = var.SECRET_KEY
    SELL_BOOK_CONFIRM_BASE_URL = var.SELL_BOOK_CONFIRM_BASE_URL
  }

  EB_configuration = [
    {
      namespace = "aws:autoscaling:asg"
      name      = "MaxSize"
      value     = var.autoscaling_max
    },
    {
      namespace = "aws:autoscaling:asg"
      name      = "MinSize"
      value     = var.autoscaling_min
    },
    {
      namespace = "aws:autoscaling:launchconfiguration"
      name      = "IamInstanceProfile"
      value     = aws_iam_instance_profile.beanstalk_ec2.name
    }
  ]
}
