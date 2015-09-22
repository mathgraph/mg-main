Main REPO

Развертывание сервера:

1ый способ: 
#запуск ssh-agent
eval $(ssh-agent)
#генерация ключа
ssh-keygen -t rsa
#копирование ключа на сервер
ssh-copy-id -i key-identity user@myserver
#развертывание сервера
pm2 deploy ecosystem.json develop

2ой способ:
git push на необходимую ветку
