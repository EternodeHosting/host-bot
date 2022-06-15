module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 1,
        "egg": 1,
        "docker_image": "ghcr.io/pterodactyl/yolks:java_8",
        "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
        "limits": {
            "memory": 2048,
            "swap": 0,
            "disk": 8196,
            "io": 500,
            "cpu": 75
        },
        "environment": {
            "BUNGEE_VERSION": "latest",
            "SERVER_JARFILE": "bungeecord.jar"           
        },
        "feature_limits": {
            "databases": 10,
            "allocations": 10,
            "backups": 10
        },
        "deploy": {
            "locations": location,
            "dedicated_ip": false,
            "port_range": ["25000-25999"]
        },
        "start_on_completion": false,
        "oom_disabled": false
    }
}