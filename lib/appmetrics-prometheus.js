/*******************************************************************************
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

var monitor = function () {
	var appmetrics = require('appmetrics');
    var metrics =  require('../metrics/metrics.js'); 
    var monitor = appmetrics.monitor();

    var client = require('prom-client');
    var collectDefaultMetrics = client.collectDefaultMetrics;
    var Registry = client.Registry;
	var register = new Registry();
	collectDefaultMetrics({ register });

    monitor.on('cpu', function handleCPU(cpu) {    	
    	metrics.cpu.labels('process').set(cpu.process);
 		metrics.cpu.labels('system').set(cpu.system);
	});

	monitor.on('memory', function handleMem(memory) {
 		metrics.memory_process.labels('private').set(memory.private);
 		metrics.memory_process.labels('physical').set(memory.physical);
 		metrics.memory_process.labels('virtual').set(memory.virtual);
 		metrics.memory_physical.labels('used').set(memory.physical_used);
 		metrics.memory_physical.labels('total').set(memory.physical_total);
	});
	
	monitor.on('eventloop', function handleEL(eventloop) {
 		metrics.eventloop_latency.labels('min').set(eventloop.latency.min);
 		metrics.eventloop_latency.labels('max').set(eventloop.latency.max);
 		metrics.eventloop_latency.labels('avg').set(eventloop.latency.avg);
	});

	monitor.on('gc', function handleGC(gc) {
 		metrics.gc.labels('size').set(gc.size);
 		metrics.gc.labels('used').set(gc.used);
 		metrics.gc_duration.observe(gc.duration);
	});
	
	monitor.on('http', function handleHTTP(http) {
		metrics.http_duration.labels(http.url).observe(http.duration);
	});
	
	// monitor.on('socketio', function handleSocketio(socketio) {
	// 	client.timing('socketio.' + socketio.method + '.' + socketio.event, socketio.duration)
	// });
	
	// monitor.on('mysql', function handleMySQL(mysql) {
	// 	client.timing('mysql', mysql.duration)
	// });
	
	// monitor.on('mongo', function handleMongo(mongo) {
	// 	client.timing('mongo', mongo.duration)
	// });
	
	// monitor.on('leveldown', function handleLeveldown(leveldown) {
	// 	client.timing('leveldown', leveldown.duration)
	// });
	
	// monitor.on('redis', function handleRedis(redis) {
	// 	client.timing('redis.' + redis.cmd, redis.duration)
	// });
	
	// monitor.on('memcached', function handleMemcached(memcached) {
	// 	client.timing('memcached.' + memcached.method, memcached.duration)
	// });
	
	// monitor.on('postgres', function handlePostgres(postgres) {
	// 	client.timing('postgres', postgres.duration)
	// });
	
	// monitor.on('mqtt', function handleMQTT(mqtt) {
	// 	client.timing('mqtt.' + mqtt.method + '.' + mqtt.topic, mqtt.duration)
	// });
	
	// monitor.on('mqlight', function handleMQLight(mqlight) {
	// 	client.timing('mqlight.' + mqlight.method + '.' + mqlight.topic, mqlight.duration)
	// });

	return Prometheus;
};

exports.Prometheus = monitor;