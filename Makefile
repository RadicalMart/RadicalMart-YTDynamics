.PHONY: $(MAKECMDGOALS)

.DEFAULT_GOAL := help
SHELL := /bin/bash

build: ## Собрать контейнеры
	docker compose build

rebuild: ## Пересобрать контейнеры
	docker compose build --no-cache

up: ## Развернуть контейнеры
	docker compose up -d

up-rebuild: ## Развернуть контейнеры с пересборкой
	docker compose up -d --force-recreate --build

up-alone: ## Развернуть контейнеры при этом удалив все другие, которые относятся к другим проектам
	docker compose up -d --remove-orphans

down: ## Потушить контейнеры текущего проекта
	docker compose down

restart: ## Перезапустить контейнеры
	docker compose restart

down-all: ## Потушить все контейнеры всех проектов
	docker compose down --remove-orphans

down-v: ## Потушить контейнеры и удалить все данные
	docker compose down -v

help: ## Show current help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ./Makefile | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}'