git init
git pull https://github.com/BenM96/todoFull
ls
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
curl https://get.docker.com | sudo bash
sudo usermod -aG docker $(whoami)
docker info
docker-compose up -d
docker-compose ps
docker-compose up -d api
docker-compose ps
docker-compose logs api
docker-compose down
docker-compose up -d
docker-compose ps
docker-compose up -d api
docker-compose ps
docker-compose down
ls
docker-compose down
docker-compose up -d
docker-compose down
