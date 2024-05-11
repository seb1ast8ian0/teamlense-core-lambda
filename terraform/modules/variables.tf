variable "lambda_name" {
  description = "Name of lambda"
  type        = string
}

variable "bucket_name" {
  description = "Bucket Name for storing .zip-Files"
  type        = string
}

variable "file_name" {
  description = "Name of S3-Object"
  type        = string
}