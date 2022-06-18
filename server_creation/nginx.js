module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 5,
        "egg": 18,
        "docker_image": "ghcr.io/finnie2006/nginx-ptero",
        "startup": "{{STARTUP_CMD}}",
        "limits": {
            "memory": 512,
            "swap": 0,
            "disk": 2048,
            "io": 500,
            "cpu": 25
        },
        "environment": {
            "STARTUP_CMD": "./start.sh"           
        },
        "feature_limits": {
            "databases": 1,
            "allocations": 3,
            "backups": 2
        },
        "deploy": {
            "locations": location,
            "dedicated_ip": false,
            "port_range": ["18000-18999"]
        },
        "start_on_completion": false,
        "oom_disabled": false
    }
}