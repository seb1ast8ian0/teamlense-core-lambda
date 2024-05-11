resource "aws_cloudwatch_log_group" "teamlense-lambda-logs" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 30
  tags = {
    Environment = "Dev"
    Application = "Lambda Sign Up"
  }
}