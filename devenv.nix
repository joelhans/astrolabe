{ pkgs, lib, config, inputs, ... }:

{

  languages.javascript = rec {
    package = pkgs.nodejs_21;
    enable = true;
    corepack = {
      enable = true;
      # package = pkgs.yarn.override { nodejs = package; };
      # package = package.pkgs.yarn;
    };
  };

}
