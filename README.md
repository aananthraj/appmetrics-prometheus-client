# Prometheus Collector for Node Application Metrics

A Collector that collects data using 'appmetrics' and exposes it to a path "/metrics".

## Getting Started

### Installation
The appmetrics-prometheus-client Collector for Node Application Metrics can be installed via `npm`:
```sh
$ npm install appmetrics-prometheus-client
```

### Configuring the appmetrics-prometheus-client for Node Application Metrics 

The Collector can be used in your application by requiring it as the first line of your application:
```sh
const appmetrics_prometheus = require('appmetrics-prometheus-client').Prometheus();
```

### Data Provided

The Collector sends the following data values to Path /metrics from Node Application Metrics:


#### CPU
**Gauges**

* `cpu.process` the CPU usage of the application as a percentage of total machine CPU
* `cpu.system` the CPU usage of the system as a percentage of total machine CPU

#### System Memory

**Gauges**

* `memory.process.private` the amount of memory used by the Node.js application that cannot be shared with other processes, in bytes.
* `memory.process.physical` the amount of RAM used by the Node.js application in bytes.
* `memory.process.virtual` the memory address space used by Node.js application in bytes.
* `memory.system.used` the total amount of RAM in use on the system in bytes.
* `memory.system.total` the total amount of RAM available on the system in bytes.

#### Event Loop

* `eventloop.latency.min` the shortest sampled latency for processing an event
* `eventloop.latency.max` the longest sampled latency for processing an event
* `eventloop.latency.avg` the mean sampled latency for processing an event

#### Garbage Collection

**Gauges**

* `gc.size` the size of the JavaScript heap in bytes.
* `gc.used` the amount of memory used on the JavaScript heap in bytes.

**Timers**

* `gc.duration` the duration of the GC cycle in milliseconds.

#### HTTP Requests

**Timers**

* `http` the time taken for the HTTP request to be responded to in ms.

### License
The Node Application Metrics to StatsD Collector is licensed using an Apache v2.0 License.

### Version
0.0.3
