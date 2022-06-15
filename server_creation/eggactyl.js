module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 5,
        "egg": 19,
        "docker_image": "quay.io/chirag350/multi-egg",
        "startup": "./t.sh",
        "limits": {
            "memory": 2048,
            "swap": 0,
            "disk": 8196,
            "io": 500,
            "cpu": 75
        },
        "environment": {
            "JAVA_VERSION": "",
            "JAVA_ARGUMENTS": "",
            "BOT_FILENAME": "",
            "NODE_VERSION": "",
            "QUERY_PORT": "",
            "FILE_PORT": ""             
        },
        "feature_limits": {
            "databases": 10,
            "allocations": 10,
            "backups": 10
        },
        "deploy": {
            "locations": location,
            "dedicated_ip": false,
            "port_range": ["30000-30999"]
        },
        "start_on_completion": false,
        "oom_disabled": false
    }
}