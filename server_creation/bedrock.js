module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 1,
        "egg": 23,
        "docker_image": "ghcr.io/parkervcp/yolks:debian",
        "startup": "./bedrock_server",
        "limits": {
            "memory": 2048,
            "swap": 0,
            "disk": 8196,
            "io": 500,
            "cpu": 75
        },
        "environment": {
            "BEDROCK_VERSION": "latest",
            "LD_LIBRARY_PATH": ".",
            "SERVERNAME": "Eternode Minecraft server",
            "GAMEMODE": "survival",   
            "DIFFICULTY": "easy",
            "CHEATS": "false"            
        },
        "feature_limits": {
            "databases": 10,
            "allocations": 10,
            "backups": 10
        },
        "deploy": {
            "locations": location,
            "dedicated_ip": false,
            "port_range": ["26000-26999"]
        },
        "start_on_completion": false,
        "oom_disabled": false
    }
}