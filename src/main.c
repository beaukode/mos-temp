#include "mgos_prometheus_metrics.h"
double value;

static void prometheus_metrics_fn(struct mg_connection *nc, void *user_data)
{
  mgos_prometheus_metrics_printf(nc, COUNTER,
                                 "sensor_temp", "Current sensor temp",
                                 "%lf", value);
  (void)user_data;
}

void prometheus_init()
{
  mgos_prometheus_metrics_add_handler(prometheus_metrics_fn, NULL);
}

void prometheus_update(double v)
{
  value = v;
}