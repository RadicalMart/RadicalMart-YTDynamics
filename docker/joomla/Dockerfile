FROM joomla:5-apache

RUN pecl install xdebug && \
    docker-php-ext-enable xdebug

RUN echo "xdebug.mode=develop,debug" > /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.max_nesting_level=8000" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.log=/var/log/xdebug.log" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.log_level=7" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.remote_handler=dbgp" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.extended_info=0" >> /usr/local/etc/php/conf.d/99-xdebug.ini && \
    echo "xdebug.discover_client_host=0" >> /usr/local/etc/php/conf.d/99-xdebug.ini

COPY docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["apache2-foreground"]
