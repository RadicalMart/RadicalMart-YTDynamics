.PHONY: build rebuild frontend package up up-rebuild up-alone down restart down-all down-v help

.DEFAULT_GOAL := help
SHELL := /bin/bash

PLUGIN_VERSION := $(shell sed -n 's|.*<version>\(.*\)</version>.*|\1|p' ytdynamics.xml | head -n 1)
PACKAGE_DIR := build
PACKAGE_FILE := $(PACKAGE_DIR)/plg_system_ytdynamics-$(PLUGIN_VERSION).zip
PACKAGE_PATHS := elements language languages media services src template script.php ytdynamics.xml

build: ## Собрать контейнеры
	docker compose build

rebuild: ## Пересобрать контейнеры
	docker compose build --no-cache

frontend: ## Собрать frontend-файлы плагина
	@test -d frontend/node_modules || npm --prefix frontend ci
	npm --prefix frontend run plg_system_ytdynamics

package: frontend ## Собрать готовый установочный ZIP плагина
	mkdir -p $(PACKAGE_DIR)
	$(RM) $(PACKAGE_FILE)
	zip -q -r $(PACKAGE_FILE) $(PACKAGE_PATHS) -x '*.DS_Store'
	unzip -tq $(PACKAGE_FILE)
	@echo "Package: $(PACKAGE_FILE)"

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
