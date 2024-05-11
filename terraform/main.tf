terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.42.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

data "external" "get_version" {
  program = ["bash", "${path.module}/get_version.sh"]
}

module "root" {
  source        = "./modules"
  bucket_name = "lambda-bucket-teamlense"
  lambda_name = "lambda-signup"
  file_name = "${lookup(data.external.get_version.result, "version", "1.0.0")}/lambda.zip"
}