<?php
namespace Drupal\techbrushup_core\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Topbar' Block.
 *
 * @Block(
 *   id = "topbar",
 *   admin_label = @Translation("Custom Topbar"),
 *   category = @Translation("techbrushup")
 * )
 */

class Topbar extends BlockBase
{
    /**
     * {@inheritdoc}
     */

    public function build()
    {
        return [
            "#theme"       => "topbar",
            '#custom_data' => ["age" => "31", "DOB" => "2 May 2000"],
            "#body_text"   => [
                "#markup" => "some_html_string",
            ],
        ];
    }
}
