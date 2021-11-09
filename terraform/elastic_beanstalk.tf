resource "aws_elastic_beanstalk_application" "EB_application" {
  name = var.elasticapp
}

resource "aws_elastic_beanstalk_environment" "EB_environment" {
  name                = var.elasticenv
  application         = aws_elastic_beanstalk_application.EB_application.name
  solution_stack_name = var.solution_stack_name

  setting {
    # Since EB manages an EC2 instance, to create the infrastructure
    # we need to specify what profile is used for the instances!
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.beanstalk_ec2.name
  }

  #TODO: add env variables for ebs!! https://stackoverflow.com/questions/39185178/how-to-pass-aws-elastic-beanstalk-environment-settings-to-a-terraform-module

  # Define autoscaling boundaries: 
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = var.autoscaling_min
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = var.autoscaling_max
  }
}
