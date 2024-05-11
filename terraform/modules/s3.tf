data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "../lambda/.build"
  output_path = "lambda.zip"
}

resource "aws_s3_object" "lambda" {
  bucket = var.bucket_name
  key    = var.file_name
  source = data.archive_file.lambda_zip.output_path
}