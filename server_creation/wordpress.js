module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 5,
        "egg": 22,
        "docker_image": "registry.gitlab.com/tmunsch/pterodactyl-wordpress",
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
            "databases": 2,
            "allocations": 1,
            "backups": 2
        },
        "deploy": {
            "locations": [2],
            "dedicated_ip": false,
            "port_range": ["18000-18999"]
        },
        "start_on_completion": false,
        "oom_disabled": false
    }
}