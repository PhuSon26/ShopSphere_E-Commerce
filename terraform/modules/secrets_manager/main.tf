resource "aws_secretsmanager_secret" "db" {
  name = "${var.project_name}/${var.service_name}/database"

  description = "Database credentials for ${var.service_name} service"

  recovery_window_in_days = 7

  tags = {
    Project = var.project_name
    Service = var.service_name
  }
}

resource "aws_secretsmanager_secret_version" "db" {
  secret_id = aws_secretsmanager_secret.db.id

  secret_string = jsonencode({
    username = var.db_username
    password = var.db_password
    host     = var.db_host
    port     = 3306
    database = var.db_name
  })
}
