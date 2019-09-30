#!/bin/bash
`npm run build`
#`sudo docker build -t tafequeue .`
#`sudo docker run -p 80:80 tafequeue`
#`sudo docker exec -it 57fcda99eb48 sh`

`sudo docker-compose down -v tafequeue_webdata`
`sudo docker-compose build`
`sudo docker-compose up&`
`curl http://localhost/ws/ws.php?getData=createdb`
