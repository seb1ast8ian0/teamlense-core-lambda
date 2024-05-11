resource "aws_lambda_function" "lambda" {
  function_name    = var.lambda_name
  s3_bucket        = var.bucket_name
  s3_key           = aws_s3_object.lambda.id
  runtime          = "nodejs20.x"
  handler          = "index.handler"
  role             = aws_iam_role.lambda_exec.arn

  vpc_config {
    subnet_ids         = ["subnet-0754210ad996ac7a3", "subnet-0697f64ae177e15ec", "subnet-0d25f71c53d44a62a"]
    security_group_ids = ["sg-0d7680640b2db9d85"]
  }

  environment {
    variables = {
      BASIC_AUTH_USERNAME = "user"
      BASIC_AUTH_PASSWORD = "password"

      DB_HOST = "tl-postgres-db.c32ccw24u3j4.eu-central-1.rds.amazonaws.com"
      DB_PORT = 5432
      DB_NAME = "postgres"
      DB_USERNAME = "teamlense"
      DB_PASSWORD = "teamlense-postgres-password"
    }
  }
}

