variable "project_name" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "security_group_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "container_image" {
  type = string
}

variable "container_port" {
  type    = number
  default = 8082
}

variable "db_host" {
  type = string
}

variable "db_name" {
  type    = string
  default = "product_db"
}

variable "db_secret_arn" {
  type = string
}

variable "ecs_cpu" {
  type    = number
  default = 512
}

variable "ecs_memory" {
  type    = number
  default = 1024
}

variable "desired_count" {
  type    = number
  default = 2
}

variable "s3_bucket_arn" {
  type    = string
  default = ""
}

variable "health_check_path" {
  type    = string
  default = "/actuator/health"
}
