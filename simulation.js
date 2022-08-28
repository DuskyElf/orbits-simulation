canvas = document.getElementById("main")
ctx = canvas.getContext("2d")
canvas.height = innerHeight
canvas.width = innerWidth

draw = (x, y, c, s) => {
    ctx.fillStyle = c
    ctx.fillRect(x, y, s, s)
}

random = () => {
    return Math.random() * 400 + 50
}

bodies = []
body = (x, y, c, m, vx, vy) => {
    let struct = {
        'x': x,
        'y': y,
        'vx':vx,
        'vy':vy,
        'color': c,
        'mass': m
    }
    bodies.push(struct)
    return struct
}

forces = (g) => {
    for (let i=0; i < bodies.length; i++) {
        fx = 0
        fy = 0
        a = bodies[i]
        
        for (let j=0; j < bodies.length; j++) {
            b = bodies[j]
            dx = a.x - b.x
            dy = a.y - b.y
            d = Math.sqrt(dx*dx + dy*dy)
            if (d > 0) {
                F = ((g * a.mass * b.mass) / d) / a.mass
                fx += (F * dx)
                fy += (F * dy)
            }
        }
        a.vx = (a.vx + fx)
        a.vy = (a.vy + fy)
        a.x += a.vx
        a.y += a.vy
    }
}

// Initializations
body(canvas.width / 2, canvas.height / 2, 'red', 333000, 0, 0)
bx = canvas.width / 2
by = canvas.height / 2 - 10
body(bx, by, 'cyan', 1, Math.sqrt(333000/10000), 0)
by = canvas.height / 2 - 50
body(bx, by, 'orange', 0.107, Math.sqrt(333000/24900), 0)
by = canvas.height / 2 - 75
body(bx, by, 'green', 2, Math.sqrt(333000/2500) * -1, 0)
by = canvas.height / 2 - 150
body(bx, by, 'white', 1000, Math.sqrt(333000/3500) * -1, 0)

update = () => {
    forces(-0.000001)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i=0; i < bodies.length; i++) {
        draw(bodies[i].x, bodies[i].y, bodies[i].color, 5)
    }
    requestAnimationFrame(update)
}

update()
