<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener;

use Joomla\CMS\Language\Text;
use YOOtheme\Builder;
use YOOtheme\Builder\Templates\TemplateHelper;
use YOOtheme\Config;
use YOOtheme\Event;

class LoadTemplate
{
    public Config $config;
    public Builder $builder;
    public TemplateHelper $templateHelper;

    public function __construct(Config $config, Builder $builder, TemplateHelper $templateHelper)
    {
        $this->config   = $config;
        $this->builder  = $builder;
        $this->templateHelper = $templateHelper;
    }

    public function handle($event): void
    {
        $view = Event::emit('builder.template', $event);

        if (empty($view['type'])) {
            return;
        }

        $template = $this->config->get('req.customizer.template');

        if ($this->config->get('app.isCustomizer')) {
            $this->config->set('customizer.view', $view['type']);
        }

        if ($this->config->get('app.isBuilder') && empty($template)) {
            return;
        }

        // get visible template
        $visible = $this->templateHelper->match($view);

        // set template identifier
        if ($this->config->get('app.isCustomizer')) {
            $this->config->add('customizer.template', [
                'id'      => $template['id'] ?? null,
                'visible' => $visible['id'] ?? null,
            ]);
        }

        if ($template ??= $visible) {
            // get output from builder
            $output = $this->builder->render(
                json_encode($template['layout'] ?? []),
                ($view['params'] ?? []) + [
                    'prefix' => "template-{$template['id']}",
                    'template' => $template['type'],
                ],
            );

            // append frontend edit button?
            if ($output && isset($view['editUrl']) && !$this->config->get('app.isCustomizer')) {
                $output .=
                    "<a style=\"position: fixed!important\" class=\"uk-position-medium uk-position-bottom-right uk-position-z-index uk-button uk-button-primary\" href=\"{$view['editUrl']}\">" .
                    Text::_('JACTION_EDIT') .
                    '</a>';
            }

            $event->setOutput($output ?? '');
            $this->config->set('app.isBuilder', true);
            $this->config->set('app.template', $template);
        }
    }

}
