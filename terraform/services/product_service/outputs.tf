output "product_alb_url" {
  description = "Product Service ALB URL"
  value       = "http://${module.alb.alb_dns_name}"
}

output "product_alb_dns" {
  value = module.alb.alb_dns_name
}

output "product_ecs_cluster" {
  value = module.ecs.cluster_name
}

output "product_ecs_service" {
  value = module.ecs.service_name
}

output "product_rds_endpoint" {
  value = module.rds.db_endpoint
}

output "product_database_name" {
  value = module.rds.db_name
}

output "product_s3_bucket" {
  value = module.s3.bucket_name
}

output "product_cloudfront_domain" {
  value = module.cloudfront.distribution_domain_name
}

output "product_cloudfront_url" {
  value = "https://${module.cloudfront.distribution_domain_name}"
}

output "product_target_group_arn" {
  value = module.alb.target_group_arn
}
