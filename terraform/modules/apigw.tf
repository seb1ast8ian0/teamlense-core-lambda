resource "aws_api_gateway_rest_api" "apigw" {
  name        = "Teamlense API-Gateway"
  description = "All Teamlense REST-APIs"
}

// Spezifischer Ressourcenpfad für /profile Endpunkt
resource "aws_api_gateway_resource" "profile_resource" {
  rest_api_id = aws_api_gateway_rest_api.apigw.id
  parent_id   = aws_api_gateway_rest_api.apigw.root_resource_id
  path_part   = "profile"
}

// Methode für /profile Endpunkt
resource "aws_api_gateway_method" "profile_method" {
  rest_api_id   = aws_api_gateway_rest_api.apigw.id
  resource_id   = aws_api_gateway_resource.profile_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

// Integration für /profile Endpunkt
resource "aws_api_gateway_integration" "profile_lambda" {
  rest_api_id             = aws_api_gateway_rest_api.apigw.id
  resource_id             = aws_api_gateway_resource.profile_resource.id
  http_method             = aws_api_gateway_method.profile_method.http_method
  integration_http_method = "ANY"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

// Bereitstellung der API
resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.profile_lambda]
  rest_api_id = aws_api_gateway_rest_api.apigw.id
  stage_name  = "dev"
}

// Erlaubnis für /profile Endpunkt
resource "aws_lambda_permission" "permission" {
  statement_id  = "AllowAPIGatewayInvoke_Lambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.apigw.execution_arn}/*/*"
}


output "base_url" {
  depends_on = [
    aws_api_gateway_deployment.deployment
  ]
  value = "${aws_api_gateway_deployment.deployment.invoke_url}"
}