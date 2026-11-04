aws_region = "us-east-1"

project_name = "shopsphere-product"
environment  = "production"

vpc_cidr = "10.20.0.0/16"

container_port = 8082

container_image = "hoaanhuynh/nt533:shopsphere-product-service-sha-0e6380a0ce9e10cd16857609842adfbab47abd47"

health_check_path = "/actuator/health"

db_name     = "product_db"
db_username = "shopsphere_admin"

db_instance_class = "db.t3.micro"
multi_az          = true

ecs_cpu       = 512
ecs_memory    = 1024
desired_count = 2

min_capacity = 2
max_capacity = 4
