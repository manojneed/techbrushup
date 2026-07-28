<?php
namespace Drupal\techbrushup_core\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\techbrushup_core\Service\UserGlobals;

/**
 * Provides a 'Header' Block.
 *
 * @Block(
 *   id = "Header",
 *   admin_label = @Translation("Custom Header"),
 *   category = @Translation("techbrushup")
 * )
 */

class Header extends BlockBase implements ContainerFactoryPluginInterface 
{
  protected UserGlobals $userGlobals;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, UserGlobals $userGlobals) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->userGlobals = $userGlobals;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('techbrushup_core.user_globals')
    );
  }

    /**
     * {@inheritdoc}
     */

    public function build()
    {
        return [
            "#theme"       => "header",
            '#user_picture_url' => $this->userGlobals->getProfilePictureUrl(),
        ];
    }
}
