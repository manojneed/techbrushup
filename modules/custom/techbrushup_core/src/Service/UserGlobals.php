<?php

namespace Drupal\techbrushup_core\Service;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\user\Entity\User;

/**
 * Service to get the current user's profile picture URL.
 */
class UserGlobals {

  protected $currentUser;
  protected $entityTypeManager;
  protected $configFactory;
  protected $fileUrlGenerator;

  public function __construct(
    AccountProxyInterface $current_user,
    EntityTypeManagerInterface $entity_type_manager,
    ConfigFactoryInterface $config_factory,
    FileUrlGeneratorInterface $file_url_generator
  ) {
    $this->currentUser = $current_user;
    $this->entityTypeManager = $entity_type_manager;
    $this->configFactory = $config_factory;
    $this->fileUrlGenerator = $file_url_generator;
  }

  /**
   * Returns the profile picture URL for the current user or default.
   */
  public function getProfilePictureUrl(): string {
    // Logged-in user with a picture.
    if ($this->currentUser->isAuthenticated()) {
      /** @var \Drupal\user\UserInterface $account */
      $account = $this->entityTypeManager
        ->getStorage('user')
        ->load($this->currentUser->id());

      if ($account && !$account->get('user_picture')->isEmpty()) {
        $file = $account->get('user_picture')->entity;
        return $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
      }
    }

    // Fallback to default picture from user.settings.
    $default_uri = $this->configFactory
      ->get('user.settings')
      ->get('default_picture');

    return $default_uri
      ? $this->fileUrlGenerator->generateAbsoluteString($default_uri)
      : '/themes/custom/amur/images/default-avatar.png';
  }
}