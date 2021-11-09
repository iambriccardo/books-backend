# resource "aws_kms_key" "terraform-bucket-key" {
#   # A KMS Key allows to encrypt the S3 Bucket
#   description             = "This key is used to encrypt bucket objects"
#   deletion_window_in_days = 10
#   enable_key_rotation     = true
# }

# resource "aws_kms_alias" "key-alias" {
#   # The KMS Alias will later be used by Terraform when configuring the Backend 
#   name          = "alias/terraform-bucket-key"
#   target_key_id = aws_kms_key.terraform-bucket-key.key_id
# }

# TODO: remove backend on S3

resource "aws_s3_bucket" "terraform-state" {
  # This resource creates an s3 Bucket to store the Terraform State
  bucket = "books-backend-tfstate-687187154654"
  acl    = "private"
  force_destroy = true  # This line allows terraform to destroy a non-empty bucket

  versioning {
    enabled = true
  }

  # server_side_encryption_configuration {
  #   rule {
  #     apply_server_side_encryption_by_default {
  #       kms_master_key_id = aws_kms_key.terraform-bucket-key.arn
  #       sse_algorithm     = "aws:kms"
  #     }
  #   }
  # }
}

resource "aws_s3_bucket_public_access_block" "block" {
  # This Policy ensures that the S3 Bucket is private and cannot be accessed from outside
  bucket = aws_s3_bucket.terraform-state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "terraform-state" {
  # A DynamoDB Table prevents two team members from modifying the state at the same time!
  name           = "terraform-state"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
