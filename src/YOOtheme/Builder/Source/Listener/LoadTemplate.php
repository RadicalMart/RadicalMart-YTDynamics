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
        $template = Event::emit('builder.template', $event);

        if (empty($template['type'])) {
            return;
        }

        $view = $event->getView();

        $requestTemplate = $this->config->get('req.customizer.template');

        if ($this->config->get('app.isCustomizer')) {
            $this->config->set('customizer.view', $template['type']);
        }

        if ($this->config->get('app.isBuilder') && empty($requestTemplate)) {
            return;
        }

        // get visible template
        $visible = $this->templateHelper->match($template);

        // set template identifier
        if ($this->config->get('app.isCustomizer')) {
            $this->config->add('customizer.template', [
                'id'      => $requestTemplate['id'] ?? null,
                'visible' => $visible['id'] ?? null,
            ]);
        }

        if ($requestTemplate || $visible) {
            $template += ($requestTemplate ?? $visible) + ['layout' => [], 'params' => []];

            // get output from builder
            $output = $this->builder->render(
                json_encode($template['layout']),
                $template['params'] + ['prefix' => "template-{$template['id']}"],
            );

            // append frontend edit button?
            if ($output && isset($template['editUrl']) && !$this->config->get('app.isCustomizer')) {
                $output .=
                    "<a style=\"position: fixed!important\" class=\"uk-position-medium uk-position-bottom-right uk-position-z-index uk-button uk-button-primary\" href=\"{$template['editUrl']}\">" .
                    Text::_('JACTION_EDIT') .
                    '</a>';
            }

            if ($output) {
                $view->set('_output', $output);
                $this->config->set('app.isBuilder', true);
            }
        }
    }

}
