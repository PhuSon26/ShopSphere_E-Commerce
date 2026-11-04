resource "aws_cloudwatch_log_metric_filter" "errors" {
  name           = "${var.project_name}-product-errors"
  log_group_name = var.log_group_name
  pattern        = "ERROR"

  metric_transformation {
    name      = "ProductServiceErrors"
    namespace = "ShopSphere/Product"
    value     = "1"
  }
}

resource "aws_cloudwatch_metric_alarm" "errors" {
  alarm_name          = "${var.project_name}-product-error-alarm"
  alarm_description   = "Product Service error log count is high"
  comparison_operator = "GreaterThanOrEqualToThreshold"

  evaluation_periods = 1
  metric_name        = aws_cloudwatch_log_metric_filter.errors.metric_transformation[0].name
  namespace          = aws_cloudwatch_log_metric_filter.errors.metric_transformation[0].namespace
  period             = 300
  statistic          = "Sum"
  threshold          = 5
  treat_missing_data = "notBreaching"
}
