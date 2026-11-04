module "network" {
  source = "../../modules/network"

  project_name = var.project_name
  environment  = var.environment
  vpc_cidr     = var.vpc_cidr
}

module "security_groups" {
  source = "../../modules/security_groups"

  project_name   = var.project_name
  vpc_id         = module.network.vpc_id
  container_port = var.container_port
}

module "rds" {
  source = "../../modules/rds"

  project_name = var.project_name
  environment  = var.environment

  subnet_ids         = module.network.db_subnet_ids
  security_group_ids = [module.security_groups.rds_security_group_id]

  db_name     = var.db_name
  db_username = var.db_username
  db_password = var.db_password

  db_instance_class = var.db_instance_class
  multi_az          = var.multi_az
}

module "s3" {
  source = "../../modules/s3"

  project_name = var.project_name
  environment  = var.environment
}

module "secrets_manager" {
  source = "../../modules/secrets_manager"

  project_name = var.project_name
  service_name = "product"

  db_username = var.db_username
  db_password = var.db_password
  db_host     = module.rds.db_endpoint
  db_name     = var.db_name

  depends_on = [module.rds]
}

module "alb" {
  source = "../../modules/alb"

  project_name = var.project_name
  vpc_id       = module.network.vpc_id

  public_subnet_ids = module.network.public_subnet_ids
  security_group_id = module.security_groups.alb_security_group_id

  container_port    = var.container_port
  health_check_path = var.health_check_path
}

module "ecs" {
  source = "../../modules/ecs"

  project_name = var.project_name

  private_subnet_ids = module.network.app_subnet_ids
  security_group_id  = module.security_groups.ecs_security_group_id

  target_group_arn = module.alb.target_group_arn

  container_image = var.container_image
  container_port  = var.container_port

  db_host       = module.rds.db_endpoint
  db_name       = var.db_name
  db_secret_arn = module.secrets_manager.secret_arn

  ecs_cpu       = var.ecs_cpu
  ecs_memory    = var.ecs_memory
  desired_count = var.desired_count

  s3_bucket_arn = module.s3.bucket_arn

  depends_on = [
    module.rds,
    module.secrets_manager
  ]
}

module "autoscaling" {
  source = "../../modules/autoscaling"

  project_name     = var.project_name
  ecs_cluster_name = module.ecs.cluster_name
  ecs_service_name = module.ecs.service_name

  min_capacity = var.min_capacity
  max_capacity = var.max_capacity
}

module "cloudwatch" {
  source = "../../modules/cloudwatch"

  project_name   = var.project_name
  log_group_name = module.ecs.log_group_name
}

module "cloudfront" {
  source = "../../modules/cloudfront"

  project_name                = var.project_name
  bucket_name                 = module.s3.bucket_name
  bucket_arn                  = module.s3.bucket_arn
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
}
