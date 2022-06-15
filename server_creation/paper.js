module.exports = (userID, serverName, location) => {
    return {
        "name": serverName,
        "user": userID,
        "nest": 1,
        "egg": 3,
        "docker_image": "ghcr.io/pterodactyl/yolks:java_17",
        "startup": "java -Xms128M -Xmx{{SERVER_MEMORY}}M -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}",
        "limits": {
            "memory": 2048,
            "swap": 0,
            "disk": 8196,
            "io": 500,
            "cpu": 75
        },
        "environment": {
            "MINECRAFT_VERSION": "latest",
            "SERVER_JARFILE": "server.jar",
            "DL_PATH": "",
            "BUILD_NUMBER": "latest"            
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