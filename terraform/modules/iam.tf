resource "aws_iam_role" "lambda_exec" {
  name               = "serverless_lambda_4"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Action    = "sts:AssumeRole",
        Effect    = "Allow",
        Sid       = "",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_exec_policy" {
  name        = "lambda_network_policy"
  description = "IAM policy for lambda_exec role"

  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "ec2:DescribeNetworkInterfaces",
          "ec2:CreateNetworkInterface",
          "ec2:DeleteNetworkInterface",
          "ec2:DescribeInstances",
          "ec2:AttachNetworkInterface"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_exec_policy_attachment" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_exec_policy.arn
}

resource "aws_iam_policy" "lambda_db_policy" {
  name        = "lambda_db_policy"
  description = "IAM policy for Database Connection"

  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect: "Allow",
        Action: [
            "rds-db:connect"
        ],
        Resource = "arn:aws:rds:eu-central-1:533267420624:db:tl-postgres-db"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_db_policy_attachment" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_db_policy.arn
}


resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}