<?php
namespace Drupal\techbrushup_core\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Footer' Block.
 *
 * @Block(
 *   id = "footer",
 *   admin_label = @Translation("Custom Footer"),
 *   category = @Translation("techbrushup")
 * )
 */

class Footer extends BlockBase
{
    /**
     * {@inheritdoc}
     */

    public function build()
    {
        return [
            "#theme"       => "footer",
            '#custom_data' => ["age" => "31", "DOB" => "2 May 2000"],
            "#body_text"   => [
                "#markup" => "some_html_string",
            ],
        ];
    }
}
